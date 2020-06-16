using System.ComponentModel.DataAnnotations;

namespace web.net.labb4.Models.HTTP
{
    public class RegisterRequest
    {
        [Required(ErrorMessage = "Firstname Req.")]
        public string Firstname { get; set; }

        [Required(ErrorMessage = "Lastname Req")]
        public string Lastname { get; set; }

        [EmailAddress]
        [Required(ErrorMessage = "Email Req")]
        public string Email { get; set; }

        [Required(ErrorMessage = "Password Req")]
        public string Password { get; set; }

        public bool IsAdmin { get; set; }
    }
}