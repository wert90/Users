using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Users.Data.Models;

namespace Users.Data;

public partial class MyDBContext : DbContext
{
    public MyDBContext(DbContextOptions<MyDBContext> options)
        : base(options)
    {
    }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Users__3214EC07816F7224");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
