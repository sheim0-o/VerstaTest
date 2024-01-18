using DeliveryOrders.Server.Models;
using Microsoft.AspNetCore.Mvc;
using MySqlX.XDevAPI.Common;
using System.Collections.Generic;

namespace DeliveryOrders.Server.Services.Interfaces
{
    public interface IOrderService
    {
        ActionResult<OrderModel> Create(OrderModel model);
        ActionResult<OrderModel> Update(OrderModel model);
        ActionResult<List<OrderModel>> Get();
        ActionResult<OrderModel> Get(int id);
        ActionResult Delete(int id);
    }
}