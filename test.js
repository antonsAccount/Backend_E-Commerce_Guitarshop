const req = {
  body: {
    price: "2000",
    availability: "available",
    nutwidth: "43mm",
    body: "Korina",
  },
};

const newInstrument = {};

const testFunc = () => {
  const keysArray = Object.keys(req.body);
  const var1 = keysArray.map((element) => {
    newInstrument[element] = req.body[element];
  });
};
testFunc();
console.log(newInstrument);
