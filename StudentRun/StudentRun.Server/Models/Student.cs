namespace StudentRun.Server.Models;

public partial class Student
{
    public long Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public int? Grade { get; set; }

    public long? TeacherId { get; set; }

    public virtual Teacher? Teacher { get; set; }

    public virtual ICollection<StudentPrize> StudentPrizes { get; set; } = [];

    public virtual ICollection<StudentRunMetric> StudentRunMetrics { get; set; } = [];
}
