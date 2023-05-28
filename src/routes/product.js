const express = require("express");
const productSchema = require("../models/product");

const router = express.Router();

//create product
router.post("/product", (req, res) => {
  const product = productSchema(req.body);
  product
    .save()
    .then((data) => res.json({ code: res.statusCode, data: data }))
    .catch((err) => res.json({ message: err }));
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
    .catch((err) => res.json({ message: err }));
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
    .then((data) => res.json({ code: res.statusCode, data: data }))
    .catch((err) => res.json({ message: err }));
});

module.exports = router;
