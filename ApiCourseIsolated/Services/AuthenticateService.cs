using ApiCourseIsolated.Entities;
using ApiCourseIsolated.Entities.RequestDto;
using ApiCourseIsolated.Entities.ResponseDto;
using ApiCourseIsolated.Services.Contracts;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Services
{
    public class AuthenticateService : IAuthenticateService
    {
        private readonly SignInManager<CustomUser> _signInManager;
        private readonly UserManager<CustomUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;
        private readonly IConfiguration _configuration;

        public AuthenticateService(
                                    SignInManager<CustomUser> signInManager,
                                    UserManager<CustomUser> userManager,
                                    RoleManager<IdentityRole> roleManager,
                                    IConfiguration configuration
                                  )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            _roleManager = roleManager;
            this._configuration = configuration;
        }
        #region private_methods
        private async Task<string> BuildTokenAsync(CustomUser user)
        {
            string tokenFinal;
            //create token
            string valueKey = _configuration["secret_key_jwt_config"];
            var key = Encoding.ASCII.GetBytes(valueKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(await setAllClaimsAsync(user)), //ver porque claims estan en subject

                Expires = DateTime.UtcNow.AddMinutes(int.Parse(_configuration["token_expiration_jwt_config"])), //can be from config _configuration["token_expiration_jwt_config"]

                //TO DO: Ver si se pueden usar mas objetos
                // Audience = configuracionde escucha habilitada 
                // Issuer = firma ?
                // NotBefore = token unico?
                // Claims =  lista de claims
                SigningCredentials = new SigningCredentials(
                                                            new SymmetricSecurityKey(key),
                                                            SecurityAlgorithms.HmacSha256
                                                            )
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);
            tokenFinal = tokenHandler.WriteToken(token);
            return tokenFinal;
        }

        private async Task<List<Claim>> setAllClaimsAsync(CustomUser user)
        {
            //Initialize
            var allClaims = new List<Claim>();

            //Set all roles from user
            var userRoles = await _userManager.GetRolesAsync(user);
            foreach (var rol in userRoles)
            {
                Claim claimRole = new Claim(ClaimTypes.Role, rol);
                allClaims.Add(claimRole);
            }

            //Set existing Claims from user
            var existingClaims = await _userManager.GetClaimsAsync(user);
            foreach (var claimUser in existingClaims)
            {
                allClaims.Add(claimUser);
            }

            //set defaults claims
            allClaims.Add(new Claim(ClaimTypes.Name, user.UserName));
            allClaims.Add(new Claim(ClaimTypes.Email, user.Email));
            allClaims.Add(new Claim(ClaimTypes.Version, "v3.1"));
            allClaims.Add(new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()));

            return allClaims.ToList();
        }
        
        private static List<string> CollectErrorData(IdentityResult result)
        {
            List<string> errorList = new List<string>();
            //verify how read error
            foreach (IdentityError error in result.Errors)
            {
                //to ModelState
                errorList.Add(error.Description);
            }


            return errorList;
        }
        #endregion

        #region public_methods
        public async Task<string> AuthenticateAsync(UserRequestDto userRequest)
        {
            //0) value to return
            string tokenFinal = null;

            //1) Validate User
            var user = await _userManager.FindByNameAsync(userRequest.userName);

            if (user != null)
            {
                var result = await _signInManager.CheckPasswordSignInAsync(user, userRequest.password, false);//password
                if (result.Succeeded)
                {
                    //2) Token creation 
                    tokenFinal = await BuildTokenAsync(user);
                }
            }
            return tokenFinal;
        }

        public async Task<UserDataResultResponseDto> CreateUserAsync(UserRequestDto userRequest)
        {
            UserDataResultResponseDto response = new UserDataResultResponseDto();

            var user = new CustomUser
            {
                UserName = userRequest.userName,
                Email = userRequest.userName
            };

            var result = await _userManager.CreateAsync(user, userRequest.password);
            if (result.Succeeded)
            {
                response.Token = await BuildTokenAsync(user);
                return response;
            }
            response.ErrorList = CollectErrorData(result);
            return response;
        }



        public async Task<OperationResultResponseDto> DeleteUserAsync(UserRequestDto userRequest)
        {
            //0) value to return
            OperationResultResponseDto response = new OperationResultResponseDto
            {
                OperationResult = false
            };

            //1) Validate User
            var user = await _userManager.FindByNameAsync(userRequest.userName);

            if (user != null)
            {
                var result = await _userManager.DeleteAsync(user);
                //2) return result 
                response.OperationResult = result.Succeeded;
                response.ErrorList = response.OperationResult ? null : CollectErrorData(result);
            }
            
            return response;
        }

        public async Task<bool> CreateClaimToUserAsync(ClaimToUserRequestDto claimToUserRequestDtoRequest)
        {
            var user = await _userManager.FindByEmailAsync(claimToUserRequestDtoRequest.UserEmail);

            if (user != null)
            {
                Claim claim = new Claim(claimToUserRequestDtoRequest.NewClaimName, claimToUserRequestDtoRequest.NewClaimValue);
                var result = await _userManager.AddClaimAsync(user, claim);
                return result.Succeeded;
            }

            return false;
        }

        public async Task<bool> DeleteClaimToUserAsync(ClaimToUserRequestDto claimToUserRequestDtoRequest)
        {
            var user = await _userManager.FindByEmailAsync(claimToUserRequestDtoRequest.UserEmail);

            if (user != null)
            {
                Claim claim = new Claim(claimToUserRequestDtoRequest.NewClaimName, claimToUserRequestDtoRequest.NewClaimValue);
                var result = await _userManager.RemoveClaimAsync(user, claim);
                return result.Succeeded;
            }

            return false;
        }

        public async Task<bool> CreateRolAsync(CreateRolRequestDto rolRequest)
        {
            IdentityRole identityRole = new IdentityRole { Name = rolRequest.RoleName };
            IdentityResult result = await _roleManager.CreateAsync(identityRole);
            return result.Succeeded;
        }

        public async Task<bool> AssignRolToUserAsync(AssignRolToUserRequestDto rolUserRequest)
        {
            bool response = false;

            var user = await _userManager.FindByNameAsync(rolUserRequest.UserName);

            if (user != null)
            {
                IdentityResult result = await _userManager.AddToRoleAsync(user, rolUserRequest.RoleName);
                response = result.Succeeded;
            }

            return response;
        }

        public async Task<List<DetailUsersDataResponseDto>> GetAllUsersAsync()
        {
            return await _userManager.Users.Select(g => new DetailUsersDataResponseDto()
            {
                UserName = g.UserName,
                Obs = g.Obs
            }).ToListAsync();
        }
        #endregion
    }
}
