using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Entities.RequestDto
{
    public class ClaimToUserRequestDto
    {
        [Required]
        public string UserEmail { get; set; }
        [Required]
        public string NewClaimName { get; set; }
        [Required]
        public string NewClaimValue { get; set; }
    }
}
