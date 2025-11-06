using System;
using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace StudentRun.Server.Data.Migrations
{
    /// <inheritdoc />
    public partial class ProgressTablesRework : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "studentPrize");

            migrationBuilder.DropTable(
                name: "studentRunMetric");

            migrationBuilder.RenameColumn(
                name: "grade",
                table: "teacher",
                newName: "Grade");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "teacher",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "teacher",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "teacher",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "grade",
                table: "student",
                newName: "Grade");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "student",
                newName: "Id");

            migrationBuilder.RenameColumn(
                name: "teacher_id",
                table: "student",
                newName: "TeacherId");

            migrationBuilder.RenameColumn(
                name: "last_name",
                table: "student",
                newName: "LastName");

            migrationBuilder.RenameColumn(
                name: "first_name",
                table: "student",
                newName: "FirstName");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "prize",
                newName: "Id");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "teacher",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying");

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "teacher",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "student",
                type: "text",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "character varying",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "FirstName",
                table: "student",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying");

            migrationBuilder.AddColumn<DateTime>(
                name: "JoinedDate",
                table: "student",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));

            migrationBuilder.AddColumn<int>(
                name: "Laps",
                table: "student",
                type: "integer",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<double>(
                name: "Miles",
                table: "student",
                type: "double precision",
                nullable: false,
                defaultValue: 0.0);

            migrationBuilder.CreateTable(
                name: "Achievements",
                columns: table => new
                {
                    Id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    Title = table.Column<string>(type: "text", nullable: false),
                    Description = table.Column<string>(type: "text", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Achievements", x => x.Id);
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Achievements");

            migrationBuilder.DropColumn(
                name: "JoinedDate",
                table: "student");

            migrationBuilder.DropColumn(
                name: "Laps",
                table: "student");

            migrationBuilder.DropColumn(
                name: "Miles",
                table: "student");

            migrationBuilder.RenameColumn(
                name: "Grade",
                table: "teacher",
                newName: "grade");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "teacher",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "teacher",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "teacher",
                newName: "first_name");

            migrationBuilder.RenameColumn(
                name: "Grade",
                table: "student",
                newName: "grade");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "student",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "TeacherId",
                table: "student",
                newName: "teacher_id");

            migrationBuilder.RenameColumn(
                name: "LastName",
                table: "student",
                newName: "last_name");

            migrationBuilder.RenameColumn(
                name: "FirstName",
                table: "student",
                newName: "first_name");

            migrationBuilder.RenameIndex(
                name: "IX_student_TeacherId",
                table: "student",
                newName: "IX_student_teacher_id");

            migrationBuilder.RenameColumn(
                name: "Id",
                table: "prize",
                newName: "id");

            migrationBuilder.AlterColumn<string>(
                name: "last_name",
                table: "teacher",
                type: "character varying",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "first_name",
                table: "teacher",
                type: "character varying",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "last_name",
                table: "student",
                type: "character varying",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "text",
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "first_name",
                table: "student",
                type: "character varying",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateTable(
                name: "studentPrize",
                columns: table => new
                {
                    id = table.Column<long>(type: "bigint", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    PrizeId = table.Column<int>(type: "integer", nullable: false),
                    StudentId = table.Column<long>(type: "bigint", nullable: false)
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

            migrationBuilder.CreateTable(
                name: "studentRunMetric",
                columns: table => new
                {
                    id = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityAlwaysColumn),
                    StudentId = table.Column<long>(type: "bigint", nullable: false),
                    Card = table.Column<int>(type: "integer", nullable: false),
                    JoinedDate = table.Column<DateTime>(type: "timestamp with time zone", nullable: false),
                    Laps = table.Column<int>(type: "integer", nullable: false)
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
    }
}
