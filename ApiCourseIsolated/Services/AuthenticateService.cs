﻿using ApiCourseIsolated.Entities;
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

        public async Task<string> CreateUserAsync(UserRequestDto userRequest)
        {
            var user = new CustomUser
            {
                UserName = userRequest.userName,
                Email = userRequest.userName
            };

            var result = await _userManager.CreateAsync(user, userRequest.password);
            if (result.Succeeded)
            {
                return await BuildTokenAsync(user);
            }

            return null;
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
        #endregion
    }
}
