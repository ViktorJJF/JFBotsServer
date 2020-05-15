const DishType = require("../models/restobot_DishesTypes.js");
const list = (req, res) => {
  let query = {};
  if (req.query["is-menu"]) query.isMenu = Boolean(req.query["is-menu"]);
  DishType.find(query).exec((err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        err,
      });
    }
    res.json({
      ok: true,
      payload,
    });
  });
};
const create = (req, res) => {
  let body = req.body;
  let dish = new DishType({
    name: body.name,
  });

  dish.save((err, payload) => {
    if (err) {
      if (err.name === "MongoError" && err.code === 11000) {
        return res.status(400).json({
          ok: false,
          message: "El nombre ya estaba registrado",
          err,
        });
      }
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Marca de producto creado con éxito",
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  DishType.findByIdAndUpdate(
    id,
    body,
    {
      new: true,
    },
    (err, payload) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.status(400).json({
            ok: false,
            message: "El nombre ya estaba registrado",
            err,
          });
        }
        return res.status(400).json({
          ok: false,
          message: "Algo salió mal",
          err,
        });
      }
      res.json({
        ok: true,
        message: "Marca de producto actualizado con éxito",
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  DishType.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Marca de producto eliminado con éxito",
      payload,
    });
  });
};

module.exports = {
  list,
  create,
  update,
  deletes,
};
