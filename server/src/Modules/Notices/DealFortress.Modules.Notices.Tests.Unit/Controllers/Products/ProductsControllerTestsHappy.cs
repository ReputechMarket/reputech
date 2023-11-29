using System.Security.Claims;
using DealFortress.Modules.Notices.Api.Controllers;
using DealFortress.Modules.Notices.Core.Domain.Entities;
using DealFortress.Modules.Notices.Core.Domain.Services;
using DealFortress.Modules.Notices.Core.DTO;
using DealFortress.Modules.Users.Api.Controllers;
using FluentAssertions;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Moq;

namespace DealFortress.Modules.Notices.Tests.Unit;

public class ProductControllersTestsHappy
{
    private readonly ProductsController _controller;
    private readonly Mock<IProductsService> _service;
    private readonly ProductRequest _request;
    private readonly ProductResponse _response;
    private readonly Product _Product;

    public ProductControllersTestsHappy()
    {
        _service = new Mock<IProductsService>();

        _controller = new ProductsController(_service.Object);

        _request = CreateProductRequest();

        _response = CreateProductResponse();

        _Product = CreateProduct();

        CreateFakeClaims();
    }

    private void CreateFakeClaims()
    {
        var fakeClaims = new List<Claim>()
        {
            new Claim(ClaimTypes.NameIdentifier, "authId"),
            new Claim("RoleId", "1"),
            new Claim("UserName", "John")
        };

        var fakeIdentity = new ClaimsIdentity(fakeClaims, "TestAuthType");
        var fakeClaimsPrincipal = new ClaimsPrincipal(fakeIdentity);

        _controller.ControllerContext.HttpContext = new DefaultHttpContext
        {
            User = fakeClaimsPrincipal 
        };
    }

    public ProductRequest CreateProductRequest()
    {
        return new ProductRequest
        {
            Name = "test",
            Price = 1,
            HasReceipt = true,
            SoldStatus = SoldStatus.Available,
            IsSoldSeparately = false,
            Warranty = "month",
            CategoryId = 1,
            Condition = Condition.New,
            ImageRequests = new List<ImageRequest>(){
                new ImageRequest()
                {
                    Url = "Hello world"
                }
            }
        };
    }

    public ProductResponse CreateProductResponse()
    {
        return new ProductResponse()
        {
            Id = 1,
            Name = "test",
            Price = 1,
            HasReceipt = true,
            IsSoldSeparately = false,
            SoldStatus = SoldStatus.Available,
            Warranty = "month",
            CategoryId = 1,
            Condition = Condition.New,

            Images = new List<ImageResponse>(){
                new ImageResponse()
                {
                    Url = "Hello world"
                }
            },
            NoticeId = 1,
        };
    }

    public Product CreateProduct()
    {
        return new Product()
        {
            Id = 1,
            Name = "test",
            Price = 1,
            HasReceipt = true,
            SoldStatus = SoldStatus.Available,
            IsSoldSeparately = false,
            Warranty = "month",
            CategoryId = 1,
            Condition = Condition.New,
            Notice = new Notice()
            {
                Id = 1,
                UserId = 1,
                Title = "test title",
                Description = "test description",
                City = "test city",
                Payments = "cast,swish",
                DeliveryMethods = "mail,delivered",
                CreatedAt = new DateTime(),
            }
        };
    }


    [Fact]
    public void GetProducts_should_return_ok()
    {
        // Arrange
        var content = new List<ProductResponse> { _response };
        _service.Setup(service => service.GetAll()).Returns(content);
        // Act
        var httpResponses = _controller.GetProducts();
        // Assert 
        httpResponses.Result.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public void GetProducts_return_list_of_response_when_server_returns_responses()
    {
        // Arrange
        var list = new List<ProductResponse> { _response };
        _service.Setup(service => service.GetAll()).Returns(list);
        // Act
        var httpResponses = _controller.GetProducts();
        // Assert 
        var content = httpResponses.Result.As<OkObjectResult>().Value;
        content.Should().BeOfType<List<ProductResponse>>();
    }

    [Fact]
    public void PatchProductSoldStatus_return_ok_object_response_when_service_return_response()
    {
        // Arrange
        _service.Setup(service => service.PatchSoldStatusById(1, SoldStatus.Available,"authId")).Returns(_response);
        // Act
        var httpResponse = _controller.PatchProductSoldStatus(1, SoldStatus.Available);
        // Assert 
        httpResponse.Should().BeOfType<OkObjectResult>();
    }

    [Fact]
    public void DeleteProduct_should_return_no_content()
    {
        // Arrange
        _service.Setup(service => service.DeleteById(1)).Returns(_Product);
        // Act
        var httpResponse = _controller.DeleteProduct(1);
        // Assert 
        httpResponse.Should().BeOfType<NoContentResult>();
    }
}