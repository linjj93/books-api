const Sequelize = require("sequelize");
const path = require("path");

let sequelize;
const currentEnv = process.env.NODE_ENV || "development";

if (currentEnv === "production") {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: "postgres"
  });
} else {
  sequelize = new Sequelize("books-api", "postgres", "jinjia423!", {
    dialect: "postgres"
  });
}

const models = {
  Book: sequelize.import("./book"),
  Author: sequelize.import("./author")
};

//["Book", "Author"]
// Author.associate(models)
// Book.associate(models)
// call association method in each model
Object.keys(models).forEach(key => {
  if ("associate" in models[key]) {
    models[key].associate(models);
  }
});

module.exports = { sequelize, ...models };
