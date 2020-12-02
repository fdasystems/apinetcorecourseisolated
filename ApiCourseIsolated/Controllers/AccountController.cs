using System.Threading.Tasks;
using ApiCourseIsolated.Entities.RequestDto;
using ApiCourseIsolated.Entities.ResponseDto;
using ApiCourseIsolated.Services.Contracts;
using Microsoft.AspNetCore.Mvc;

namespace ApiCourseIsolated.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticateService _authenticateService;

        public AccountController
            (
                IAuthenticateService authenticateService
            )
        {
            _authenticateService = authenticateService;
        }

        [Route("Login")]
        [HttpPost]
      //  public async Task<IActionResult> LoginTokenFromService([FromBody] UserRequestDto model)
        public async Task<JsonResult> LoginTokenFromService([FromBody] UserRequestDto model)
        {
            if (ModelState.IsValid)
            {
                //if (this.User.Identity.IsAuthenticated)
                var token = await _authenticateService.AuthenticateAsync(model);

                if (token != null)
                {

                    UserDataResponseDto userData = new UserDataResponseDto() 
                    {
                     UserName = model.userName,
                     Token = token,
                     ExpirationDate = string.Empty //Then replace value if this property is used
                    };

                    //return Ok(token);
                   // return new JsonResult(token);
                    return new JsonResult(userData);
                }
            }

            //return BadRequest("invalid login");
            return null;
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTokenFromService([FromBody] UserRequestDto model) 
        {
            if (ModelState.IsValid)
            {
                var token = await _authenticateService.CreateUserAsync(model);

                if (token != null)
                {
                    return Ok(token);
                }
            }

            return BadRequest("policy required not accomplished");
        }

        [Route("CreateClaimToUser")]
        [HttpPost]
        public async Task<IActionResult> CreateClaimToUser(ClaimToUserRequestDto model)
        {
            if (ModelState.IsValid)
            {
                bool result = await _authenticateService.CreateClaimToUserAsync(model);

                if (result)
                {
                    return Ok(result);
                }
            }

            return BadRequest("Failed when try to assign Claim");
        }
    }
}
