using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class planningTable1 : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Planning",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    refPlanning = table.Column<string>(type: "TEXT", nullable: true),
                    HeureDebut_S1 = table.Column<string>(type: "TEXT", nullable: true),
                    HeureFin_S1 = table.Column<string>(type: "TEXT", nullable: true),
                    HeureDebut_S2 = table.Column<string>(type: "TEXT", nullable: true),
                    HeureFin_S2 = table.Column<string>(type: "TEXT", nullable: true),
                    HeuresPlanifie = table.Column<float>(type: "REAL", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Planning", x => x.Id);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Planning");
        }
    }
}
