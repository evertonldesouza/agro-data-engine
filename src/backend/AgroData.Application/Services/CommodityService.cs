using AgroData.Application.DTOs;
using AgroData.Application.Interfaces;
using AgroData.Domain.Interfaces; // Usa a interface que você criou no Domain

namespace AgroData.Application.Services;

public class CommodityService : ICommodityService
{
    private readonly ICommodityRepository _repository;

    public CommodityService(ICommodityRepository repository)
    {
        _repository = repository;
    }

    public async Task<IEnumerable<CommodityResponse>> GetLatestPricesAsync()
    {
        var data = await _repository.GetAllAsync(20);

        return data.Select(c => new CommodityResponse
        {
            Symbol = c.Symbol,
            Price = c.Price,
            Timestamp = c.Timestamp,
            Trend = "Processado"
        });
    }
}