using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Data;
using StudentRun.Server.Models.DTOs.Prize;

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
    }
}
