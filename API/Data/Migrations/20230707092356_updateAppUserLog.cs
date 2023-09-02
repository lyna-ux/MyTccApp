using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class updateAppUserLog : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_logs_AspNetUsers_AppUserId",
                table: "logs");

            migrationBuilder.DropIndex(
                name: "IX_logs_AppUserId",
                table: "logs");

            migrationBuilder.AddColumn<string>(
                name: "CIN",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Date",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<int>(
                name: "IdSage",
                table: "logs",
                type: "INTEGER",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Nom",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Opération",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Prenom",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "refPlanningWeek",
                table: "logs",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Opération",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "logRef",
                table: "AspNetUsers",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "CIN",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "Date",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "IdSage",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "Nom",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "Opération",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "Prenom",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "refPlanningWeek",
                table: "logs");

            migrationBuilder.DropColumn(
                name: "Opération",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "logRef",
                table: "AspNetUsers");

            migrationBuilder.CreateIndex(
                name: "IX_logs_AppUserId",
                table: "logs",
                column: "AppUserId");

            migrationBuilder.AddForeignKey(
                name: "FK_logs_AspNetUsers_AppUserId",
                table: "logs",
                column: "AppUserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
