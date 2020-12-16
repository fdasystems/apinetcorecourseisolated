using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Identity;

namespace ApiCourseIsolated.Entities.ResponseDto
{
    public class UserDataResponseDto
    {
        public string UserName { get; set; }
        public string Token { get; set; }
    }
}
