using System.ComponentModel.DataAnnotations;

namespace web.net.labb4.Models.HTTP
{
    public class UserRequest
    {
        [EmailAddress]
        [Required(ErrorMessage = "Email Req")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password Req")]
        public string Password { get; set; }

        public bool Checked { get; set; }
    }
}