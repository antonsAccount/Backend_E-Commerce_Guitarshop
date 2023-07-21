const Cart = require("../schemas/Cart");

const createCart = async (req, res) => {
  try {
    console.log("create Cart Tree".blue);
    const { owner, items, bill } = req.body;
    const cart = await Cart.create({
      owner,
      items,
      bill,
    });
    return res.status(200).json({ msg: "success", cart });
  } catch (error) {
    return res.status(400).json({ msg: "something went wrong", error });
  }
};

module.exports = { createCart };
