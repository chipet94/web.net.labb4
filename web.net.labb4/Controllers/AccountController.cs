using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using web.net.labb4.Models;
using web.net.labb4.Models.HTTP;

namespace web.net.labb4.Controllers
{
    //*
    // jwt guide: https://www.c-sharpcorner.com/article/jwt-json-web-token-authentication-in-asp-net-core/
    //*/

    [ApiController]
    [Route("api/[controller]")]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    public class AccountController : Controller
    {
        private readonly UserManager<User> _userManager;
        private readonly SignInManager<User> _signInManager;
        private readonly IConfiguration _configuration;

        public AccountController(UserManager<User> userManager, SignInManager<User> signInManager, IConfiguration configuration)
        {
            _userManager = userManager;
            _signInManager = signInManager;
            _configuration = configuration;
        }

        [HttpPost]
        [AllowAnonymous]
        [Route("login")]
        public async Task<IActionResult> Login([FromBody] UserRequest request)
        {
            Console.WriteLine(request);
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            var result = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if (!result.Succeeded) return Unauthorized("Invalid username or password...");
            var user = await _userManager.FindByNameAsync(request.Email);
            var response = new
            {
                user.Id,
                Username = user.UserName,
                Token = await GenerateJSONWebToken(user.UserName),
                isAdmin = user.IsAdmin
            };
            return Ok(response);
        }

        [HttpPost]
        [Route("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromBody] UserRequest request)
        {
            if (!ModelState.IsValid) return new BadRequestObjectResult(ModelState);

            if (await UserExists(request.Email))
            {
                return new ConflictObjectResult(new { Email = new[] { "Email already exists." } });
            }

            var user = new User { UserName = request.Email, IsAdmin = request.Checked };
            user.PasswordHash = _userManager.PasswordHasher.HashPassword(user, request.Password);

            var result = await _userManager.CreateAsync(user);

            if (!result.Succeeded) return new BadRequestObjectResult(ModelState);
            if (user.IsAdmin)
            {
                await _userManager.AddToRoleAsync(user, "Admin");
            }
            var loginResult = await _signInManager.PasswordSignInAsync(request.Email, request.Password, false, false);
            if (!loginResult.Succeeded)
                return Ok(new Response.Error("Login", new[] { "User Created but unable to login..." }));
            user = await _userManager.FindByNameAsync(request.Email); // confirm its correct instance
            var resp = new
            {
                user.Id,
                Username = user.UserName,
                Token = await GenerateJSONWebToken(user.UserName),
                isAdmin = user.IsAdmin
            };
            return Ok(resp);
        }

        [HttpPost]
        [Route("logout")]
        public async Task<IActionResult> Logout()
        {
            await _signInManager.SignOutAsync();
            var resp = new { Id = 0, Username = "", Token = "", IsAdmin = false };
            return Ok(resp);
        }

        [HttpGet]
        [Authorize]
        [Route("loggedin")]
        public ActionResult IsLoggedIn()
        {
            var loggedIn = User.FindFirst(ClaimTypes.NameIdentifier).Value;
            Console.WriteLine("ident:" + loggedIn);
            if (loggedIn != null)
                return Ok();

            return NotFound();
        }

        private async Task<string> GenerateJSONWebToken(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            var userRoles = await _userManager.GetRolesAsync(user);
            var securityKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            var credentials = new SigningCredentials(securityKey, SecurityAlgorithms.HmacSha256);
            var claims = new List<Claim>
            {
                new Claim(JwtRegisteredClaimNames.Sub, user.UserName),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString()),
                new Claim(ClaimTypes.NameIdentifier, user.Id)
            };
            claims.AddRange(userRoles.Select(m => new Claim(ClaimsIdentity.DefaultRoleClaimType, m)));
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Issuer"],
                claims,
                expires: DateTime.Now.AddMinutes(120),
                signingCredentials: credentials);

            return new JwtSecurityTokenHandler().WriteToken(token);
        }

        private async Task<bool> UserExists(string username)
        {
            var user = await _userManager.FindByNameAsync(username);
            return user != null;
        }
    }
}