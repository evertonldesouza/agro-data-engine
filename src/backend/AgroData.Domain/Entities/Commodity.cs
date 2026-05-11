namespace AgroData.Domain.Entities;

public class Commodity
{
    public int Id { get; set; }
    public string Symbol { get; set; } = string.Empty;
    public double Price { get; set; } 
    public DateTime Timestamp { get; set; }
    public string Source { get; set; } = "Simulated";
}