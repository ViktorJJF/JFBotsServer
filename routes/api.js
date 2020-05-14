const express = require("express");
const router = express.Router();

//Controllers
const dishesTypesController = require("../controllers/dishesTypesController");
const dishesController = require("../controllers/dishesController");
const usersController = require("../controllers/usersController");
const ordersController = require("../controllers/ordersController");
const orderDetailsController = require("../controllers/orderDetailsController");
const chatbotsController = require("../controllers/chatbotsController");

//sessions
router.get("/session", (req, res) => {
  console.log("sesion: ", req.cookies);
  console.log("sesion usuario: ", req.user);
  console.log("sesion: ", req.isAuthenticated());
  if (req.isAuthenticated()) {
    return res.json({
      isAuthenticated: true,
      activeSession: req.user,
    });
  }
  return res.json({
    isAuthenticated: false,
  });
});
router.get("/session/list", (req, res) => {
  console.log("sesiones activas: ", req.sessionStore);
  return res.json({
    sesions: req.session,
  });
});

//CRUD chatbots
router.get("/chatbots", chatbotsController.list);
router.post("/chatbots", chatbotsController.create);
router.put("/chatbots/:id", chatbotsController.update);
router.delete("/chatbots/:id", chatbotsController.deletes);

//CRUD orders
router.get("/orders", ordersController.list);
router.post("/orders", ordersController.create);
router.put("/orders/:id", ordersController.update);
router.delete("/orders/:id", ordersController.deletes);

//CRUD order DETAILS
router.get("/order-details", orderDetailsController.list);
router.post("/order-details", orderDetailsController.create);
router.put("/order-details/:id", orderDetailsController.update);
router.delete("/order-details/:id", orderDetailsController.deletes);

//CRUD users
router.get("/users", usersController.list);
router.post("/users", usersController.create);
router.put("/users/:id", usersController.update);
router.delete("/users/:id", usersController.deletes);

//CRUD dishes
router.get("/dishes", dishesController.list);
router.post("/dishes", dishesController.create);
router.put("/dishes/:id", dishesController.update);
router.delete("/dishes/:id", dishesController.deletes);

//CRUD dishes types
router.get("/dishes-types", dishesTypesController.list);
router.post("/dishes-types", dishesTypesController.create);
router.put("/dishes-types/:id", dishesTypesController.update);
router.delete("/dishes-types/:id", dishesTypesController.deletes);

module.exports = router;
