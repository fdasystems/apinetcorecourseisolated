using System.ComponentModel.DataAnnotations;

namespace ApiCourseIsolated.Entities.RequestDto
{
    public class AssignRolToUserRequestDto
    {
        [Required]
        public string UserName { get; set; }
        [Required]
        public string RoleName { get; set; }
    }
}
