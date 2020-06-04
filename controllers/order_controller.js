const OrderController = () => {
  return {
    createOrder: async (req, res, next) => {
      const cart = await req.user.getCart();
      const cartProducts = await cart.getProducts();
      const order = await req.user.createOrder();

      try {
        await order.addProducts(
          cartProducts.map((product) => {
            product.orderItem = { quantity: product.cartItem.quantity };

            return product;
          })
        );
        await cart.setProducts(null);
        res.redirect("/orders");
      } catch (error) {
        console.log(error);
      }
    },
    getOrder: async (req, res, next) => {
      const orders = await req.user.getOrders({include: ['products']});

      try {
        res.render("shop/orders", {
          pageTitle: "Orders",
          path: "/orders",
          orders: orders,
        });
      } catch (error) {
        console.log(error);
      }
    },
  };
};

exports.OrderController = OrderController;
