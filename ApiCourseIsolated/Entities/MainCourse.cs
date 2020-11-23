using ApiCourseIsolated.Entities.Base;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Entities
{
    public class MainCourse : EntityBase
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public int LevelRequired { get; set; }
        public List<DetailCourse> Details { get; set; }
    }
}
