const Chatbot = require("../models/Chatbots.js");
const list = (req, res) => {
  Chatbot.find().exec((err, payload) => {
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
  let chatbot = new Chatbot(body);
  chatbot.save((err, payload) => {
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
      message: "Chatbot creado con éxito",
      payload,
    });
  });
};
const update = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Chatbot.findOneAndUpdate(
    { _id: id },
    body,
    {
      new: true,
      runValidators: true,
    },
    (err, payload) => {
      if (err) {
        if (err.name === "MongoError" && err.code === 11000) {
          return res.status(400).json({
            ok: false,
            message: "El chatbot ya estaba registrado",
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
        message: "Chatbot actualizado con éxito",
        payload,
      });
    }
  );
};
const deletes = (req, res) => {
  let id = req.params.id;
  let body = req.body;
  Chatbot.findByIdAndRemove(id, (err, payload) => {
    if (err) {
      return res.status(400).json({
        ok: false,
        message: "Algo salió mal",
        err,
      });
    }
    res.json({
      ok: true,
      message: "Chatbot eliminado con éxito",
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
