using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Users.Logic.Models
{
    public class UserDTO
    {
        public long Id { get; set; }
        public string Nome { get; set; } = null!;
        public string Sobrenome { get; set; } = null!;
        public string Email { get; set; } = null!;
        public DateTime? DataNascimento { get; set; }
        public int? Escolaridade { get; set; }
    }
}
