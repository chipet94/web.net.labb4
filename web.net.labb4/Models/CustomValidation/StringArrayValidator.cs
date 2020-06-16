using System.ComponentModel.DataAnnotations;
using System.Linq;

namespace web.net.labb4.Models.CustomValidation
{
    public class StringArrayValidator : ValidationAttribute
    {
        public string IndexEmptyMessage { get; set; }
        public string CorrectAnswer { get; set; }

        protected override ValidationResult IsValid(object value, ValidationContext validationContext)
        {
            var values = (string[])value;
            if (values != null && values.Length > 0)
            {
                if (values.Any(item => item == string.Empty))
                {
                    return new ValidationResult(this.IndexEmptyMessage);
                }
                return values.Any(item => item == string.Empty || item == CorrectAnswer) ?
                    new ValidationResult(this.IndexEmptyMessage, values.Where(item => item == string.Empty)) :
                    ValidationResult.Success;
            }
            return new ValidationResult(this.ErrorMessage);
        }
    }
}