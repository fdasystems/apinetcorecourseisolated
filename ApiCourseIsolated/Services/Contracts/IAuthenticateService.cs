using ApiCourseIsolated.Entities;
using ApiCourseIsolated.Entities.RequestDto;
using ApiCourseIsolated.Entities.ResponseDto;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Services.Contracts
{
    public interface IAuthenticateService
    {
        public Task<UserDataResultResponseDto> CreateUserAsync(UserRequestDto userRequest);
        public Task<string> AuthenticateAsync(UserRequestDto userRequest);
        public Task<OperationResultResponseDto> DeleteUserAsync(UserRequestDto userRequest);
        public Task<bool> CreateClaimToUserAsync(ClaimToUserRequestDto claimToUserRequestDtoRequest);
        public Task<bool> CreateRolAsync(CreateRolRequestDto roleName);
        public Task<bool> AssignRolToUserAsync(AssignRolToUserRequestDto rolUserRequest);
        public Task<List<DetailUsersDataResponseDto>> GetAllUsersAsync();
        public Task<bool> DeleteClaimToUserAsync(ClaimToUserRequestDto claimToUserRequestDtoRequest);
    }
}
