namespace StudentRun.Server.Models.DTOs
{
    public class StudentDto
    {
        public long Id { get; set; }

        public string FirstName { get; set; } = null!;

        public string? LastName { get; set; }

        public int? Grade { get; set; }

        public long? TeacherId { get; set; }
    }
}
