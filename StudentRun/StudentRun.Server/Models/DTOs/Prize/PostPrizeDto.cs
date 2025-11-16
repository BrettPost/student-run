namespace StudentRun.Server.Models.DTOs.Prize
{
    public class PostPrizeDto
    {
        public string Type { get; set; } = null!;

        public string Title { get; set; } = string.Empty;

        public string? Description { get; set; }

        public int Milestone { get; set; }
    }
}
