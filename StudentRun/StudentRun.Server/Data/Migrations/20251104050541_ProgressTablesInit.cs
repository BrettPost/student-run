using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace StudentRun.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class ProgressTablesInit : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "prize",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Type = table.Column<string>(type: "text", nullable: false),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true),
                    Milestone = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("prize_pkey", x => x.id);
                });

            migrationBuilder.CreateTable(
                name: "studentRunMetric",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    Card = table.Column<int>(type: "integer", nullable: false),
                    Laps = table.Column<int>(type: "integer", nullable: false),
                    JoinedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("studentRunMetric_pkey", x => x.id);
                    table.ForeignKey(
                        name: "studentRunMetric_id_teacher_id_fk",
                        column: x => x.StudentId,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "studentPrize",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    StudentId = table.Column<long>(type: "bigint", nullable: false),
                    PrizeId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("studentPrize_pkey", x => x.id);
                    table.ForeignKey(
                        name: "FK_studentPrize_prize_PrizeId",
                        column: x => x.PrizeId,
                        principalTable: "prize",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "studentPrize_id_student_id_fk",
                        column: x => x.StudentId,
                        principalTable: "student",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_studentPrize_PrizeId",
                table: "studentPrize",
                column: "PrizeId");

            migrationBuilder.CreateIndex(
                name: "IX_studentPrize_StudentId",
                table: "studentPrize",
                column: "StudentId");

            migrationBuilder.CreateIndex(
                name: "IX_studentRunMetric_StudentId",
                table: "studentRunMetric",
                column: "StudentId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "studentPrize");

            migrationBuilder.DropTable(
                name: "studentRunMetric");

            migrationBuilder.DropTable(
                name: "prize");
        }
    }
}
