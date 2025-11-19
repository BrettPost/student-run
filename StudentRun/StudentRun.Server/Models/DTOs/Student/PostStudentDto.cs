namespace StudentRun.Server.Models.DTOs.Student
{
    public class PostStudentDto
    {
        public string FirstName { get; set; } = null!;

        public string? LastName { get; set; }

        public int? Grade { get; set; }

        public int Laps { get; set; } = 0;

        public double Miles { get; set; } = 0;
    }
}
