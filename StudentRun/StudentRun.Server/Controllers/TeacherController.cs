using Microsoft.AspNetCore.Mvc;
using StudentRun.Server.Data;
using StudentRun.Server.Models;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class TeacherController : ControllerBase
    {

        private readonly ILogger<TeacherController> _logger;
        private readonly StudentRunContext _context;

        public TeacherController(ILogger<TeacherController> logger, StudentRunContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet("/teacher")]
        public IEnumerable<Teacher> GetTeachers()
        {
            return _context.Teachers;
        }

        [HttpGet("/teacher/{id}/student")]
        public IEnumerable<Student> GetStudents(int id)
        {
            return _context.Students.Where(s => s.TeacherId == id);
        }
    }
}
