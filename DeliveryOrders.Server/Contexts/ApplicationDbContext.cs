using DeliveryOrders.Server.Models;
using Microsoft.EntityFrameworkCore;

namespace DeliveryOrders.Server.Contexts
{
    public class ApplicationDbContext : DbContext
    {
        public DbSet<OrderModel> Orders { get; set; }
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {
        }
    }
}