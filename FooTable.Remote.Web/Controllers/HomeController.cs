using FooTable.Remote.Web.Model;
using FooTable.Remote.Web.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace FooTable.Remote.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public JsonResult Consultar(object filtro, GridSettings gridSettings)
        {
            GridResult retorno = new PessoaService().Consultar(filtro, gridSettings);

            return Json(retorno, JsonRequestBehavior.AllowGet);
        }
    }
}