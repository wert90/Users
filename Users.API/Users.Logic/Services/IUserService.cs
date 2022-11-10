using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Users.Logic.Models.Requests;
using Users.Logic.Models.Responses;

namespace Users.Logic.Services
{
    public interface IUserService
    {
        Task<AddUserResponse> AddUser(AddUserRequest addUSerRequest);
        Task<GetUserResponse> GetUsers(long? id, string? name, string? surname);
        Task<UpdateUserResponse> UpdateUser(UpdateUserRequest updateUserRequest);
        Task<RemoveUserResponse> DeleteUser(RemoveUserRequest removeUserRequest);
    }
}
