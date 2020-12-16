using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ApiCourseIsolated.Data;
using ApiCourseIsolated.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using ApiCourseIsolated.Common;
using Microsoft.AspNetCore.Cors;

namespace ApiCourseIsolated.Controllers
{
    [EnableCors("MyPolicy"), Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class MainCoursesController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public MainCoursesController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/MainCourses
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainCourse>>> GetMainCourse()
        {
            return await _context.MainCourse.ToListAsync();
        }

        // GET: api/MainCoursesWithDetails
        [Route("MainCoursesWithDetails")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainCourse>>> GetMainCoursesWithDetails()
        {
            return await _context.MainCourse.Include(x => x.Details).ToListAsync();
        }

        [Route("GetMyMainCoursesWithDetails")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainCourse>>> GetMyMainCoursesWithDetails()
        {
            string claimName = Constants.CourseClaimName;
            int[] userLevels = this.User.Claims.Where(x => x.Type == claimName).Select(x => int.Parse(x.Value)).ToArray(); //.ToArray().ToList();
            var result = await _context.MainCourse.Include(x => x.Details).Where(o => userLevels.Contains(o.LevelRequired)).OrderBy(z => z.Id).ToListAsync();
            return result;
        }

        [Route("GetMainCoursesWithDetailsFromUserName")]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<MainCourse>>> GetMainCoursesWithDetailsFromUserName(string UserName)
        {
            string claimName = Constants.CourseClaimName;
            var user = await _context.Users.Where(x => x.UserName == UserName).FirstOrDefaultAsync();
            int[] userLevels = await _context.UserClaims.Where(y => y.UserId == user.Id && y.ClaimType == claimName).Select(x => int.Parse(x.ClaimValue)).ToArrayAsync();
            var result = await _context.MainCourse.Include(x => x.Details).Where(o => userLevels.Contains(o.LevelRequired)).OrderBy(z => z.Id).ToListAsync();
            return result;
        }



        // GET: api/MainCourses/5
        [HttpGet("{id}")]
        public async Task<ActionResult<MainCourse>> GetMainCourse(int id)
        {
            var mainCourse = await _context.MainCourse.FindAsync(id);

            if (mainCourse == null)
            {
                return NotFound();
            }

            return mainCourse;
        }

        // PUT: api/MainCourses/5
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPut("{id}")]
        public async Task<IActionResult> PutMainCourse(int id, MainCourse mainCourse)
        {
            if (id != mainCourse.Id)
            {
                return BadRequest();
            }

            _context.Entry(mainCourse).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!MainCourseExists(id))
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

        // POST: api/MainCourses
        // To protect from overposting attacks, enable the specific properties you want to bind to, for
        // more details, see https://go.microsoft.com/fwlink/?linkid=2123754.
        [HttpPost]
        public async Task<ActionResult<MainCourse>> PostMainCourse(MainCourse mainCourse)
        {
            _context.MainCourse.Add(mainCourse);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetMainCourse", new { id = mainCourse.Id }, mainCourse);
        }

        // DELETE: api/MainCourses/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<MainCourse>> DeleteMainCourse(int id)
        {
            var mainCourse = await _context.MainCourse.FindAsync(id);
            if (mainCourse == null)
            {
                return NotFound();
            }

            _context.MainCourse.Remove(mainCourse);
            await _context.SaveChangesAsync();

            return mainCourse;
        }

        private bool MainCourseExists(int id)
        {
            return _context.MainCourse.Any(e => e.Id == id);
        }
    }
}
