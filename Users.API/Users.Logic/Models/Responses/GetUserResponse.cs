using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Users.Logic.Models.Responses
{
    public class GetUserResponse
    {
        public UserDTO[] Users { get; set; } = new UserDTO[] { };
    }
}
