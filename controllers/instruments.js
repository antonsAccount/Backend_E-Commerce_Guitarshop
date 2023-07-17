const Instruments = require("../schemas/Instruments");

const addInstrument = async (req, res) => {
  const {
    brand,
    model,
    year,
    price,
    availability,
    description,
    color,
    nutwidth,
    radius,
    bag,
    weight,
    pickups,
    body,
    neck,
  } = req.body;
  console.log(req.file);

  //image upload
  try {
    if (req.file && req.file.path) {
      //remember that the image file must have the key "picture" in the POST Request otherwise the upload fails, see routes/instruments
      const instrument = new Instruments({
        brand,
        model,
        year,
        price,
        availability,
        description,
        color,
        nutwidth,
        radius,
        bag,
        weight,
        pickups,
        body,
        neck,
        image_url: req.file.path,
      });

      const instrumentRes = await instrument.save();

      console.log("instrumentRes:", instrumentRes);
      return res
        .status(200)
        .json({ msg: "Instrument saved successfully!", instrumentRes });
    } else {
      return res.status(422).json({ error });
    }
  } catch (error) {
    return res.status(500).json({ msg: error });
  }
};

const updateInstrument = async (req, res) => {
  try {
    const _id = req.params.id;

    // const {} = req.body
    //Not knowing which fields will be updated, is there a way to only destructure the variables from the
    //req.body that exist and then only update them instead of writing the logic for each individual possible key
  } catch (error) {
    res.status(400).json({
      msg: "An error has occurred while updating the instrument",
      error,
    });
  }
};

module.exports = { addInstrument };
