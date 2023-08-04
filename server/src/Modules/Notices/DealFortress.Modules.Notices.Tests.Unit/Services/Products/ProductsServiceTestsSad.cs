using DealFortress.Modules.Categories.Api.Controllers;
using DealFortress.Modules.Notices.Core.Domain.Entities;
using DealFortress.Modules.Notices.Core.Domain.Repositories;
using DealFortress.Modules.Notices.Core.Domain.Services;
using DealFortress.Modules.Notices.Core.DTO;
using DealFortress.Modules.Notices.Core.Services;
using FluentAssertions;
using Moq;

namespace DealFortress.Modules.Products.Tests.Unit;

public class ProductsServiceTestsSad
{
    private readonly IProductsService _service;
    private readonly Mock<IProductsRepository> _repo;
    private readonly ProductRequest _request;

    public ProductsServiceTestsSad()
    {
        _repo = new Mock<IProductsRepository>();

        var categoriesController = new Mock<CategoriesController>(null);

        _service = new ProductsService(_repo.Object, categoriesController.Object);

        _request = CreateProductRequest();
    }

    public static ProductRequest CreateProductRequest()
    {
        return new ProductRequest()
        {
            Name = "test",
            Price = 1,
            HasReceipt = true,
            IsSold = false,
            IsSoldSeparately = false,
            Warranty = "month",
            CategoryId = 1,
            Condition = Condition.New
        };
    }


    [Fact]
    public void PutDTOById_returns_null_when_id_doesnt_exist()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // act
        var response = _service.PutDTOById(1, _request);

        // assert
        response.Should().Be(null);
    }

    [Fact]
    public void PutDTO_should_not_replace_data_if_product_not_found()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // Act
        _service.PutDTOById(1, _request);

        // Assert 
        _repo.Verify(repo => repo.Add(It.IsAny<Product>()), Times.Never());
        _repo.Verify(repo => repo.Remove(It.IsAny<Product>()), Times.Never());
    }

    [Fact]
    public void PutDTO_should_not_complete_if_product_not_found()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // Act
        _service.PutDTOById(1, _request);

        // Assert 
        _repo.Verify(repo => repo.Complete(), Times.Never());
    }

    [Fact]
    public void PutDTO_should_return_null_if_product_not_found()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // Act
        var response = _service.PutDTOById(1, _request);

        // Assert 
        response.Should().Be(null);
    }

    [Fact]
    public void DeleteById_should_not_remove_data_and_complete_if_id_doesnt_exist()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // Act
        _service.DeleteById(1);

        // Assert 
        _repo.Verify(repo => repo.Remove(It.IsAny<Product>()), Times.Never());
        _repo.Verify(repo => repo.Complete(), Times.Never());
    }

    [Fact]
    public void DeleteById_should_not_return_product_if_id_doesnt_exist()
    {
        // arrange
        _repo.Setup(repo => repo.GetById(1));

        // Act
        var response = _service.DeleteById(1);

        // Assert 
        response.Should().Be(null);
    }
}