using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCourseIsolated.Data;
using ApiCourseIsolated.Entities;

namespace ApiCourseIsolated.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetailCoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public DetailCoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/DetailCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetailCourse>>> GetDetailCourse()
        {
            return await _context.DetailCourse.Include(x=>x.MainCourse).ToListAsync();
        }

        // GET: api/DetailCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DetailCourse>> GetDetailCourse(int id)
        {
            var detailCourse = await _context.DetailCourse.FindAsync(id);

            if (detailCourse == null)
            {
                return NotFound();
            }

            return detailCourse;
        }

        // PUT: api/DetailCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetailCourse(int id, DetailCourse detailCourse)
        {
            if (id != detailCourse.Id)
            {
                return BadRequest();
            }

            _context.Entry(detailCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!DetailCourseExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/DetailCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<DetailCourse>> PostDetailCourse(DetailCourse detailCourse)
        {
            _context.DetailCourse.Add(detailCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetDetailCourse", new { id = detailCourse.Id }, detailCourse);
        }

        // DELETE: api/DetailCourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<DetailCourse>> DeleteDetailCourse(int id)
        {
            var detailCourse = await _context.DetailCourse.FindAsync(id);
            if (detailCourse == null)
            {
                return NotFound();
            }

            _context.DetailCourse.Remove(detailCourse);
            await _context.SaveChangesAsync();

            return detailCourse;
        }

        private bool DetailCourseExists(int id)
        {
            return _context.DetailCourse.Any(e => e.Id == id);
        }
    }
}
