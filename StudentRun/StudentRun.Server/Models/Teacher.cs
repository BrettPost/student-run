namespace StudentRun.Server.Models;

public partial class Teacher
{
    public long Id { get; set; }

    public string? FirstName { get; set; }

    public string LastName { get; set; } = null!;

    public int? Grade { get; set; }

    public virtual ICollection<Student> Students { get; set; } = [];
}
