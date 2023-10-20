using DealFortress.Modules.Users.Core.Domain.Entities;
using DealFortress.Modules.Users.Core.Domain.Repositories;
using DealFortress.Shared.Abstractions.Repositories;
using System.Runtime.CompilerServices;

[assembly: InternalsVisibleTo("DealFortress.Modules.Users.Tests.Integration")]

namespace DealFortress.Modules.Users.Core.DAL.Repositories;

internal class UsersRepository : Repository<User>, IUsersRepository
{
    public UsersRepository(UsersContext context) : base(context)
    {}

    public UsersContext? UsersContext
    {
        get { return Context as UsersContext; }
    }
}