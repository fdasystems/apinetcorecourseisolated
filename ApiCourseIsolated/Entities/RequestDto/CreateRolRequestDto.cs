using System.ComponentModel.DataAnnotations;

namespace ApiCourseIsolated.Entities.RequestDto
{
    public class CreateRolRequestDto
    {
        [Required]
        public string RoleName { get; set; }
    }
}
