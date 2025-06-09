const swaggerAutogen = require("swagger-autogen")();

const doc = {
  info: {
    title: "Event Management Api",
    description: "Event Management Api",
  },
  // COMMENT OUT LOCAL HOST TO PUBLISH ON RENDER.COM
  //host: "three41-cse-team6-project.onrender.com",
  host: "localhost:3000",
  schemes: ["http"],
  // COMMENT OUT HTTP TO PUBLISH ON RENDER.COM
  //schemes: ["https"],
};

const outputFile = "./swagger.json";
const endpointsFiles = ["./routes/index.js"];

swaggerAutogen(outputFile, endpointsFiles, doc);
