using ApiCourseIsolated.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace ApiCourseIsolated.Data
{
    public class ApplicationDbContext : IdentityDbContext<CustomUser>
    {
        
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }
        /*
        public ApplicationDbContext()
        {
        }*/


        public DbSet<MainCourse> MainCourse { get; set; }      
        public DbSet<DetailCourse> DetailCourse { get; set; }
        
        /*  Ver si hace falta 
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
        */
       
    }
}
