using Microsoft.EntityFrameworkCore.Migrations;

namespace ApiCourseIsolated.Migrations
{
    public partial class set_constraints_main_detail_course : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_DetailCourse_MainCourseId",
                table: "DetailCourse");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "MainCourse",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "nvarchar(max)",
                oldNullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_MainCourse_Name",
                table: "MainCourse",
                column: "Name",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_DetailCourse_MainCourseId_Order",
                table: "DetailCourse",
                columns: new[] { "MainCourseId", "Order" },
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "IX_MainCourse_Name",
                table: "MainCourse");

            migrationBuilder.DropIndex(
                name: "IX_DetailCourse_MainCourseId_Order",
                table: "DetailCourse");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "MainCourse",
                type: "nvarchar(max)",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.CreateIndex(
                name: "IX_DetailCourse_MainCourseId",
                table: "DetailCourse",
                column: "MainCourseId");
        }
    }
}
