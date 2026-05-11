namespace AgroData.Application.DTOs;

public class CommodityResponse
{
    public string Symbol { get; set; } = string.Empty;
    public double Price { get; set; }
    public DateTime Timestamp { get; set; }
    public string Trend { get; set; } = "Estável"; 
}