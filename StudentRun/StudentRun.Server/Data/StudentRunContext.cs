using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Models;

namespace StudentRun.Server.Data;

public partial class StudentRunContext : DbContext
{
    public StudentRunContext()
    {
    }

    public StudentRunContext(DbContextOptions<StudentRunContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Student> Students { get; set; }

    public virtual DbSet<Teacher> Teachers { get; set; }

    public virtual DbSet<Prize> Prizes { get; set; }

    public virtual DbSet<Achievement> Achievements { get; set; }

    //protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    //#warning 
    //    //To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
    //    => optionsBuilder.UseNpgsql("Host=localhost;Port=5432;Database=student_run;Username=postgres;Password=110120");

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Student>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("student_pkey");

            entity.ToTable("student");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn();

            entity.HasOne(d => d.Teacher).WithMany(p => p.Students)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("student_teacher_id_teacher_id_fk");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teacher_pkey");

            entity.ToTable("teacher");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn();
        });

        modelBuilder.Entity<Prize>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("prize_pkey");

            entity.ToTable("prize");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn();
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
