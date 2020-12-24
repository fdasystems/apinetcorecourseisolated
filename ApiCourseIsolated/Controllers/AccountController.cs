using System;
using System.Threading.Tasks;
using ApiCourseIsolated.Entities.RequestDto;
using ApiCourseIsolated.Entities.ResponseDto;
using ApiCourseIsolated.Services.Contracts;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

namespace ApiCourseIsolated.Controllers
{
    [EnableCors("MyPolicy"), Route("api/[controller]")]
    [ApiController]
    public class AccountController : ControllerBase
    {
        private readonly IAuthenticateService _authenticateService;
        private string _fullErrorList = string.Empty;

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
                try
                {
                    var token = await _authenticateService.AuthenticateAsync(model);

                    if (token != null)
                    {

                        UserDataResponseDto userData = new UserDataResponseDto()
                        {
                            UserName = model.userName,
                            Token = token
                            // ,ExpirationDate = string.Empty Then replace value if this property is used
                        };

                        //return Ok(token);
                        // return new JsonResult(token);
                        return new JsonResult(userData);
                    }
                }
                catch (Exception e)
                {
                    string inner = e.InnerException != null ? e.InnerException.Message : string.Empty;
                    string error = "ERROR Mesagge:" + e.Message + "||||Inner" + inner;
                    error += "|||Stactrace:" + e.StackTrace;
                    //throw;

                    UserDataResponseDto userData = new UserDataResponseDto()
                    {
                        UserName = model.userName,
                        Token = error
                        //, ExpirationDate = string.EmptyThen replace value if this property is used
                    };


                    return new JsonResult(userData);
                }
            }

            _fullErrorList = "Clave o usuario incorrecto"; //TODO: en realidad se deberia hacer un refactor para que se devuelva el error del sistema ahora que esta traducido
            ModelState.AddModelError("message", _fullErrorList);
            //return BadRequest("invalid login");
            return null;
           // return BadRequest(ModelState); va este pero hay que cambiar la respuesta del JSON
        }

        [Route("Create")]
        [HttpPost]
        public async Task<IActionResult> CreateTokenFromService([FromBody] UserRequestDto model)
        {
            if (ModelState.IsValid)
            {
                UserDataResultResponseDto result = await _authenticateService.CreateUserAsync(model);
    
                if (result.Token != null)
                {
                    result.Message = "Usuario creado exitosamente.";
                    return Ok(result);
                }

                foreach (string error in result.ErrorList) 
                {
                    _fullErrorList += error + " ******************************** ";
                }
                
                ModelState.AddModelError("message", _fullErrorList);
            }

            return BadRequest(ModelState);
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

                _fullErrorList = "Falló al intentar asignar atributo al usuario";
                ModelState.AddModelError("message", _fullErrorList);
            }

            return BadRequest(ModelState);
        }

        [Route("CreateRol")]
        [HttpPost]
        public async Task<IActionResult> CreateRol(CreateRolRequestDto model)
        {
            if (ModelState.IsValid)
            {
                bool result = await _authenticateService.CreateRolAsync(model);

                if (result)
                {
                    return Ok(result);
                }
                _fullErrorList = "Falló al intentar crear Rol";
                ModelState.AddModelError("message", _fullErrorList);
            }

            return BadRequest(ModelState);
        }

        [Route("AssignRolToUser")]
        [HttpPost]
        public async Task<IActionResult> AssignRolToUser(AssignRolToUserRequestDto model)
        {
            if (ModelState.IsValid)
            {
                bool result = await _authenticateService.AssignRolToUserAsync(model);

                if (result)
                {
                    return Ok(result);
                }
                _fullErrorList="Falló al intentar asignar Rol";
                ModelState.AddModelError("message", _fullErrorList);
            }

            return BadRequest(ModelState);
        }

        [Route("GetAllUsers")]
        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            try
            {
                var result = await _authenticateService.GetAllUsersAsync();
                if (result != null)
                {
                    return Ok(result);
                }
                _fullErrorList = "Sin datos para mostrar";
            }
            catch (Exception ex)
            {
                _fullErrorList = "Ocurrio un error al tratar de obtener usuarios.";
                _fullErrorList += "Detalles: " + ex.Message + "|||" + ex.InnerException != null ? ex.InnerException.ToString() : string.Empty;
            }
            
            ModelState.AddModelError("message", _fullErrorList);
            return BadRequest(ModelState);
        }
    }
}
