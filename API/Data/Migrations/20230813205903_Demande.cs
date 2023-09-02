using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class Demande : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
           migrationBuilder.CreateTable(
        name: "Demandes",
        columns: table => new
        {
            Id = table.Column<int>(type: "INTEGER", nullable: false)
                .Annotation("Sqlite:Autoincrement", true),
            refDemande = table.Column<string>(type: "TEXT", nullable: true),
            NomDeposant = table.Column<string>(type: "TEXT", nullable: true),
            PrenomDeposant = table.Column<string>(type: "TEXT", nullable: true),
            MatriculeDeposant = table.Column<string>(type: "TEXT", nullable: true),
            NomTraitant = table.Column<string>(type: "TEXT", nullable: true),
            PrenomTraitant = table.Column<string>(type: "TEXT", nullable: true),
            Statut = table.Column<int>(type: "INTEGER", nullable: false),
            Type = table.Column<string>(type: "TEXT", nullable: true),
            service = table.Column<string>(type: "TEXT", nullable: true),
            details = table.Column<string>(type: "TEXT", nullable: true), // Change from "nvarchar(max)" to "TEXT"
            commentaireTraitement = table.Column<string>(type: "TEXT", nullable: true) // Change from "nvarchar(max)" to "TEXT"
        },
        constraints: table =>
        {
            table.PrimaryKey("PK_Demandes", x => x.Id);
        });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Demandes");
        }
    }
}
