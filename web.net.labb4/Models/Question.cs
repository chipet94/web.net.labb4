using System.ComponentModel.DataAnnotations;
using web.net.labb4.Models.CustomValidation;

namespace web.net.labb4.Models
{
    public class Question
    {
        [Key]
        public virtual int Id { get; set; }

        [Required(ErrorMessage = "Question is required"), MaxLength(50, ErrorMessage = "Max 50 characters."), MinLength(5, ErrorMessage = "Too short.")]
        public string QuestionString { get; set; }

        [Required(ErrorMessage = "Answer is required")]
        public string Answer { get; set; }

        [StringArrayValidator(ErrorMessage = "Choices is required", IndexEmptyMessage = "Choice cannot be empty.")]
        public virtual string[] Choices { get; set; }
    }
}