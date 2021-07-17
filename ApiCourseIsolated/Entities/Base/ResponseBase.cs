using System.Collections.Generic;

namespace ApiCourseIsolated.Entities.Base
{
    public class ResponseBase
    {
        public string Message { get; set; }
        public List<string>? ErrorList { get; set; }
    }
}
