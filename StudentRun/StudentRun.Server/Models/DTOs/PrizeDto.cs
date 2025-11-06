namespace StudentRun.Server.Models.DTOs
{
    public class PrizeDto
    {
        public int Id { get; set; }

        public string Type { get; set; } = null!;

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int Milestone { get; set; }
    }
}
