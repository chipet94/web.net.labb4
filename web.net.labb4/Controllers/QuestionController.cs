using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using web.net.labb4.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace web.net.labb4.con
{
    [ApiController]
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class QuestionController : ControllerBase
    {
        private readonly Context _context;
        public QuestionController(Context context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet]
        public async Task<IEnumerable<Question>> Get()
        {
            return await _context.Questions.ToListAsync();
        }

        [Authorize]
        [HttpGet("{id}")]
        public async Task<ActionResult<Question>> Get(int id)
        {
            if (QuestionExists(id))
            {
                return await _context.Questions.FindAsync(id);
            }

            return NotFound();
        }
        [Authorize]
        [HttpPost]
        public async Task<ActionResult<Question>> Post(Question question)
        {
            if (!ModelState.IsValid)
            {
                return new BadRequestObjectResult(ModelState);
            }
            try
            {
                _context.Add(question);
                await _context.SaveChangesAsync();
                return Ok("Added Question!");
            }
            catch (Exception e)
            {
                Console.WriteLine(e);
                return BadRequest(e.Message);
            }
        }

        private bool QuestionExists(int id)
        {
            return _context.Questions.Any(m => m.Id == id);
        }
    }
}