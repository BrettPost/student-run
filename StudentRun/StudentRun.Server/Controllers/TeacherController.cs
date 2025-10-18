using Microsoft.AspNetCore.Mvc;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeacherController : ControllerBase
    {

        private readonly ILogger<TeacherController> _logger;

        public TeacherController(ILogger<TeacherController> logger)
        {
            _logger = logger;
        }

        [HttpGet(Name = "GetWeatherForecast")]
        public IEnumerable<Teacher> Get()
        {
            return Enumerable.Range(1, 5).Select(index => new Teacher
            {
                Id = index,
                FirstName = $"Brett - {index}",
                LastName = $"Post - {index}",
                Grade = index
            })
            .ToArray();
        }
    }
}
