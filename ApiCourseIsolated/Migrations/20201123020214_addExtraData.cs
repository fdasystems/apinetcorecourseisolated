using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiCourseIsolated.Migrations
{
    public partial class addExtraData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "DetailCourse",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "DetailCourse");
        }
    }
}
