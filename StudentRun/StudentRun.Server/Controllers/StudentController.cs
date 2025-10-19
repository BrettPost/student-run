using Microsoft.AspNetCore.Mvc;
using StudentRun.Server.Data;
using StudentRun.Server.Models;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentController : ControllerBase
    {

        private readonly ILogger<StudentController> _logger;
        private readonly StudentRunContext _context;

        public StudentController(ILogger<StudentController> logger, StudentRunContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet(Name = "Get")]
        public IEnumerable<Student> Get(int id)
        {
            return _context.Students.Where(s => s.TeacherId == id);
        }
    }
}
