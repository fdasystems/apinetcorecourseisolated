using ApiCourseIsolated.Entities.RequestDto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Services.Contracts
{
    public interface IAuthenticateService
    {
        public Task<string> CreateUserAsync(UserRequestDto userRequest);
        public Task<string> AuthenticateAsync(UserRequestDto userRequest);
        public Task<bool> CreateClaimToUserAsync(ClaimToUserRequestDto claimToUserRequestDtoRequest);
    }
}
