using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWork.Models
{
    public class TourDetail
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public List<string> Route { get; set; }
        public string Description { get; set; }
        public List<PhotoCard> PhotoAlbum { get; set; }
    }
}