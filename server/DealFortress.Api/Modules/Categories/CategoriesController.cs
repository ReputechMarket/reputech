using Microsoft.AspNetCore.Mvc;

namespace DealFortress.Api.Modules.Categories;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
 {
    private readonly ICategoriesRepository _repo;

    private readonly CategoriesService _service;

    public CategoriesController(ICategoriesRepository repo, CategoriesService service)
    {
        _repo = repo;
        _service = service;
    }

    [HttpGet]
    public ActionResult<IEnumerable<Category>> GetCategories()
    {
        return Ok(_repo.GetAll());
    }

    [HttpGet("{id}")]
    public ActionResult<CategoryResponse> GetCategory(int id)
    {
        var category = _repo.GetById(id);

        if (category == null)
        {
            return NotFound();
        }

        return Ok(_service.ToCategoryResponseDTO(category));
    }


    [HttpPost]
    public ActionResult<CategoryResponse> PostCategory(CategoryRequest request)
    {
        var category = _service.ToCategory(request);

        _repo.Add(category);
        _repo.Complete();

        return CreatedAtAction("GetCategory", new { id = category.Id }, _service.ToCategoryResponseDTO(category));
    }
}

