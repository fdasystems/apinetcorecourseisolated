using ApiCourseIsolated.Entities.Base;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Entities
{
    public class MainCourse : EntityBase
    {
        public string Name { get; set; }
        public int LevelRequired { get; set; }
        public List<DetailCourse> Details { get; set; }
    }
}
