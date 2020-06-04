
// Original controller for products

const products = [];

const getAddProduct = (req, res, next) => {
  res.render("add-product", {
    products: products,
    pageTitle: "Product Form",
    path: "/admin/add-product",
    activeAddProduct: true,
    formsCSS: true,
    productCSS: true,
  });
};

const postAddProduct = (req, res, next) => {
  products.push({ title: req.body.title });
  res.redirect("/");
};

const getProducts = (req, res, next) => {
  res.render("shop", {
    products: products,
    pageTitle: "Shop",
    path: "/",
    hasProducts: products.length > 0,
    activeShop: true,
    productCSS: true,
  });
};


const ProductController = () => {
  return {
    getAddProduct,
    postAddProduct,
    getProducts,
    products
  }
}

exports.ProductController = ProductController