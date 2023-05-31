const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const productRoutes = require("./routes/product");
const Eureka = require('eureka-js-client').Eureka;

const app = express();
const port = process.env.PORT || 9000;

//middlewares
app.use(express.json());
app.use("/api", productRoutes);

app.get("/", (req, res) => {
  res.send("Welcome the server is running!");
});

// Configura la instancia del cliente Eureka
const client = new Eureka({
  instance: {
    app: 'PRODUCT_MICROSERVICE',
    hostName: 'localhost', // Cambia esto si tu microservicio está alojado en un servidor diferente
    ipAddr: '127.0.0.1', // Cambia esto si tu microservicio está alojado en una dirección IP diferente
    port: {
      '$': port,
      '@enabled': 'true',
    },
    vipAddress: 'PRODUCT_MICROSERVICE',
    dataCenterInfo: {
      '@class': 'com.netflix.appinfo.InstanceInfo$DefaultDataCenterInfo',
      name: 'MyOwn',
    },
  },
  eureka: {
    host: 'localhost',
    port: process.env.EUREKA_PORT,
    servicePath: '/eureka/apps/',
  },
});

// Inicia el cliente Eureka
client.start((error) => {
  if (error) {
    console.log('Error starting Eureka client:', error);
    return;
  }
  
  console.log('Eureka client started');
  
  app.listen(port, () => {
    console.log('Server listening on port', port);
  });
});


//mongo connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => console.log("Connected to Mongodb Atlas"))
  .catch((error) => console.error(error));