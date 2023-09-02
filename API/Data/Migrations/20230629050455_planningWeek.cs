using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace API.Data.Migrations
{
    public partial class planningWeek : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "PlanningWeeks",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    refPlanningWeek = table.Column<string>(type: "TEXT", nullable: true),
                    User = table.Column<string>(type: "TEXT", nullable: true),
                    Opération = table.Column<string>(type: "TEXT", nullable: true),
                    LundiId = table.Column<int>(type: "INTEGER", nullable: true),
                    MardiId = table.Column<int>(type: "INTEGER", nullable: true),
                    MercrediId = table.Column<int>(type: "INTEGER", nullable: true),
                    JeudiId = table.Column<int>(type: "INTEGER", nullable: true),
                    VendrediId = table.Column<int>(type: "INTEGER", nullable: true),
                    SamediId = table.Column<int>(type: "INTEGER", nullable: true),
                    DimancheId = table.Column<int>(type: "INTEGER", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PlanningWeeks", x => x.Id);
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_DimancheId",
                        column: x => x.DimancheId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_JeudiId",
                        column: x => x.JeudiId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_LundiId",
                        column: x => x.LundiId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_MardiId",
                        column: x => x.MardiId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_MercrediId",
                        column: x => x.MercrediId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_SamediId",
                        column: x => x.SamediId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                    table.ForeignKey(
                        name: "FK_PlanningWeeks_Planning_VendrediId",
                        column: x => x.VendrediId,
                        principalTable: "Planning",
                        principalColumn: "Id");
                });

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_DimancheId",
                table: "PlanningWeeks",
                column: "DimancheId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_JeudiId",
                table: "PlanningWeeks",
                column: "JeudiId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_LundiId",
                table: "PlanningWeeks",
                column: "LundiId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_MardiId",
                table: "PlanningWeeks",
                column: "MardiId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_MercrediId",
                table: "PlanningWeeks",
                column: "MercrediId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_SamediId",
                table: "PlanningWeeks",
                column: "SamediId");

            migrationBuilder.CreateIndex(
                name: "IX_PlanningWeeks_VendrediId",
                table: "PlanningWeeks",
                column: "VendrediId");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PlanningWeeks");
        }
    }
}
