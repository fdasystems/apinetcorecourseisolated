using Microsoft.AspNetCore.Identity;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Entities
{
    public class CustomUser : IdentityUser
    {
        public string Obs { get; set; }
    }
}
