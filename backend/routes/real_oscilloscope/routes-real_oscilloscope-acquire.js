//* Commands related to the Acquire menu of the oscilloscope.
const express = require("express");
const router = express.Router();

router.post("/acquire/average", function (req, res) {
  // Acquire Average
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.acqCommands[0],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = {
    status: 200,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/acquire/length", function (req, res) {
  // Acquire Length
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.acqCommands[1],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = {
    status: 200,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/acquire/mode", function (req, res) {
  // Acquire Mode
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.acqCommands[2],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = {
    status: 200,
    data: value,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});

module.exports = router;
