using Azure;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Users.Data;
using Users.Data.Models;
using Users.Logic.Models.Requests;
using Users.Logic.Models.Responses;

namespace Users.Logic.Services
{
    public class UserService : IUserService
    {
        private readonly MyDBContext _dbContext;

        public UserService(MyDBContext dbContext)
        {
            _dbContext = dbContext;
        }

        public async Task<AddUserResponse> AddUser(AddUserRequest addUserRequest)
        {
            try
            {
                User? user = Transformers.UserTransform.CreateObject(addUserRequest.User);

                if (user != null)
                {
                    await _dbContext.Users.AddAsync(user);
                    await _dbContext.SaveChangesAsync();
                }

                return new AddUserResponse()
                {
                    User = Transformers.UserTransform.CreateObject(user)
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<GetUserResponse> GetUsers(long? id, string? name, string? surname)
        {
            try
            {
                IQueryable<User> userQueryable = from user in _dbContext.Users select user;

                if (id.HasValue && id.Value > 0)
                    userQueryable = userQueryable.Where(u => u.Id == id);

                if (!string.IsNullOrEmpty(name))
                    userQueryable = userQueryable.Where(u => u.Nome.Contains(name));

                if (!string.IsNullOrEmpty(surname))
                    userQueryable = userQueryable.Where(u => u.Sobrenome.Contains(surname));

                User[] users = await userQueryable.ToArrayAsync();

                return new GetUserResponse()
                {
                    Users = users.Select(u => Transformers.UserTransform.CreateObject(u)!).ToArray()
            };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<UpdateUserResponse> UpdateUser(UpdateUserRequest updateUserRequest)
        {
            try
            {
                if (updateUserRequest.User == null)
                    throw new Exception("Invalid user");

                User? user = await _dbContext.Users.Where(u => u.Id == updateUserRequest.User.Id).FirstOrDefaultAsync();

                if (user == null)
                    throw new Exception("User not found");

                Transformers.UserTransform.UpdateObject(ref user, updateUserRequest.User);

                if (user != null && _dbContext.ChangeTracker.HasChanges())
                    _dbContext.SaveChanges();

                return new UpdateUserResponse()
                {
                    User = Transformers.UserTransform.CreateObject(user)
                };
            }
            catch (Exception)
            {
                throw;
            }
        }

        public async Task<RemoveUserResponse> DeleteUser(RemoveUserRequest removeUserRequest)
        {
            try
            {
                if (removeUserRequest.User == null)
                    throw new Exception("Invalid user");

                User? user = await _dbContext.Users.Where(u => u.Id == removeUserRequest.User.Id).FirstOrDefaultAsync();

                if (user == null)
                    throw new Exception("User not found");

                _dbContext.Users.Remove(user);
                _dbContext.SaveChanges();

                return new RemoveUserResponse()
                {
                    User = Transformers.UserTransform.CreateObject(user)
                };
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
