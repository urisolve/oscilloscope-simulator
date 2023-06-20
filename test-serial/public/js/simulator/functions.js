const verticalScaleList = ["2.000E-03", "5.000E-03", "1.000E-02", "2.000E-02", "5.000E-02", "1.000E-01", "2.000E-01", "5.000E-01", "1.000E+00", "2.000E+00", "5.000E+00"];
const horizontalScaleList = ["1.000E-09", "2.500E-09", "5.000E-09", "1.000E-08", "2.500E-08", "5.000E-08", "1.000E-07", "2.500E-07", "5.000E-07", "1.000E-06", "2.500E-06", "5.000E-06", "1.000E-05", "2.500E-05", "5.000E-05", "1.000E-04", "2.500E-04", "5.000E-04", "1.000E-03", "2.500E-03", "5.000E-03", "1.000E-02", "2.500E-02", "5.000E-02", "1.000E-01", "2.500E-01", "5.000E-01", "1.000E+00", "2.500E+00", "5.000E+00", "1.000E+01"];
// Provavelmente pode não ser necessário
const acquireAverageList = ["1", "2", "3", "4", "5", "6", "7", "8"];
const channelCouplingList = ["0", "1", "2"];

var mode;
var verticalScaleValueCH1 = 6;
var verticalScaleValueCH2 = 6;
var horizontalScaleValue = 10;
var horizontalScaleValueReal;
var verticalDisplayCH1 = 0;
var intervalRefCH1 = 0;
var verticalDisplayCH2 = 0;
var intervalRefCH2;
var intervalCH1flag = 0;
var intervalCH2flag = 0;
var timeIntervalCH1 = 0;
var timeIntervalCH2 = 0;
var vppCH1, vppCH2;
var vrmsCH1, vrmsCH2;
var periodCH1, periodCH2;
var frequencyCH1, frequencyCH2;
var chart1, chart2;
var powerValue = 0;
var measureValue = 0;
var acquireValue = 0;
var CH1Value = 0;
var CH2Value = 0;
var dir = [];
var val = [];
var wave = [];
var time = [];
for(i=0; i<250; i++){
    time[i] = i;
}

function hexToValue(hexString) {
    let buffer = new ArrayBuffer(4);
    let dataView = new DataView(buffer);

    dataView.setUint8(0, hexString[3]);
    dataView.setUint8(1, hexString[2]);
    dataView.setUint8(2, hexString[1]);
    dataView.setUint8(3, hexString[0]);

    let floatValue = dataView.getFloat32(0, true); // O segundo parâmetro (true) indica o uso de little-endian

    return floatValue.toExponential(3);
}
function showGraph() {
    //Nota, quando o valor do wave for 0 ou 255, não se deve escrever nada no gráfico, ou neste caso o valor do val ser 127 (0) ou 128 (ff)
        var ctx1 = document.getElementById('myChart1').getContext('2d');
        ctx1.canvas.width = 365;
        ctx1.canvas.height = 355;
        chart1 = new Chart(ctx1, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    borderColor: 'rgb(255, 255, 40)',
                    backgroundColor: 'rgba(255, 255, 40)',
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        display: false,
                        min: 0,     // Alterar para -127 a 127, de forma a que o valor central seja 0
                        max: 255
                    },
                    x: {
                        display: false,
                    },
                },
                legend: {
                    display: false,
                },
                animation: {
                    duration: 0,
                },
            },
        });

        // Added a second chart
        var ctx2 = document.getElementById('myChart2').getContext('2d');
        ctx2.canvas.width = 365;
        ctx2.canvas.height = 355;
        chart2 = new Chart(ctx2, {
            type: 'line',
            data: {
                labels: time,
                datasets: [{
                    borderColor: 'rgb(0, 255, 255)',
                    backgroundColor: 'rgb(0, 255, 255)',
                    pointRadius: 0,
                }]
            },
            options: {
                responsive: false,
                scales: {
                    y: {
                        display: false,
                        min: 0,
                        max: 255
                    },
                    x: {
                        display: false,
                    },
                },
                legend: {
                    display: false,
                },
                animation: {
                    duration: 0,
                },
            },
        });

    }

