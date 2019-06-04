using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWork.Models
{
    public class CatalogItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public string Header { get; set; }
        public string Description { get; set; }
        public List<string> Route { get; set; }
        public DateTime? PeriodStart { get; set; }
        public DateTime? PeriodEnd { get; set; }
        public decimal? MinPrice { get; set; }
        public PhotoCard PhotoCard { get; set; }
        public List<PhotoCard> PhotoAlbum { get; set; }
    }

    public class PhotoCard
    {
        public string Photo { get; set; }
        public string Thumbnail { get; set; }
    }

}