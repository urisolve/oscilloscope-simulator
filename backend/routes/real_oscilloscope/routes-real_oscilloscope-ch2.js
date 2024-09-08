//* Routes related to channel 2 of the oscilloscope
const express = require("express");
const router = express.Router();

router.post("/CH2/bandwidth", function (req, res) {
    // CH2 Bandwidth Limit
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[1], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/coupling", function (req, res) {
    // CH2 Coupling
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[3], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/display", function (req, res) {
    // CH2 Display
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[5], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/invert", function (req, res) {
    // CH2 Invert
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[7], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/position", function (req, res) {
    // CH2 Vertical Position
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[9], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/probe", function (req, res) {
    // CH2 Probe
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[11], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});
router.post("/CH2/scale", function (req, res) {
    // CH2 Vertical Scale
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[15], value);
    oscilloscope.writeToPort(command, port);
    object = {
      status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json"); //Ver como simplificar este comando.
    res.send(stringJSON);
});

module.exports = router;