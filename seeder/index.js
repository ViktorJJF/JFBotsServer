const testFolder = "./seeder/";
const fs = require("fs");

var seeder = require("mongoose-seed");
const config = require("../config");

// Connect to MongoDB via Mongoose
seeder.connect(config.DBSTRING, function () {
  let data = [];
  let models = [];
  let modelsPath = [];
  //load dynamic seeder path
  fs.readdirSync(testFolder).forEach((file) => {
    if (file === "index.js") return;
    models.push(file.replace("Seeder.js", ""));
    modelsPath.push("models/" + file.replace("Seeder", ""));
    // Data array containing seed data - documents organized by Model
    data.push(require("./" + file));
  });
  //   console.log("los models: ", models);
  //   console.log("los paths: ", modelsPath);
  //   console.log("la data ", data);
  // Load Mongoose models
  seeder.loadModels(modelsPath);

  // Clear specified collections
  seeder.clearModels(models, function () {
    // Callback to populate DB once collections have been cleared
    seeder.populateModels(data, function () {
      seeder.disconnect();
      console.log("SEED COMPLETADO CON EXITO");
    });
  });
});
