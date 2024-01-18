using DeliveryOrders.Server.Contexts;
using DeliveryOrders.Server.Models;
using DeliveryOrders.Server.Services.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace DeliveryOrders.Server.Services
{
    public class OrderService : IOrderService
    {
        private ApplicationDbContext _context;

        public OrderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public ActionResult<OrderModel> Create(OrderModel model)
        {
            try
            {
                var newOrder = new OrderModel
                {
                    SenderCity = model.SenderCity,
                    SenderAddress = model.SenderAddress,
                    RecipientCity = model.RecipientCity,
                    RecipientAddress = model.RecipientAddress,
                    CargoWeight = model.CargoWeight,
                    PickupDate = model.PickupDate
                };

                _context.Orders.Add(newOrder);
                _context.SaveChanges();

                return new ActionResult<OrderModel>(newOrder);
            }
            catch (Exception ex)
            {
                return new ActionResult<OrderModel>(new BadRequestObjectResult($"Error creating order: {ex.Message}"));
            }
        }

        public ActionResult<OrderModel> Update(OrderModel model)
        {
            try
            {
                var modelToUpdate = _context.Orders.FirstOrDefault(x => x.Id == model.Id);

                if (modelToUpdate == null)
                {
                    return new ActionResult<OrderModel>(new NotFoundObjectResult($"Order with ID {model.Id} not found."));
                }

                modelToUpdate.SenderCity = model.SenderCity;
                modelToUpdate.SenderAddress = model.SenderAddress;
                modelToUpdate.RecipientCity = model.RecipientCity;
                modelToUpdate.RecipientAddress = model.RecipientAddress;
                modelToUpdate.CargoWeight = model.CargoWeight;
                modelToUpdate.PickupDate = model.PickupDate;

                _context.SaveChanges();

                return new ActionResult<OrderModel>(modelToUpdate);
            }
            catch (Exception ex)
            {
                return new ActionResult<OrderModel>(new BadRequestObjectResult($"Error updating order: {ex.Message}"));
            }
        }

        public ActionResult<List<OrderModel>> Get()
        {
            try
            {
                var orders = _context.Orders.ToList();
                return new ActionResult<List<OrderModel>>(orders);
            }
            catch (Exception ex)
            {
                return new ActionResult<List<OrderModel>>(new BadRequestObjectResult($"Error getting orders: {ex.Message}"));
            }
        }

        public ActionResult<OrderModel> Get(int id)
        {
            try
            {
                var model = _context.Orders.FirstOrDefault(x => x.Id == id);

                if (model == null)
                {
                    return new ActionResult<OrderModel>(new NotFoundObjectResult($"Order with ID {id} not found."));
                }

                return new ActionResult<OrderModel>(model);
            }
            catch (Exception ex)
            {
                return new ActionResult<OrderModel>(new BadRequestObjectResult($"Error getting order: {ex.Message}"));
            }
        }

        public ActionResult Delete(int id)
        {
            try
            {
                var modelToDelete = _context.Orders.FirstOrDefault(x => x.Id == id);

                if (modelToDelete == null)
                {
                    return new NotFoundObjectResult($"Order with ID {id} not found.");
                }

                _context.Orders.Remove(modelToDelete);
                _context.SaveChanges();

                return new OkResult();
            }
            catch (Exception ex)
            {
                return new BadRequestObjectResult($"Error deleting order: {ex.Message}");
            }
        }
    }
}