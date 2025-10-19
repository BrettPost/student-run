using System;
using System.Collections.Generic;

namespace StudentRun.Server.Models;

public partial class Student
{
    public long Id { get; set; }

    public string FirstName { get; set; } = null!;

    public string? LastName { get; set; }

    public int? Grade { get; set; }

    public long? TeacherId { get; set; }

    public virtual Teacher? Teacher { get; set; }
}
