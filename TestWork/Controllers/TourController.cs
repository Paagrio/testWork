using Newtonsoft.Json;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Results;
using TestWork.Models;

namespace TestWork.Controllers
{
    //cors  для получения доступа с клиента(один домен, но разные порты(IIS, Node.js))
    [EnableCors("*", "*", "*")]
    public class TourController : ApiController
    {
        public List<CatalogItem> data;
        public JsonSerializerSettings camelCaseFormatter;

        public TourController()
        {
            //приведение имен объектов к верблюжей нотации
            camelCaseFormatter = new JsonSerializerSettings
            {
                ContractResolver = new CamelCasePropertyNamesContractResolver()
            };
            var path= HttpContext.Current.Server.MapPath("~/demo_offers.json");
            string json = File.ReadAllText(path);
            data = JsonConvert.DeserializeObject<List<CatalogItem>>(json);
        }

        //метод для получения информации по турам(постранично)
        [HttpGet]
        [Route("cat/{page}")]
        public JsonResult<List<CatalogListItem>> GetToursByPage(int page)
        {
            var result = data
                .Skip(6 * page)
                .Take(6)
                .Select(x=>new CatalogListItem
            {
                Id=x.Id,
                Title=x.Title,
                MinPrice=x.MinPrice,
                PeriodEnd=x.PeriodEnd,
                PeriodStart=x.PeriodStart,
                Header=x.Header,
                Photo=x.PhotoCard==null?x.PhotoAlbum[0].Thumbnail:x.PhotoCard.Thumbnail
            }).ToList();
            return Json(result, camelCaseFormatter);
        }
        //метод для получения детальной информации по турам
        [HttpGet]
        [Route("tour/{id}")]
        public JsonResult<TourDetail> GetTourById(int id)
        {
            var result = data
                .Where(x => x.Id == id)
                .Select(x => new TourDetail
                {
                    Id=x.Id,
                    Title = x.Title,
                    Description = x.Description,
                    Route = x.Route,
                    PhotoAlbum = x.PhotoAlbum
                }).FirstOrDefault();
            return Json(result, camelCaseFormatter);
        }
    }
}