using ApiCourseIsolated.Entities.Base;
using System.ComponentModel.DataAnnotations;

namespace ApiCourseIsolated.Entities
{
    public class DetailCourse : EntityBase
    {
        [Required]
        public string UrlLink { get; set; }
        public int Order { get; set; }
        public int MainCourseId { get; set; }
        public MainCourse MainCourse { get; set; }
    }
}
