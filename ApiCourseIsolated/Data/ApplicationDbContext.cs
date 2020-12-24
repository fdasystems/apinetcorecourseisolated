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

        public DbSet<MainCourse> MainCourse { get; set; }
        public DbSet<DetailCourse> DetailCourse { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /*  Ver si hace falta 
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
            */
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<MainCourse>()
            .HasIndex(u => u.Name)
            .IsUnique();

            modelBuilder.Entity<MainCourse>()
            .HasIndex(u => u.LevelRequired)
            .IsUnique();

            modelBuilder.Entity<DetailCourse>()
            .HasIndex(u => new { u.MainCourseId, u.Order })
            .IsUnique();
        }


    }
}
