using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiCourseIsolated.Migrations
{
    public partial class uniqueLevel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_MainCourse_LevelRequired",
                table: "MainCourse",
                column: "LevelRequired",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MainCourse_LevelRequired",
                table: "MainCourse");
        }
    }
}
