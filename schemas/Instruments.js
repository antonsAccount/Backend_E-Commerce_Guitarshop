const mongoose = require("mongoose");

const instrumentSchema = new mongoose.Schema(
  {
    brand: { type: String, required: true }, //Gibson
    model: { type: String, required: true }, //ES 335
    year: { type: String, required: true }, //2020
    price: { type: String, required: true }, // 2600
    availability: { type: String, required: true }, //available, shortly available, sold
    description: { type: String, required: true }, // This beautiful ES 335 was once ownded by BB King and comes with a nice hard case hand painted by Joan Miro
    color: { type: String, required: true }, // Walnut
    nutwidth: { type: String, required: true }, //43mm
    radius: { type: String, required: true }, //12"
    bag: { type: String, required: true }, // Case - gigbag/case/none
    weight: { type: String, required: true }, // 3.3
    pickups: { type: String, required: true }, // Gibson '57 Classics
    body: { type: String, required: true }, // Maple
    neck: { type: String, required: true }, // Mahagony
    image_url: { type: String, required: true },
    status: { type: String, required: true },
    storage_quantity: { type: Number, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Instruments", instrumentSchema);
