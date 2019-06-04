using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace TestWork.Models
{
    public class CatalogListItem
    {
        public int Id { get; set; }
        public string Title { get; set; }
        public DateTime? PeriodStart { get; set; }
        public DateTime? PeriodEnd { get; set; }
        public decimal? MinPrice { get; set; }
        public string Photo { get; set; }
        public string Header { get; set; }
    }
}