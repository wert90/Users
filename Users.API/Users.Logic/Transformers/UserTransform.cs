using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Users.Data.Models;
using Users.Logic.Models;

namespace Users.Logic.Transformers
{
    public static class UserTransform
    {
        public static User? CreateObject(UserDTO? instance)
        {
            if (instance == null)
                return null;

            User user = new User();
            user.Sobrenome = instance.Sobrenome;
            user.Nome = instance.Nome;
            user.Escolaridade = instance.Escolaridade;
            user.DataNascimento = instance.DataNascimento;
            user.Email = instance.Email;
            user.Id = instance.Id;

            return user;
        }

        public static UserDTO? CreateObject(User? instance)
        {
            if (instance == null)
                return null;

            UserDTO user = new UserDTO();
            user.Sobrenome = instance.Sobrenome;
            user.Nome = instance.Nome;
            user.Escolaridade = instance.Escolaridade;
            user.DataNascimento = instance.DataNascimento;
            user.Email = instance.Email;
            user.Id = instance.Id;

            return user;
        }

        public static void UpdateObject(ref User? user, UserDTO instance)
        {
            if (instance == null)
                return;

            if (user == null)
                user = new User();

            if (!string.IsNullOrEmpty(instance.Sobrenome))
                user.Sobrenome = instance.Sobrenome;

            if (!string.IsNullOrEmpty(instance.Nome))
                user.Nome = instance.Nome;

            if (instance.Escolaridade.HasValue)
                user.Escolaridade = instance.Escolaridade;

            if (instance.DataNascimento.HasValue)
                user.DataNascimento = instance.DataNascimento;

            if (!string.IsNullOrEmpty(instance.Email))
                user.Email = instance.Email;
        }
    }
}
