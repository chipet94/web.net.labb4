using Microsoft.AspNetCore.Identity;
using System;

namespace web.net.labb4.Models
{
    public class User : IdentityUser
    {
        public virtual int HighScore { get; set; } = 0;
        public virtual DateTime ScoreDate { get; set; }
        public virtual bool IsAdmin { get; set; }
    }
}