const express = require("express");
const productSchema = require("../models/product");
const { createProductInventory } = require("../services/inventory");

const router = express.Router();

router.post("/product", async (req, res) => {
  try {
    const product = productSchema(req.body);
    const { code } = product;
    const productFinded = await productSchema.findOne({ code });

    if (productFinded?.code) {
      throw new Error("El producto ya existe.");
    }
    await product.save();
    const url = "http://localhost:8084/api/inventory";
    const inventoryData = {
      codigo: product.code,
      nombre: product.name,
      entradas: product.entradas,
    };
    const respuesta = await createProductInventory(url, inventoryData);

    res.json({ code: res.statusCode, data: respuesta });
  } catch (error) {
    res.json({ message: error.message });
  }
});

router.get("/product/getAll", (req, res) => {
  productSchema
    .find()
    .then((data) => res.json({ code: res.statusCode, data: data }))
    .catch((err) => res.json({ message: err }));
});

router.get("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .findById(id)
    .then((data) => res.json({ code: res.statusCode, data: data }))
    .catch((err) => res.json({ message: err.message }));
});

router.put("/product", (req, res) => {
  const { code, name, price } = req.body;
  productSchema
    .updateOne({ code: code }, { $set: { name, price } })
    .then((data) =>
      res.json({
        code: res.statusCode,
        data:
          data.matchedCount == 1
            ? { code, name, price }
            : "Problemas al actualizar el registro",
      })
    )
    .catch((err) => res.json({ message: err }));
});

router.delete("/product/:id", (req, res) => {
  const { id } = req.params;
  productSchema
    .deleteOne({ _id: id })
    .then((data) => {
      res.json({
        code: res.statusCode,
        message: (data.deletedCount = 1
          ? "Producto borrado exisitosamente"
          : "No encontró el producto"),
      });
    })
    .catch((err) => res.json({ message: err.message }));
});

router.delete("/product/", (req, res) => {
  productSchema
    .deleteMany()
    .then((data) => res.json({ code: res.statusCode, data: data }))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
