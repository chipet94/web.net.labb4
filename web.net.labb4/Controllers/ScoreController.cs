using System;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using System.Linq;
using System.Threading.Tasks;
using web.net.labb4.Models;

namespace web.net.labb4.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ScoreController : ControllerBase
    {
        private readonly Context _context;
        private readonly UserManager<User> _userManager;

        public ScoreController(Context context, UserManager<User> _userManager)
        {
            _context = context;
        }

        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable>> Get()
        {
            return await _context.User.Select(m => new { User = m.UserName, Score = m.HighScore, Date= m.ScoreDate })
                .OrderByDescending(m => m.Score).ThenByDescending(m => m.Date).ToListAsync();
        }

        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(string id, [FromBody] int score)
        {
            var user = await _context.User.FirstAsync(m => m.Id == id);
            if (user != null)
            {
                if (score > user.HighScore)
                {
                    user.HighScore = score;
                    user.ScoreDate = DateTime.Now;
                    await _context.SaveChangesAsync();
                }

                return Ok();
            }
            return NotFound();
        }
    }
}