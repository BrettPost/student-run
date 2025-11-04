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

    public virtual DbSet<Prize> Prize { get; set; }

    public virtual DbSet<StudentPrize> StudentPrize { get; set; }

    public virtual DbSet<StudentRunMetric> StudentRunMetric { get; set; }

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
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasColumnType("character varying")
                .HasColumnName("first_name");
            entity.Property(e => e.Grade).HasColumnName("grade");
            entity.Property(e => e.LastName)
                .HasColumnType("character varying")
                .HasColumnName("last_name");
            entity.Property(e => e.TeacherId).HasColumnName("teacher_id");

            entity.HasOne(d => d.Teacher).WithMany(p => p.Students)
                .HasForeignKey(d => d.TeacherId)
                .HasConstraintName("student_teacher_id_teacher_id_fk");
        });

        modelBuilder.Entity<Teacher>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("teacher_pkey");

            entity.ToTable("teacher");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
            entity.Property(e => e.FirstName)
                .HasColumnType("character varying")
                .HasColumnName("first_name");
            entity.Property(e => e.Grade).HasColumnName("grade");
            entity.Property(e => e.LastName)
                .HasColumnType("character varying")
                .HasColumnName("last_name");
        });

        modelBuilder.Entity<Prize>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("prize_pkey");

            entity.ToTable("prize");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");
        });

        modelBuilder.Entity<StudentPrize>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("studentPrize_pkey");

            entity.ToTable("studentPrize");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentPrizes)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("studentPrize_id_student_id_fk");
        });

        modelBuilder.Entity<StudentRunMetric>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("studentRunMetric_pkey");

            entity.ToTable("studentRunMetric");

            entity.Property(e => e.Id)
                .UseIdentityAlwaysColumn()
                .HasColumnName("id");

            entity.HasOne(d => d.Student).WithMany(p => p.StudentRunMetrics)
                .HasForeignKey(d => d.StudentId)
                .HasConstraintName("studentRunMetric_id_teacher_id_fk");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
