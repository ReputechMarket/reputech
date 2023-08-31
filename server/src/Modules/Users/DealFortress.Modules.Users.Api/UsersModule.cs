using System.Runtime.CompilerServices;
using DealFortress.Api.Modules.Users.Extensions;
using DealFortress.Modules.Users.Api.Controllers;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;

[assembly: InternalsVisibleTo("DealFortress.Bootstrapper")]

namespace DealFortress.Modules.Users.Api;

internal static class UsersModule
{

    public static void AddUsersModule(this IServiceCollection services, string connectionString)
    {
        services
            .AddCore(connectionString)
            .AddScoped<UsersController>()
            .AddScoped<ProductsController>()
            .AddControllers();

    }
}
