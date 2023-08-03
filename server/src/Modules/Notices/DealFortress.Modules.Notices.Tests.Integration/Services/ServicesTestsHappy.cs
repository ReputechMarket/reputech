using DealFortress.Modules.Notices.Core.DTO;
using DealFortress.Modules.Notices.Core.Services;
using FluentAssertions;
using DealFortress.Modules.Notices.Core.Domain.Entities;
using DealFortress.Modules.Notices.Tests.Integration.Fixture;
using DealFortress.Modules.Notices.Core.DAL.Repositories;
using DealFortress.Modules.Notices.Core.Domain.Services;
using DealFortress.Modules.Categories.Core.DTO;
using DealFortress.Modules.Categories.Core.Domain.Entities;
using DealFortress.Modules.Notices.Core.Domain.Repositories;
using Moq;

namespace DealFortress.Modules.Notices.Tests.Unit;

public class ServicesTestsHappy : IClassFixture<NoticesFixture>
{
    private readonly INoticesService _service;
    private readonly INoticesRepository _repo;
    private readonly NoticeRequest _request;
    private readonly Notice _notice;
    public NoticesFixture Fixture;

    public ServicesTestsHappy(NoticesFixture fixture)
    {
        Fixture = fixture;

        _repo = new NoticesRepository(Fixture.context);

        var productsService = new Mock<IProductsService>();

        _service = new NoticesService(productsService.Object, _repo);

        _request = new NoticeRequest
        {
            Title = "test title 1",
            Description = "test description",
            City = "test city",
            Payments = new[] { "cast", "swish" },
            DeliveryMethods = new[] { "mail", "delivered" }
        };

        _notice = new Notice
        {
            Id = 1,
            Title = "test title 1",
            Description = "test description",
            City = "test city",
            Payments = "cast,swish",
            DeliveryMethods = "mail,delivered",
            CreatedAt = new DateTime()
        };
    }

    [Fact]
    public void GetAllDTO_should_return_all_notices()
    {
        // Act
        var noticeResponses = _service.GetAllDTO();

        // Assert 
        noticeResponses.Count().Should().Be(2);
    }

    [Fact]
    public void GetDTOById_should_return_the_notice_matching_id()
    {
        // Act

        var noticeResponse = _service.GetDTOById(1);

        // Assert 
        noticeResponse?.Title.Should().Be("test title 1");
        noticeResponse?.Id.Should().Be(1);
    }

    [Fact]
    public void PostDTO_should_add_notice_in_db()
    {
        // Act
        var postResponse = _service.PostDTO(_request);
        var noticeResponse = _service.GetDTOById(postResponse.Id);

        // Assert
        noticeResponse?.Title.Should().Be(_request.Title);
    }
}