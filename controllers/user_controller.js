const User = require("../models/user");

const UserController = () => {
  return {
    new: (req, res, next) => {
      res.render("shop/edit-users", {
        user: {},
        pageTitle: "User Form",
        path: "/users/new",
        editing: false,
      });
    },
    create: async (req, res, next) => {
      const name = req.body.name.trim();
      const email = req.body.email.trim();

      const user = new User(name, email);

      try {
        await user.save();
        res.redirect("/admin/products");
      } catch (error) {
        throw error;
      }
    },
    edit: async (req, res, next) => {
      const editMode = req.query.edit;
      const userId = req.params.userId;

      const user = await User.findById(userId);

      try {
        if (!editMode || !user) {
          return res.redirect("/");
        }

        res.render("shop/edit-users", {
          pageTitle: "Edit User",
          user: user,
          editing: editMode,
          path: "/users/edit",
        });
      } catch (error) {
        throw error;
      }
    },
    update: async (req, res, next) => {
      const updatedName = req.body.name.trim();
      const updatedEmail = req.body.email.trim();
      const userId = req.body.userId;
      console.log("user id from controller ====>>",userId)
      const user = new User(updatedName, updatedEmail, userId);

      try {
        await user.save();
        res.redirect("/admin/products");
      } catch (error) {
        throw error;
      }
    },
  };
};

exports.UserController = UserController;
