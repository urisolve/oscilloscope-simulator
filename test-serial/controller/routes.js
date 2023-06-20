const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const Oscilloscope = require('./commands.js')
const oscilloscope = new Oscilloscope();

const { SerialPort } = require('serialport');
const port = new SerialPort({path: 'COM4', baudRate: 9600 });
const { ReadlineParser } = require('@serialport/parser-readline');
const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

var verticalScaleCH1 = null;
var verticalScaleCH2 = null;
var horizontalScale = null;
var verticalDispCH1 = null;
var verticalDispCH2 = null;
var vppCH1 = null;
var vppCH2 = null;
var vrmsCH1 = null;
var vrmsCH2 = null;
var periodCH1 = null;
var periodCH2 = null;
var frequencyCH1 = null;
var frequencyCH2 = null;
var header1 = null;
var wave1 = null;
var header2 = null;
var wave2 = null;
var flag1 = 0;
var flag2 = 0;

// Acrescentar os comandos que faltam.
parser.on('data', function(data) {
    const scaleValue = /SCALe\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;
    const dispValue = /DISPlay\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;
    // ------------- Added ------------
    const timeValue = /TIMe\s(\d{2}\s\d{2}\s\d{2})/g;
    const dateValue = /DATe\s(\d{2}\/\d{2}\/\d{4})/g;
    const typeValue = /TYPe\s([\d\.])/g;
    const coupleValue = /COUple\s([\d\.])/g;
    const levelValue = /TYPe\s([\d\.])/g;
    const modeValue = /MODE\s([\d\.])/g;
    const nrejValue = /NREJ\s([\d\.])/g;
    const rejectValue = /REJect\s([\d\.])/g;
    const slopValue = /SLOP\s([\d\.])/g;
    const sourceValue = /SOURce\s([\d\.])/g;
    const delayValue = /DELay\s([\d\.])/g;
    const eventValue = /EVENt\s([\d\.])/g;
    const fieldValue = /FIELd\s([\d\.])/g;
    const lineValue = /LINe\s([\d\.])/g;
    const polarityValue = /POLarity\s([\d\.])/g;
    const averageValue = /AVERage\s([\d\.])/g;
    const lengthValue = /LENGth\s([\d\.])/g;
    const waveformValue = /WAVeform\s([\d\.])/g;
    const dispcontrastValue = /DISPCONtrast\s([\d\.])/g;
    const graticuleValue = /GRATicule\s([\d\.])/g;
    const vppValue = /VPP\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;
    const vrmsValue = /VRMS\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;
    const periodValue = /PERiod\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;
    const frequencyValue = /FREQuency\s([\d\.]+[Ee][+-]\d+|\d+\.\d+|\d+)/g;

    const scaleMatch = data.match(scaleValue);
    if (scaleMatch) {
        verticalScaleCH1 = parseFloat(scaleMatch[0].split(" ")[1]);
        verticalScaleCH2 = parseFloat(scaleMatch[1].split(" ")[1]);
        horizontalScale = parseFloat(scaleMatch[2].split(" ")[1]);
    }

    const displayMatch = data.match(dispValue);
    if(displayMatch) {
        verticalDispCH1 = displayMatch[2][8];
        verticalDispCH2 = displayMatch[3][8];
    }

    const vppMatch = data.match(vppValue);
    if(vppMatch) {
        if(vppMatch[0]) {
            vppCH1 = parseFloat(vppMatch[0].split(" ")[1]);
        }
        if(vppMatch[1]) {
            vppCH2 = parseFloat(vppMatch[1].split(" ")[1]);
        }
    }
    const vrmsMatch = data.match(vrmsValue);
    if(vrmsMatch) {
        if(vrmsMatch[0]) {
            vrmsCH1 = parseFloat(vrmsMatch[0].split(" ")[1]);
        }
        if(vrmsMatch[1]) {
            vrmsCH2 = parseFloat(vrmsMatch[1].split(" ")[1]);
        }
    }
    const periodMatch = data.match(periodValue);
    if(periodMatch) {
        if(periodMatch[0]) {
            periodCH1 = parseFloat(periodMatch[0].split(" ")[1]);
        }
        if(periodMatch[1]) {
            periodCH2 = parseFloat(periodMatch[1].split(" ")[1]);
        }
    }

    const frequencyMatch = data.match(frequencyValue);
    if(frequencyMatch) {
        if(frequencyMatch[0]) {
            frequencyCH1 = parseFloat(frequencyMatch[0].split(" ")[1]);
        }
        if(frequencyMatch[1]) {
            frequencyCH2 = parseFloat(frequencyMatch[1].split(" ")[1]);
        }
    }
});

