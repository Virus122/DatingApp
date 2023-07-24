using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using API.Middleware;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;


namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _context;
        private readonly ITokenService _tokenService;

        public AccountController(DataContext context, ITokenService tokenService)
        {
            this._context = context;
            this._tokenService = tokenService;
        }

        [HttpPost("register")] // POST: api/account/register
        public async Task<ActionResult<UserDto>> Register(RegisterDto registerDto)
        {

            if (await this.UserExists(registerDto.username)) return BadRequest("Username is taken");
            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                userName = registerDto.username.ToLower(),
                passwordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.password)),
                passwordSalt = hmac.Key
            };

            this._context.Users.Add(user);
            await this._context.SaveChangesAsync();

            return new UserDto
            {
                username = user.userName,
                token = this._tokenService.CreateToken(user)
            };
        }

        [HttpPost("login")]
        public async Task<ActionResult<UserDto>> Login(LoginDto loginDto)
        {
            var user = await this._context.Users.SingleOrDefaultAsync(user 
            => user.userName == loginDto.username);

            if (user == null) return Unauthorized("Invalid Username");

            using var hmac = new HMACSHA512(user.passwordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.passwordHash[i]) return Unauthorized("Invalid Password");
            }

            return new UserDto
            {
                username = user.userName,
                token = this._tokenService.CreateToken(user)
            };
        }

        private async Task<bool> UserExists(string username)
        {
            return await this._context.Users.AnyAsync(user => user.userName == username.ToLower());
        }
    }
}