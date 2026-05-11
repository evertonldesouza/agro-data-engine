using AgroData.Application.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace AgroData.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class CommoditiesController : ControllerBase
{
    private readonly ICommodityService _service;

    public CommoditiesController(ICommodityService service)
    {
        _service = service;
    }

    [HttpGet]
    public async Task<IActionResult> GetAll()
    {
        var result = await _service.GetLatestPricesAsync();
        return Ok(result);
    }
}