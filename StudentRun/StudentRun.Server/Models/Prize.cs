namespace StudentRun.Server.Models;

public partial class Prize
{
    public int Id { get; set; }

    public string Type { get; set; } = null!;

    public string Title { get; set; } = string.Empty;

    public string? Description { get; set; }

    public int Milestone {  get; set; }
}
