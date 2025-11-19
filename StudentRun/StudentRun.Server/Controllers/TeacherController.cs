using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Data;
using StudentRun.Server.Models;
using StudentRun.Server.Models.DTOs.Teacher;
using StudentRun.Server.Models.DTOs.Student;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TeacherController : ControllerBase
    {

        private readonly ILogger<TeacherController> _logger;
        private readonly StudentRunContext _context;

        public TeacherController(ILogger<TeacherController> logger, StudentRunContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var teachersDb = await _context.Teachers.ToListAsync();

            if (teachersDb == null) { return NotFound(); }

            var teachers = teachersDb.Select(s => new GetTeacherDto()
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Grade = s.Grade,
            });

            return Ok(teachers);
        }

        [HttpGet("{id}/students")]
        public async Task<ActionResult> GetStudents(long id)
        {
            var teacher = await _context.Teachers
                .Include(t => t.Students)
                .FirstOrDefaultAsync(t => t.Id == id);

            if (teacher == null) { return NotFound(); }

            var students = teacher.Students.Select(s => new GetStudentDto()
            {
                Id = s.Id,
                FirstName = s.FirstName,
                LastName = s.LastName,
                Grade = s.Grade,
                TeacherId = s.TeacherId,
            });

            return Ok(students);
        }

		[HttpPost("{teacherId}/student")]
		public async Task<ActionResult> CreateStudentForTeacher(long teacherId, PostStudentDto student)
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
				TeacherId = teacherId,
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

			return CreatedAtAction(nameof(Get), new { id = newStudent.Id }, newStudent);
		}

		[HttpPost]
        public async Task<ActionResult> CreateTeacher(PostTeacherDto teacher)
        {
            if (teacher == null) { return BadRequest(); }

            Teacher newTeacher = new()
            {
                FirstName = teacher.FirstName,
                LastName = teacher.LastName,
                Grade = teacher.Grade,
            };
            try
            {
                _context.Teachers.Add(newTeacher);
                await _context.SaveChangesAsync();
            } catch (Exception e)
            {
                Console.WriteLine("Error Saving to Database\n\n" + e);
                return StatusCode(500, e);
            }

            return CreatedAtAction(nameof(Get), new {id = newTeacher.Id}, newTeacher);
        }

    }
}
