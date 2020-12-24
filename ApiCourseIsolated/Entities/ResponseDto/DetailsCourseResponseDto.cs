using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Entities.ResponseDto
{
    public class Details
    {
        public int Id { get; set; }
        public string UrlLink { get; set; }
        public int Order { get; set; }
        public string Description { get; set; }

    }
    public class DetailsCourseResponseDto
    {
        public int idMainCourse { get; set; }
        public List<Details> details { get; set; }
    }
}
