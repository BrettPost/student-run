using Microsoft.EntityFrameworkCore;
using StudentRun.Server.Data;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// DB Context setup
builder.Services.AddDbContext<StudentRunContext>(opt =>
    opt.UseNpgsql(
        builder.Configuration.GetConnectionString("StudentRunContext"),
        o => o
            .SetPostgresVersion(13, 0)));
// Use if datetime gets complex .UseNodaTime()));
//.MapEnum<Mood>("mood")));


var app = builder.Build();

app.UseDefaultFiles();
app.MapStaticAssets();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.MapFallbackToFile("/index.html");

app.Run();
