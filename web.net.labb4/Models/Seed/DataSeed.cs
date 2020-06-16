using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace web.net.labb4.Models
{
    public static class DataSeeder
    {
        public static void Seed(ModelBuilder _builder)
        {
            _builder.Entity<Question>().HasData(
                new Question() { Id = 1,
                    QuestionString = "Is This a Question?", 
                    Answer = "Yes", 
                    Choices = new[] {"No", "Yes", "Maybe", "Don't know"}},
                new Question() {  Id = 2,              
                    QuestionString = "Don't press 'Yes'", 
                    Answer = "why?", 
                    Choices = new[] {"No", "why?", "Yes"}},
                new Question(){  Id = 3,              
                    QuestionString = "...1 ...2 ...3 ...?", 
                    Answer = "4", 
                    Choices = new[] {"420 ...dude", "42", "4"}},
                new Question(){ Id = 4,           
                    QuestionString = "Is react a terrible framework with ugly syntax?", 
                    Answer = "no, you just don't get it.", 
                    Choices = new[] {"no, you just don't get it.", "<VERY SO/>", "Yes", "Hey! i like it."}} );

        }
    }
}