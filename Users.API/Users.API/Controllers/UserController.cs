using Microsoft.AspNetCore.Mvc;
using Users.Logic.Models.Requests;
using Users.Logic.Models.Responses;
using Users.Logic.Services;

namespace Users.API.Controllers
{
    [ApiController]
    [Route("api/user")]
    [Produces("application/json")]
    [Consumes("application/json")]
    public class UserController : Controller
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost]
        public async Task<ActionResult<AddUserResponse>> InsertUser([FromBody] AddUserRequest addUserRequest)
        {
            try
            {
                AddUserResponse addUserResponse = await _userService.AddUser(addUserRequest);
                return Ok(addUserResponse);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpGet]
        public async Task<ActionResult<GetUserResponse>> GetUser(long? id, string? name, string? surname)
        {
            try
            {
                GetUserResponse response = await _userService.GetUsers(id, name, surname);
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpPut]
        public async Task<ActionResult<UpdateUserResponse>> UpdateUser(UpdateUserRequest updateUserRequest)
        {
            try
            {
                UpdateUserResponse response = await _userService.UpdateUser(updateUserRequest);
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }

        [HttpDelete]
        public async Task<ActionResult<RemoveUserResponse>> RemoveUser(RemoveUserRequest removeUserRequest)
        {
            try
            {
                RemoveUserResponse response = await _userService.DeleteUser(removeUserRequest);
                return Ok(response);
            }
            catch (Exception)
            {
                throw;
            }
        }
    }
}
