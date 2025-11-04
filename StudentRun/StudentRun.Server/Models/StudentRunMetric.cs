namespace StudentRun.Server.Models;

public partial class StudentRunMetric
{
    public int Id { get; set; }

    public int Card { get; set; } = 0;

    public int Laps { get; set; } = 0;

    public DateTime JoinedDate { get; set; }

    public long StudentId { get; set; }

    public virtual Student? Student { get; set; }
}
