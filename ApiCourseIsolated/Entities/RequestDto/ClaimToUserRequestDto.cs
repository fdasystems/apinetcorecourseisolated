using System.ComponentModel.DataAnnotations;

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
