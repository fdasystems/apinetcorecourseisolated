using ApiCourseIsolated.Data;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Identity;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.EntityFrameworkCore;
using ApiCourseIsolated.Entities;
using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using ApiCourseIsolated.Services.Contracts;
using ApiCourseIsolated.Services;
using System;

namespace ApiCourseIsolated
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {


            //DB data connect
            services.AddDbContext<ApplicationDbContext>(options =>
                                                        options
                                                        .UseMySql
                                                            (Configuration
                                                                .GetConnectionString("DefaultConnection")
                                                            )
                                                       );


            //IDENTITY SERVICES with custom user 
            services.AddIdentity<CustomUser, IdentityRole>(options =>
            {
                options.SignIn.RequireConfirmedAccount = false;
                options.User.RequireUniqueEmail = true;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();


            //AUTHENTICATION
            string valueKey = Configuration["secret_key_jwt_config"];
            var key = Encoding.ASCII.GetBytes(valueKey);
            services.AddAuthentication(au =>
                                        {
                                            au.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                                            au.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                                        }
                                      )
                    .AddJwtBearer(jwt =>
                                    {
                                        jwt.RequireHttpsMetadata = false;
                                        jwt.SaveToken = true;
                                        jwt.TokenValidationParameters =
                                            new TokenValidationParameters
                                            {
                                                ValidateIssuerSigningKey = true,
                                                IssuerSigningKey = new SymmetricSecurityKey(key),
                                                ValidateIssuer = false,
                                                ValidateAudience = false,
                                                ClockSkew=TimeSpan.Zero
                                            };
                                    }
                                );

            //Default
            //services.AddControllers();
            //Special Configs
            services.AddControllers().AddNewtonsoftJson(options =>
                             options.SerializerSettings.ReferenceLoopHandling = Newtonsoft.Json.ReferenceLoopHandling.Ignore
                                                        );


            //Dependency Inyections
            services.AddScoped<IAuthenticateService, AuthenticateService>();

            //Swagger
            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1",
                        new Microsoft.OpenApi.Models.OpenApiInfo { Title = "API", Version = "v1" });

            });

            //Add Cors default (then replace)
            //services.AddCors();
            services.AddCors(o => o.AddPolicy("MyPolicy", builder =>
            {
                builder  .AllowAnyOrigin()
                  //     .WithOrigins("http://localhost:3000",
                  //                  "https://localhost:3000")
                       .AllowAnyMethod()
                       .AllowAnyHeader();
            }));


        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }

            app.UseHttpsRedirection();

            app.UseRouting();
            app.UseCors("MyPolicy");
            app.UseAuthentication();
            app.UseAuthorization();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllers();
            });

            app.UseSwagger();

            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "My API V1");
            });
        }
    }
}
