using System;
using System.ComponentModel.DataAnnotations;
namespace photoGallery.newPhoto
{
    public class Photo
    {
        public int ID { get; set; }
        public string category{ get; set; }

        [DataType(DataType.Date)]
        public DateTime captureDate { get; set; }
        public string size { get; set; }
        public decimal Resolution{ get; set; }
    }
}