function atualizarGrafico(channel, val, dir) {
    if (channel == 1) {
        for(i=125; i<375; i++){
            if(dir[i] == 0){
                wave[i-125] = val[i] + 127;  // Talvez mudar para somente val[i] e depois -val[i] para o caso de ser negativo
            }
            else if(dir[i] == 255){
                wave[i-125] = val[i] - 127; 
            }
        }
        chart1.data.datasets[0].data = wave;
        chart1.update();
    }
    if (channel == 2) {
        for(i=125; i<375; i++){
            if(dir[i] == 0){
                wave[i-125] = val[i] + 127; 
            }
            else if(dir[i] == 255){
                wave[i-125] = val[i] - 127; 
            }
        }
        chart2.data.datasets[0].data = wave;
        chart2.update();
    }
}
function scientificNotationToReal(value){
    let valueunit = value.substring(value.length - 3, value.length);
    if(valueunit == "-09" || valueunit == "-08" || valueunit == "-07"){
        format = "n";
    }else if(valueunit == "-06" || valueunit == "-05" || valueunit == "-04"){
        format = "u";
    }else if(valueunit == "-03" || valueunit == "-02" || valueunit == "-01"){
        format = "m";
    }else if(valueunit == "+00" || valueunit == "+01" || valueunit == "+02"){
        format = "";
    }
    if(valueunit == "-09" || valueunit == "-06" || valueunit == "-03" || valueunit == "+00"){
        multi = 1;
    }else if(valueunit == "-08" || valueunit == "-05" || valueunit == "-02" || valueunit == "+01"){
        multi = 10;
    }else if(valueunit == "-07" || valueunit == "-04" || valueunit == "-01" || valueunit == "+02"){
        multi = 100;
    }
    value = value.substring(0, value.length - 6);
    value = value * multi;
    string = value + format;
    return string;
}

function clearScreen(){
    $("#menu-title").text("");
    $("#menu-textTitle1, #menu-textTitle2, #menu-textTitle3, #menu-textTitle4, #menu-textTitle5").css({ "font-size": "15px"}).text("");
    $("#menu-text1, #menu-text2, #menu-text3, #menu-text4, #menu-text5").css({ "font-size": "14px"}).text("");
    $("#menu-soloText1").text("");
    $("#menu-soloText2").text("");
    $("#menu-soloText3").text("");
    $("#menu-soloText4").text("");
    $("#menu-soloText5").text("");
    $("#menu-valueText11").text("");
    $("#menu-valueText12").text("");
    $("#menu-valueText21").text("");
    $("#menu-valueText22").text("");
    $("#menu-valueText31").text("");
    $("#menu-valueText32").text("");
    $("#menu-valueText41").text("");
    $("#menu-valueText42").text("");
    $("#menu-valueText43").text("");
    $("#menu-valueText44").text("");
    $("#menu-valueText51").text("");
    $("#menu-valueText52").text("");
    $("#menu-valueText53").text("");
}
function power(){
    if (powerValue == 0){
        showGraph();
        $("#power-light").css("opacity", 1);
        if(verticalDisplayCH1 == 1){ $("#ch1-button").css("opacity", 1); }
        if(verticalDisplayCH2 == 1){ $("#ch2-button").css("opacity", 1); }
        // Ligar luzinha do osciloscópio
        powerValue = 1;
    }
    else {
        chart1.destroy();
        chart2.destroy();
        clearScreen();
        $("#power-light").css("opacity", 0);
        $("#ch1-button").css("opacity", 0);
        $("#ch2-button").css("opacity", 0);
        powerValue = 0;
        // Desligar luzinha do osciloscópio
    }
    toggleInterface();
}
function menuCH1(){
    if(verticalDisplayCH1 == 0){
        $("#ch1-button").css("opacity", 1);
        verticalDisplayCH1 = 1;
    }
    if(CH1Value == 0){
        CH1Value = 1;
        CH2Value = 0;
        measureValue = 0;
        acquireValue = 0;
        displayValue = 0;
        clearScreen();
        $("#menu-title").text("CH1");
    }
    else if(CH1Value == 1 && verticalDisplayCH1 == 1){
        verticalDisplayCH1 = 0;
        CH1Value = 0;
        $("#ch1-button").css("opacity", 0);
    }
    // Desenvolver função que liga a luz do canal que varia conforme o valor do verticalDisplayCH1
}
function menuCH2(){
    if(verticalDisplayCH2 == 0){
        $("#ch2-button").css("opacity", 1);
        verticalDisplayCH2 = 1;
    }
    if(CH2Value == 0){
        CH2Value = 1;
        CH1Value = 0;
        measureValue = 0;
        acquireValue = 0;
        displayValue = 0;
        clearScreen();
        $("#menu-title").text("CH2");
    }
    else if(CH2Value == 1 && verticalDisplayCH2 == 1){
       verticalDisplayCH2 = 0;
       CH2Value = 0;
       $("#ch2-button").css("opacity", 0);
    }
    // Desenvolver função que liga a luz do canal que varia conforme o valor do verticalDisplayCH2
}
function verticalPositionCH1(){
    alert("Não implementado ainda - Offset Vertical 1");
}
function verticalPositionCH2(){
    alert("Não implementado ainda - Offset Vertical 2");
}
function verticalScaleCH1(verticalScaleValueCH1){
    if(verticalScaleValueCH1 < 0){ verticalScaleValueCH1 = 0; }
    if(verticalScaleValueCH1 > 10){ verticalScaleValueCH1 = 10; }
    let verticalScaleCH1_Value = verticalScaleList[verticalScaleValueCH1];
    let string = scientificNotationToReal(verticalScaleCH1_Value);
    $("#ch1-voltageScale").text(string + "V");
    return verticalScaleValueCH1
}
function verticalScaleCH2(verticalScaleValueCH2){
    if(verticalScaleValueCH2 < 0){ verticalScaleValueCH2 = 0; }
    if(verticalScaleValueCH2 > 10){ verticalScaleValueCH2 = 10; }
    let verticalScaleCH2_Value = verticalScaleList[verticalScaleValueCH2];
    let string = scientificNotationToReal(verticalScaleCH2_Value);
    $("#ch2-voltageScale").text(string + "V");
    return verticalScaleValueCH2
}
function horizontalScale(horizontalScaleValue){
    if(horizontalScaleValue < 0){ horizontalScaleValue = 0; }
    if(horizontalScaleValue > 30){ horizontalScaleValue = 30; }
    let horizontalScale_Value = horizontalScaleList[horizontalScaleValue];
    let string = scientificNotationToReal(horizontalScale_Value);
    $("#time-horizontalScale").text(string + "s");

    return horizontalScaleValue
}
function horizontalPosition(){
    alert("Não implementado ainda - Offset Horizontal");
}
function horizontalMenu(){
    alert("Não implementado ainda - Menu Horizontal");
}
function mathMenu(){
    alert("Não implementado ainda - Menu Math");
}
function triggerMenu(){
    alert("Não implementado ainda - Menu Trigger");
}
function triggerLevel(){
    alert("Não implementado ainda - Trigger Level");	
}
function cursor(){
    alert("Não implementado ainda - Cursor");
}
function measure(){
    clearScreen();
    CH1Value = 0;
    CH2Value = 0;
    acquireValue = 0;
    displayValue = 0;
    $("#menu-title").text("Measure");
    $("#menu-textTitle1").text("Vpp");
    $("#menu-textTitle2").text("Período");
    $("#menu-textTitle3").text("Frequência");
    // Adicionar mais opções de medidas e também permitir ao utilizador escolher quais as medidas que quer ver em cada posição com a utilização dos botões F1, F2, F3, F4 e F5
}
function saveRecall(){
    alert("Menu Save button pressed");
}
function utility(){
    $("#menu-title").text("Utility");
}
function display(){
    alert("Menu Display button pressed");
}
function acquire(){
    clearScreen();
    CH1Value = 0;
    CH2Value = 0;
    measureValue = 0;
    displayValue = 0;
    $("#menu-title").text("Acquire");
    $("#menu-soloText1").text("Normal");
    $("#menu-soloText2").text("Detecta Pico");
    $("#menu-textTitle3").text("Médio");
    $("#menu-textTitle5").text("Compr.Memória");
    $("#menu-textTitle5").css({ "font-size": "12px", "text": "Compr.Memória" });
}
function runStop(){
    alert("Run/Stop button pressed");
}
function help(){
    alert("Help button pressed");
}
function autoSet(){
    alert("Auto Set button pressed");
}
function hardcopy(){
    alert("Hardcopy button pressed");
}
function saveWaveform(){
    alert("Save Waveform button pressed");
}
function waveform1(){
    sendGetRequest("/acq/mem1");
}
function waveform2(){
    sendGetRequest("/acq/mem2");
}

