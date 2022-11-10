using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.EntityFrameworkCore;

namespace Users.Data.Models;

public partial class User
{
    [Key]
    public long Id { get; set; }

    [StringLength(64)]
    public string Nome { get; set; } = null!;

    [StringLength(128)]
    public string Sobrenome { get; set; } = null!;

    [StringLength(128)]
    public string Email { get; set; } = null!;

    [Column(TypeName = "datetime")]
    public DateTime? DataNascimento { get; set; }

    public int? Escolaridade { get; set; }
}