port.on('data', function(data) {
    if(flag1 == 0 && data[0] == "35" && data[10] == "1"){
        header1 = data;
        flag1 = 1;
    }
    else if(flag1 == 1 && (data[0] == "0" || data[0] == "255")){
        wave1 = data;
        flag1 = 0;
    }

    if(flag2 == 0 && data[0] == "35" && data[10] == "2"){
        header2 = data;
        flag2 = 1;
    }
    else if(flag2 == 1 && (data[0] == "0" || data[0] == "255")){
        wave2 = data;
        flag2 = 0;
    }
});

port.on('open', function() {
    console.log('Port is open');
});
port.on('close', function() {
    console.log('Port is closed');
});

router.get('/', function(req, res){
    res.render("home");
});
router.get('/controlo', function(req, res){
    res.render("pages/controlo");
});
router.get('/simulador', function(req, res){
    res.render("pages/simulador");
});

router.post('/CH1', function(req, res){
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[4], value);
    oscilloscope.writeToPort(command, port);
    object = {
        status: 200
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON); 
});

router.post('/CH1/vertical-scale', function(req, res){
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
router.post('/CH2', function(req, res){
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
router.post('/CH2/vertical-scale', function(req, res){
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.chanCommands[15], value);
    oscilloscope.writeToPort(command, port);
    object = {
        status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");  //Ver como simplificar este comando.
    res.send(stringJSON); 
});
router.post('/horizontal-scale', function(req, res){
    let value = req.body.data;
    let command = oscilloscope.writeCommand(oscilloscope.commands.timCommands[1], value);
    oscilloscope.writeToPort(command, port);
    object = {
        status: 200,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");  
    res.send(stringJSON); 
});

// Criar as restantes post requests para todos os comandos que modificam algo no osciloscópio.

router.get('/acq/mem1', function(req, res){
    let command2 = oscilloscope.writeCommand(oscilloscope.commands.acqCommands[6]);
    oscilloscope.writeToPort(command2, port);
    object = {
        status: 200,
        data_header1: header1,
        data_wave1: wave1
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});

router.get('/acq/mem2', function(req, res){
    let command2 = oscilloscope.writeCommand(oscilloscope.commands.acqCommands[7]);
    oscilloscope.writeToPort(command2, port);
    object = {
        status: 200,
        data_header2: header2,
        data_wave2: wave2
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);
});

// Falta acrescentar os outros comandos.
router.get('/data', function(req, res){
    let command = oscilloscope.writeCommand(oscilloscope.commands[0]);
    oscilloscope.writeToPort(command, port);
    object = {
        status: 200,
        verticalScaleCH1_value: verticalScaleCH1,
        verticalScaleCH2_value: verticalScaleCH2,
        horizontalScale_value: horizontalScale,
        verticalDisplayCH1_value: verticalDispCH1,
        verticalDisplayCH2_value: verticalDispCH2,  
        vppCH1_value: vppCH1,
        vppCH2_value: vppCH2,
        vrmsCH1_value: vrmsCH1,
        vrmsCH2_value: vrmsCH2,
        periodCH1_value: periodCH1,
        periodCH2_value: periodCH2,
        frequencyCH1_value: frequencyCH1,
        frequencyCH2_value: frequencyCH2,
    };
    const stringJSON = JSON.stringify(object);
    res.setHeader("Content-Type", "application/json");
    res.send(stringJSON);    
});

module.exports = router;