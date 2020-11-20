using ApiCourseIsolated.Entities;
using ApiCourseIsolated.Entities.RequestDto;
using ApiCourseIsolated.Services.Contracts;
using Microsoft.AspNetCore.Identity;
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
        private readonly IConfiguration _configuration;

        public AuthenticateService(
                                    SignInManager<CustomUser> signInManager,
                                    UserManager<CustomUser> userManager,
                                    IConfiguration configuration
                                  )
        {
            _signInManager = signInManager;
            _userManager = userManager;
            this._configuration = configuration;
        }

        public async Task<string> AuthenticateAsync(UserRequestDto userRequest)
        {
            //0) value to return
            string tokenFinal = null;

            //1) Validate User
            //skip in first place
            var user = await _userManager.FindByNameAsync(userRequest.userName);

            if (user != null)
            {
                //string modelPassword = "test";
                var result = await _signInManager.CheckPasswordSignInAsync(user, userRequest.password, false);//password
                if (result.Succeeded)
                {
                    //2) Token creation 
                    tokenFinal = BuildToken(userRequest);
                }
            }
            return tokenFinal;
        }

        private  string BuildToken(UserRequestDto userRequest)
        {
            string tokenFinal;
            //create token
            string valueKey = _configuration["secret_key_jwt_config"];
            var key = Encoding.ASCII.GetBytes(valueKey);
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(
                                                new Claim[]
                                                {
                                                    new Claim(ClaimTypes.Name, userRequest.userName),  //UserId.tostring
                                                    new Claim(ClaimTypes.Role, "Admin"), //User.Role
                                                    new Claim(ClaimTypes.Version, "v3.1"),
                                                    new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
                                                }
                                            ),

                Expires = DateTime.UtcNow.AddMinutes(69),

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

        public async Task<string> CreateUserAsync(UserRequestDto userRequest)
        {
            var user = new CustomUser { 
                                        UserName = userRequest.userName,
                                        Email = userRequest.userName 
                                      };

          var result = await _userManager.CreateAsync(user, userRequest.password);
            if (result.Succeeded) 
            {
                return BuildToken(userRequest);
            }

            return null;
        }
    }
}
