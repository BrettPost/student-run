using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Data;
using StudentRun.Server.Models;
using StudentRun.Server.Models.DTOs.Student;
using StudentRun.Server.Models.DTOs.Teacher;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class StudentController : ControllerBase
    {

        private readonly ILogger<StudentController> _logger;
        private readonly StudentRunContext _context;

        public StudentController(ILogger<StudentController> logger, StudentRunContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var studentsDb = await _context.Students.ToListAsync();

            if (studentsDb == null) { return NotFound(); }

            var students = studentsDb.Select(s => new GetStudentDto()
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Grade = s.Grade,
                TeacherId = s.TeacherId,
            });

            return Ok(students);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult> Get(long id)
        {
            var studentDb = await _context.Students.FindAsync(id);

            if (studentDb == null) { return NotFound(); }

            GetStudentDto getStudent = new()
            {
                Id = studentDb.Id,
                FirstName = studentDb.FirstName,
                LastName = studentDb.LastName,
                Grade = studentDb.Grade,
                TeacherId = studentDb.TeacherId,
            };

            return Ok(getStudent);
        }

        [HttpPost]
        public async Task<ActionResult> Post(PostStudentDto student)
        {
            if (student == null) { return BadRequest(); }

            Student newStudent = new()
            {
                FirstName = student.FirstName,
                LastName = student.LastName,
                Grade = student.Grade,
                Laps = student.Laps,
                Miles = student.Miles,
                JoinedDate = DateTime.UtcNow,
                TeacherId = student.TeacherId,
            };
            try
            {
                _context.Students.Add(newStudent);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error Saving to Database\n\n" + e);
                return StatusCode(500, e);
            }

            return CreatedAtAction(nameof(Get), new { id = newStudent.Id }, student);
        }
    }
}
