namespace StudentRun.Server.Models.DTOs.Teacher
{
    public class GetTeacherDto
    {
        public long Id { get; set; }

        public string? FirstName { get; set; }

        public string LastName { get; set; } = null!;

        public int? Grade { get; set; }
    }
}
