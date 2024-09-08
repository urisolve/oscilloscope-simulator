//* Routes related to the real oscilloscope commands, which are sent to the oscilloscope through the serial port.
const express = require("express");
const router = express.Router();

const Oscilloscope = require("../utils/real_oscilloscope-commands.js");
const oscilloscope = new Oscilloscope();

const acquireRoutes = require("./real_oscilloscope/routes-real_oscilloscope-acquire.js");
const autosetRoutes = require("./real_oscilloscope/routes-real_oscilloscope-autoset.js");
const ch1Routes = require("./real_oscilloscope/routes-real_oscilloscope-ch1.js");
// TODO - Add the remaining routes.

router.use(acquireRoutes);
router.use(autosetRoutes);
router.use(ch1Routes);



router.get("/acquisition", function (req, res) {
  // TODO - Ver se mantem esta rota.
  acquisitionFlag = 1;
  object = {
    status: 200,
    on: 1,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});

//? -------- POST routes --------
//? ---- Cursor ----
// TODO - Acrescentar o cursor.
//? ---- Display ----
router.post("/display/accumulate", function (req, res) {
  //! Display Accumulate - Not present in *LRN? command
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.dispCommands[0],
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
router.post("/display/contrast", function (req, res) {
  // Display Contrast
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.dispCommands[1],
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
router.post("/display/graticule", function (req, res) {
  // Display Graticule
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.dispCommands[2],
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
router.post("/display/waveform", function (req, res) {
  // Display Waveform
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.dispCommands[3],
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
//? ---- Measure ----
router.post("/measure/delay1", function (req, res) {
  // Measure Delay 1
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.measCommands[0],
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
router.post("/measure/delay2", function (req, res) {
  // Measure Delay 2
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.measCommands[1],
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
router.post("/measure/source", function (req, res) {
  //! Measure Source - Doesn't need to be implemented since everything is already sended with the *LRN? command.
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.measCommands[2],
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
//? ---- Refresh ----
router.post("/refresh", function (req, res) {
  // Refresh
  let command = oscilloscope.writeCommand(oscilloscope.commands[2]);
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
//? ---- Run and Stop ----
router.post("/run", function (req, res) {
  // Run
  let command = oscilloscope.writeCommand(oscilloscope.commands[3]);
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/stop", function (req, res) {
  // Stop
  let command = oscilloscope.writeCommand(oscilloscope.commands[4]);
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
//? ---- Timebase ----
router.post("/timebase/position", function (req, res) {
  // Horizontal Position
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.timCommands[0],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/timebase/scale", function (req, res) {
  // Horizontal Scale
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.timCommands[1],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/timebase/sweep", function (req, res) {
  // Horizontal Sweep Mode
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.timCommands[2],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/timebase/window-position", function (req, res) {
  // Horizontal Window Position
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.timCommands[3],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/timebase/window-scale", function (req, res) {
  // Horizontal Window Scale
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.timCommands[4],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
//? ---- Trigger ----
router.post("/trigger/couple", function (req, res) {
  // Trigger Coupling
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[0],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/delay-time", function (req, res) {
  // Trigger Delay Time
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[1],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/delay-event", function (req, res) {
  // Trigger Delay Event
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[2],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/delay-level", function (req, res) {
  // Trigger Delay Level
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[3],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/delay-mode", function (req, res) {
  // Trigger Delay Mode
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[4],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/delay-type", function (req, res) {
  // Trigger Delay Type
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[5],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/level", function (req, res) {
  // Trigger Level
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[6],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/mode", function (req, res) {
  // Trigger Mode
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[7],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/nrej", function (req, res) {
  // Trigger NRej
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[8],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/pulse-mode", function (req, res) {
  // Trigger Pulse Mode
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[9],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/pulse-time", function (req, res) {
  // Trigger Pulse Time
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[10],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/rej", function (req, res) {
  // Trigger Rej
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[11],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/slope", function (req, res) {
  // Trigger Slope
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[12],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/source", function (req, res) {
  // Trigger Source
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[13],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/type", function (req, res) {
  // Trigger Type
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[14],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.get("/trigger/video-field", function (req, res) {
  // Trigger Video Field
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[15],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/video-line", function (req, res) {
  // Trigger Video Line
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[16],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/video-polarity", function (req, res) {
  // Trigger Video Polarity
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[17],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.post("/trigger/video-type", function (req, res) {
  // Trigger Video Standard
  let value = req.body.data;
  let command = oscilloscope.writeCommand(
    oscilloscope.commands.trigCommands[18],
    value
  );
  oscilloscope.writeToPort(command, port);
  object = { status: 200 };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});

// TODO - Criar as restantes post requests para todos os comandos que modificam algo no osciloscópio.

//? -------- GET routes --------
router.get("/acq/mem1", function (req, res) {
  let command = oscilloscope.writeCommand(oscilloscope.commands.acqCommands[3]);
  oscilloscope.writeToPort(command, port);
  object = {
    status: 200,
    data_header_CH1: headerCH1,
    data_wave_CH1: waveCH1,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.get("/acq/mem2", function (req, res) {
  let command2 = oscilloscope.writeCommand(
    oscilloscope.commands.acqCommands[4]
  );
  oscilloscope.writeToPort(command2, port);
  object = {
    status: 200,
    data_header_CH2: headerCH2,
    data_wave_CH2: waveCH2,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});
router.get("/data", function (req, res) {
  let command = oscilloscope.writeCommand(oscilloscope.commands[0]);
  oscilloscope.writeToPort(command, port);

  object = {
    status: 200,
    verticalScaleCH1_value: verticalScaleCH1,
    verticalScaleCH2_value: verticalScaleCH2,
    horizontalScale_value: horizontalScale,
    displayCH1_value: displayCH1,
    displayCH2_value: displayCH2,
    vppCH1_value: vppCH1,
    vppCH2_value: vppCH2,
    vrmsCH1_value: vrmsCH1,
    vrmsCH2_value: vrmsCH2,
    periodCH1_value: periodCH1,
    periodCH2_value: periodCH2,
    frequencyCH1_value: frequencyCH1,
    frequencyCH2_value: frequencyCH2,
    couplingCH1_value: couplingCH1,
    couplingCH2_value: couplingCH2,

    invertCH1_value: invertCH1,
    invertCH2_value: invertCH2,
    probeCH1_value: probeCH1,
    probeCH2_value: probeCH2,

    acquireAverage_value: acquireAverage,
    acquireLength_value: acquireLength,
    acquireMode_value: acquireMode,

    triggerType_value: triggerType,
    triggerSource_value: triggerSource,
  };
  const stringJSON = JSON.stringify(object);
  res.setHeader("Content-Type", "application/json");
  res.send(stringJSON);
});

module.exports = router;
