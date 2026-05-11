using AgroData.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace AgroData.Infrastructure.Context;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

    public DbSet<Commodity> Commodities { get; set; }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Commodity>().ToTable("commodity_prices");
        
        modelBuilder.Entity<Commodity>().Property(x => x.Id).HasColumnName("id");
        modelBuilder.Entity<Commodity>().Property(x => x.Symbol).HasColumnName("symbol");
        modelBuilder.Entity<Commodity>().Property(x => x.Price).HasColumnName("price");
        modelBuilder.Entity<Commodity>().Property(x => x.Timestamp).HasColumnName("timestamp");
        modelBuilder.Entity<Commodity>().Property(x => x.Source).HasColumnName("source");
    }
}