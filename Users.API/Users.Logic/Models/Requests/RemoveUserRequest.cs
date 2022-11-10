using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Users.Logic.Models.Requests
{
    public class RemoveUserRequest
    {
        public UserDTO? User { get; set; }
    }
}
