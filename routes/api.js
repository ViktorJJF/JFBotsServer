const express = require("express");
const router = express.Router();

//Controllers
const dishesTypesController = require("../controllers/dishesTypesController");
const dishesController = require("../controllers/dishesController");

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
