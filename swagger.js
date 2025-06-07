const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Event Management Api",
    description: "Event Management Api",
  },
  host: "three41-cse-team6-project.onrender.com",
  schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
