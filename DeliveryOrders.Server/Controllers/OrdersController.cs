using DeliveryOrders.Server.Models;
using DeliveryOrders.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryOrders.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private IOrderService _orderSerice;

        public OrdersController(IOrderService orderSerice)
        {
            _orderSerice = orderSerice;
        }

        // POST api/Orders/Create
        [HttpPost("Create")]
        public ActionResult<OrderModel> Create(OrderModel model)
        {
            return _orderSerice.Create(model);
        }

        // PATCH api/Orders/Update
        [HttpPatch("Update")]
        public ActionResult<OrderModel> Update(OrderModel model)
        {
            return _orderSerice.Update(model);
        }

        // GET api/Orders/Get/<id>
        [HttpGet("Get/{id}")]
        public ActionResult<OrderModel> Get(int id)
        {
            return _orderSerice.Get(id);
        }

        // GET api/GetAll
        [HttpGet("GetAll")]
        public ActionResult<List<OrderModel>> GetAll()
        {
            return _orderSerice.Get();
        }

        // DELETE api/Delete/<id>
        [HttpDelete("Delete/{id}")]
        public ActionResult Delete(int id)
        {
            return _orderSerice.Delete(id);
        }
    }
}