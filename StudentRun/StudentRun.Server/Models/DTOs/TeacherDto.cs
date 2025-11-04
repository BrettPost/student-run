namespace StudentRun.Server.Models.DTOs
{
    public class TeacherDto
    {
        public long Id { get; set; }

        public string? FirstName { get; set; }

        public string LastName { get; set; } = null!;

        public int? Grade { get; set; }
    }
}
