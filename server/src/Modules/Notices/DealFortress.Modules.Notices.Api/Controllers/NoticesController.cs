using DealFortress.Modules.Notices.Core.Domain.Entities;
using DealFortress.Modules.Notices.Core.Domain.Services;
using DealFortress.Modules.Notices.Core.DTO;
using DealFortress.Shared.Abstractions.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;


namespace DealFortress.Modules.Notices.Api.Controllers;

[Route("api/[controller]")]
[ApiController]
public class NoticesController : ControllerBase
{
    private readonly INoticesService _service;

    public NoticesController(INoticesService service)
    {
        _service = service;
    }

    [HttpGet]
    [ProducesResponseType(StatusCodes.Status200OK)]
    public ActionResult<PaginatedList<NoticeResponse>> GetNoticesAsync(int? userId, int pageIndex = 0, int pageSize = 20, HTTPFilter filter = HTTPFilter.createdAt)
    {
        return Ok(_service.GetAll(userId, pageIndex, pageSize));
    }

    [HttpGet("{id}")]
    [ActionName("GetNoticeAsync")]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task< ActionResult<NoticeResponse>> GetNoticeAsync(int id)
    {
       var response = await _service.GetByIdAsync(id);

       return response is null ? NotFound() : Ok(response);
    }

    [HttpPut("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status200OK)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<ActionResult<NoticeResponse>> PutNoticeAsync(int id, NoticeRequest request)
    {
        var response = await _service.PutByIdAsync(id, request);

        return response is null ? NotFound() : Ok(response);
    }

    [HttpPost]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status201Created)]
    [ProducesResponseType(StatusCodes.Status400BadRequest)]
    public async Task<ActionResult<NoticeResponse>> PostNoticeAsync(NoticeRequest request)
    {
        var response = await _service.PostAsync(request);
        
        return CreatedAtAction(nameof(GetNoticeAsync), new { id = response.Id }, response);
    }

    [HttpDelete("{id}")]
    [Authorize]
    [ProducesResponseType(StatusCodes.Status204NoContent)]
    [ProducesResponseType(StatusCodes.Status404NotFound)]
    public async Task<IActionResult> DeleteNoticeAsync(int id)
    {
        var notice = await _service.DeleteByIdAsync(id);
        
        return notice is null ? NotFound() : NoContent();
    }
}

