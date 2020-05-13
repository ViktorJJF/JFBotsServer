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

//CRUD test
router.get("/test1", (req, res) => {
  res.json({
    ok: true,
    msg: "test 1 completado",
    payload: [{
      id: 1,
      name: "brus 1"
    }, {
      id: 2,
      name: "brus 2"
    }]
  });
});
const axios = require("axios");
router.get("/test2", (req, res2) => {
  console.log("EMPEZANDO A REINICIAR APP");
  axios({
      url: "https://api.heroku.com/apps/chatbrus/dynos",
      method: 'delete',
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/vnd.heroku+json; version=3",
        "Authorization": "Bearer ea2e5c5f-861b-46fc-ab95-65183c6b2c08"
      }
    })
    .then(res => {
      res2.json({
        ok: true,
        msg: "Reiniciado correctamente"
      })

    }).catch(err => {
      console.log("algo salio mal...", err);
      res2.json({
        ok: false,
        msg: "algo salio mal gaaa"
      });
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