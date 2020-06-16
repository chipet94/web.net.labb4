using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using System;

namespace web.net.labb4.Models
{
    public class Context : IdentityDbContext<User>
    {
        public Context(DbContextOptions options)
            : base(options)
        {
        }

        public DbSet<Question> Questions { get; set; }
        public DbSet<User> User { get; set; }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.ApplyConfiguration(new RoleConfiguration());
            DataSeeder.Seed(builder);
            builder.Entity<Question>()
                .Property(e => e.Choices)
                .HasConversion(
                    v => string.Join(',', v),
                    v => v.Split(',', StringSplitOptions.RemoveEmptyEntries));
        }
    }
}