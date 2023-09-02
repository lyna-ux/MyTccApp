using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class dates : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "dateAnnulation",
                table: "Demandes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dateDepot",
                table: "Demandes",
                type: "TEXT",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "dateTraitement",
                table: "Demandes",
                type: "TEXT",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "dateAnnulation",
                table: "Demandes");

            migrationBuilder.DropColumn(
                name: "dateDepot",
                table: "Demandes");

            migrationBuilder.DropColumn(
                name: "dateTraitement",
                table: "Demandes");
        }
    }
}
