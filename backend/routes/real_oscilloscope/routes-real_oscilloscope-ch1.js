//* Routes related to channel 1 of the oscilloscope
const express = require("express");
const router = express.Router();

router.post("/CH1/bandwidth", function (req, res) {
    // CH1 Bandwidth Limit
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[0], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/coupling", function (req, res) {
    // CH1 Coupling
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[2], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/display", function (req, res) {
    // CH1 Display
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[4], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/invert", function (req, res) {
    // CH1 Invert
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[6], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/position", function (req, res) {
    // CH1 Vertical Position
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[8], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/probe", function (req, res) {
    // CH1 Probe
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[10], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH1/scale", function (req, res) {
    // CH1 Vertical Scale
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[14], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});

module.exports = router;