using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class AddStatutEnum : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
        name: "StatutDescription",
        table: "Demandes",
        nullable: true);

    migrationBuilder.Sql("UPDATE Demandes SET StatutDescription = 'En cours' WHERE Statut = 0;");
    migrationBuilder.Sql("UPDATE Demandes SET StatutDescription = 'Annulée' WHERE Statut = 1;");
    migrationBuilder.Sql("UPDATE Demandes SET StatutDescription = 'Traitée' WHERE Statut = 2;");
    migrationBuilder.Sql("UPDATE Demandes SET StatutDescription = 'Rejetée' WHERE Statut = 3;");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {

        }
    }
}
