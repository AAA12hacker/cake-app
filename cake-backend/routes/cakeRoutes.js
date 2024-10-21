const express = require("express");
const { protect } = require("../middleware/authMiddleware");
const Cake = require("../models/Cake");
const asyncHandler = require("../utils/asyncHandler");

const router = express.Router();

router.get(
  "/",
  asyncHandler(async (req, res) => {
    const cakes = await Cake.find({});
    res.json(cakes);
  })
);

router.get(
  "/:id",
  asyncHandler(async (req, res) => {
    const cake = await Cake.findById(req.params.id);
    if (cake) {
      res.json(cake);
    } else {
      res.status(404);
      throw new Error("Cake not found");
    }
  })
);

router.post(
  "/",
  protect,
  asyncHandler(async (req, res) => {
    const { name, comment, imageUrl, yumFactor } = req.body;

    const cakeExists = await Cake.findOne({ name });
    if (cakeExists) {
      res.status(400);
      throw new Error("Cake with this name already exists");
    }

    const cake = new Cake({
      name,
      comment,
      imageUrl,
      yumFactor,
    });

    const createdCake = await cake.save();
    res.status(201).json(createdCake);
  })
);

router.put(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const { name, comment, imageUrl, yumFactor } = req.body;

    const cake = await Cake.findById(req.params.id);

    if (!cake) {
      res.status(404);
      throw new Error("Cake not found");
    }

    if (name) {
      const cakeExists = await Cake.findOne({ name, _id: { $ne: cake._id } });
      if (cakeExists) {
        res.status(400);
        throw new Error("Cake with this name already exists");
      }
      cake.name = name;
    }

    cake.comment = comment || cake.comment;
    cake.imageUrl = imageUrl || cake.imageUrl;
    cake.yumFactor = yumFactor || cake.yumFactor;

    const updatedCake = await cake.save();
    res.json(updatedCake);
  })
);

router.delete(
  "/:id",
  protect,
  asyncHandler(async (req, res) => {
    const cake = await Cake.findById(req.params.id);

    if (cake) {
      await cake.deleteOne();
      res.json({ message: "Cake removed" });
    } else {
      res.status(404);
      throw new Error("Cake not found");
    }
  })
);

module.exports = router;
