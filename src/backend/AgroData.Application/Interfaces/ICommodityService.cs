using AgroData.Application.DTOs;

namespace AgroData.Application.Interfaces;

public interface ICommodityService
{
    Task<IEnumerable<CommodityResponse>> GetLatestPricesAsync();
}