function waves(){
    //let intervalTime = (verticalDisplayCH1 * 2000) + (verticalDisplayCH2 * 2000);
    if(verticalDisplayCH1 == 1 && intervalCH1flag == 0){
        intervalRefCH1 = setInterval(waveform1, 2000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais
        document.getElementById('myChart1').style.display = "block";
        intervalCH1flag = 1;
    }
    if(verticalDisplayCH1 == 0 && intervalCH1flag == 1){
        clearInterval(intervalRefCH1);
        document.getElementById('myChart1').style.display = "none";
        intervalCH1flag = 0;
    }
    if(verticalDisplayCH2 == 1 && intervalCH2flag == 0){
        intervalRefCH2 = setInterval(waveform2, 2000); // Valor 1 segundo quando apenas 1 canal estiver ligado 2 segundos para 2 canais
        document.getElementById('myChart2').style.display = "block";
        intervalCH2flag = 1;
    }
    if(verticalDisplayCH2 == 0 && intervalCH2flag == 1){
        clearInterval(intervalRefCH2);
        document.getElementById('myChart2').style.display = "none";
        intervalCH2flag = 0;
    }
}
function inputCH1() {
    alert("Input CH1 button pressed");
    CH1input = 1;
    $(".signalGenerator").css("opacity", 1);
}