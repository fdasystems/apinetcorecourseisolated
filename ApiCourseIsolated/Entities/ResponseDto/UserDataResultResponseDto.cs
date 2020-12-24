using System.Collections.Generic;

namespace ApiCourseIsolated.Entities.ResponseDto
{
    public class UserDataResultResponseDto
    {
        public string Token { get; set; }
        public string Message { get; set; }
        public List<string> ErrorList { get; set; }

    }
}
