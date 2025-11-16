using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Data;
using StudentRun.Server.Models;
using StudentRun.Server.Models.DTOs.Prize;
using StudentRun.Server.Models.DTOs.Teacher;

namespace StudentRun.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class PrizeController : ControllerBase
    {
        private readonly ILogger<TeacherController> _logger;
        private readonly StudentRunContext _context;

        public PrizeController(ILogger<TeacherController> logger, StudentRunContext context)
        {
            _logger = logger;
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult> Get()
        {
            var prizeDb = await _context.Prizes.ToListAsync();

            if (prizeDb == null) { return NotFound(); }

            var prizes = prizeDb.Select(s => new GetPrizeDto()
            {
                Id = s.Id,
                Type = s.Type,
                Title = s.Title,
                Description = s.Description,
                Milestone = s.Milestone,
            });

            return Ok(prizes);
        }

        [HttpPost]
        public async Task<ActionResult> Post(PostPrizeDto prize)
        {
            if (prize == null) { return BadRequest(); }

            Prize newPrize = new()
            {
                Type = prize.Type,
                Title = prize.Title,
                Description = prize.Description,
                Milestone = prize.Milestone,
            };
            try
            {
                _context.Prizes.Add(newPrize);
                await _context.SaveChangesAsync();
            }
            catch (Exception e)
            {
                Console.WriteLine("Error Saving to Database\n\n" + e);
                return StatusCode(500, e);
            }

            return CreatedAtAction(nameof(Get), new { id = newPrize.Id }, prize);
        }
    }
}
