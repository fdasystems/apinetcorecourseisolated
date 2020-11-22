﻿using System;
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
            return await _context.MainCourse.Include(x=> x.Details).ToListAsync();
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
