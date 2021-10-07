using System;
using Microsoft.EntityFrameworkCore.Migrations;

namespace photoGallary.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "newPhoto",
                columns: table => new
                {
                    ID = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    category = table.Column<string>(type: "TEXT", nullable: true),
                    captureDate = table.Column<DateTime>(type: "TEXT", nullable: false),
                    size = table.Column<string>(type: "TEXT", nullable: true),
                    Resolution = table.Column<decimal>(type: "TEXT", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_newPhoto", x => x.ID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "newPhoto");
        }
    }
}
