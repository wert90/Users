using Microsoft.AspNetCore.Authorization;
using Microsoft.EntityFrameworkCore;
using Users.Data;
using Users.Logic.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables(prefix: "Users_API_");

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddCors();

builder.Services.AddDbContext<MyDBContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("MyDBConn"))
);

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(x => x
    .AllowAnyMethod()
    .AllowAnyHeader()
    .SetIsOriginAllowed(origin => true)
    .AllowCredentials());

app.MapControllers();

app.Run();
