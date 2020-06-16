using Newtonsoft.Json;
using System.Collections.Generic;

namespace web.net.labb4.Models.HTTP
{
    public class Response
    {
        public class Error : Response
        {
            public Dictionary<string, string[]> Errors { get; set; }

            public Error(object subject, string[] values)
            {
                Errors = new Dictionary<string, string[]>
                {
                    {nameof(subject), values}
                };
            }

            public Error(string subject, string[] values)
            {
                Errors = new Dictionary<string, string[]>
                {
                    {nameof(subject), values}
                };
            }
        }

        public class Login
        {
            public string Username { get; set; }
            public string Token { get; set; }
        }

        public string ToJson()
        {
            return JsonConvert.SerializeObject(this);
        }
    }
}