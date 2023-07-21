const Instruments = require("../schemas/Instruments");

const addInstrument = async (req, res) => {
  //image upload
  try {
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
      storage_quantity,
    } = req.body;
    console.log(req.file);
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
        storage_quantity,
        image_url: req.file.path,
      });

      const instrumentRes = await instrument.save();

      console.log("instrumentRes:", instrumentRes);
      return res
        .status(201)
        .json({ msg: "Instrument saved successfully!", instrumentRes });
    } else {
      return res.status(422).json({ error });
    }
  } catch (error) {
    return res.status(400).json({ msg: error });
  }
};

const getAllInstruments = async (req, res) => {
  try {
    const data = await Instruments.find({});
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ msg: "Something went wrong" });
  }
};

const updateInstrument = async (req, res) => {
  try {
    console.log("Update Instrument Tree".blue);
    const _id = req.params.id;
    const newInstrument = {};
    const keysArray = Object.keys(req.body);
    const var1 = keysArray.map((element) => {
      newInstrument[element] = req.body[element];
    });
    console.log(req.file);
    console.log(newInstrument);
    if (req.file && req.file.path) {
      newInstrument.image_url = req.file.path;
    }
    const updatedInstrument = await Instruments.findByIdAndUpdate(
      _id,
      newInstrument,
      { new: true }
    ); //Curly Braces necessary?!?!
    return res.status(200).json({ msg: "Success", updatedInstrument });
  } catch (error) {
    res.status(400).json({
      msg: "An error has occurred whilst updating the instrument",
      error,
    });
  }
};

const deleteInstrument = async (req, res) => {
  try {
    const _id = req.params.id;
    const deletedInstrument = await Instruments.findByIdAndDelete(_id);
    return res.status(204).json();
  } catch (error) {
    res.status(400).json({ msg: "The following error occurred", error });
  }
};

module.exports = {
  addInstrument,
  getAllInstruments,
  updateInstrument,
  deleteInstrument,
};
