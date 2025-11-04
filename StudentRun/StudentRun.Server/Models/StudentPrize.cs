namespace StudentRun.Server.Models;

public partial class StudentPrize
{
    public long Id { get; set; }

    public long StudentId { get; set; }

    public int PrizeId { get; set; }

    public virtual Student? Student { get; set; }

    public virtual Prize? Prize { get; set; }
}
