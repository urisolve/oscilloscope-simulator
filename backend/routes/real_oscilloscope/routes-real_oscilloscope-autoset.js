//* Command related to the Autoset of the oscilloscope.
const express = require("express");
const router = express.Router();
//const { oscilloscope, port } = require("../../utils/real_oscilloscope-setup");

router.post("/autoset", function (req, res) {
    // Autoset
    let command = oscilloscope.writeCommand(oscilloscope.commands[1]);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});

module.exports = router;