const verticalScaleList = ["2.000E-03", "5.000E-03", "1.000E-02", "2.000E-02", "5.000E-02", "1.000E-01", "2.000E-01", "5.000E-01", "1.000E+00", "2.000E+00", "5.000E+00"];
const horizontalScaleList = ["1.000E-09", "2.500E-09", "5.000E-09", "1.000E-08", "2.500E-08", "5.000E-08", "1.000E-07", "2.500E-07", "5.000E-07", "1.000E-06", "2.500E-06", "5.000E-06", "1.000E-05", "2.500E-05", "5.000E-05", "1.000E-04", "2.500E-04", "5.000E-04", "1.000E-03", "2.500E-03", "5.000E-03", "1.000E-02", "2.500E-02", "5.000E-02", "1.000E-01", "2.500E-01", "5.000E-01", "1.000E+00", "2.500E+00", "5.000E+00", "1.000E+01"];
// Provavelmente pode não ser necessário
const acquireAverageList = ["1", "2", "3", "4", "5", "6", "7", "8"];
const channelCouplingList = ["0", "1", "2"];

var mode;
var verticalScaleValueCH1 = -1;
var verticalScaleValueCH2 = -1;
var horizontalScaleValue = -1;
var horizontalScaleValueReal;
var verticalDisplayCH1 = 1;
var intervalRefCH1 = 0;
var verticalDisplayCH2;
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
function handleResponse(response) {
    if(response.status == 200) {
        if(response.verticalScaleCH1_value){
            let value = response.verticalScaleCH1_value;
            for(i = 0; i<verticalScaleList.length; i++){
                if(value == verticalScaleList[i]){
                    value = verticalScaleList[i];
                    verticalScaleValueCH1 = i;
                    break;
                }
            }
            let string = scientificNotationToReal(value);
            $("#ch1-voltageScale").text(string + "V");
        }

        if(response.verticalScaleCH2_value){
            let value = response.verticalScaleCH2_value;
            for(i = 0; i<verticalScaleList.length; i++){
                if(value == verticalScaleList[i]){
                    value = verticalScaleList[i];
                    verticalScaleValueCH2 = i;
                    break;
                }
            }
            let string = scientificNotationToReal(value);
            $("#ch2-voltageScale").text(string + "V");
        }
        
        if(response.horizontalScale_value){
            let value = response.horizontalScale_value;
            for(i = 0; i<horizontalScaleList.length; i++){
                if(value == horizontalScaleList[i]){
                    value = horizontalScaleList[i];
                    horizontalScaleValue = i;
                    break;
                }
            }
            horizontalScaleValueReal = value;
            let string = scientificNotationToReal(value);
            $("#time-horizontalScale").text(string + "s");
        }

        if(response.verticalDisplayCH1_value){
            verticalDisplayCH1 = response.verticalDisplayCH1_value;
        }

        if(response.verticalDisplayCH2_value){
            verticalDisplayCH2 = response.verticalDisplayCH2_value;
        }

        if(response.vppCH1_value){
            let value = response.vppCH1_value;
            if (value < 1){
                vppCH1 = response.vppCH1_value.toExponential(3).replace(/(-)/, "-0");
                vppCH1 = scientificNotationToReal(vppCH1);
            }
            else if (value >= 1){
                vppCH1 = response.vppCH1_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Vpp"){
                    $("#menu-valueText11").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vpp"){
                    $("#menu-valueText21").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vpp"){
                    $("#menu-valueText31").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vpp"){
                    $("#menu-valueText43").text("1: " + vppCH1 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vpp"){
                    $("#menu-valueText52").text("1: " + vppCH1 +"V");
                }
            }
        }
        if(response.vppCH2_value){
            let value = response.vppCH2_value;
            if (value < 1){
                vppCH2 = response.vppCH2_value.toExponential(3).replace(/(-)/, "-0");
                vppCH2 = scientificNotationToReal(vppCH2);
            }
            else if (value >= 1){
                vppCH2 = response.vppCH2_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Vpp"){
                    $("#menu-valueText12").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vpp"){
                    $("#menu-valueText22").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vpp"){
                    $("#menu-valueText32").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vpp"){
                    $("#menu-valueText44").text("2: " + vppCH2 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vpp"){
                    $("#menu-valueText53").text("2: " + vppCH2 +"V");
                }
            }
        }
        if(response.vrmsCH1_value){
            let value = response.vrmsCH1_value;
            if (value < 1){
                vrmsCH1 = response.vrmsCH1_value.toExponential(3).replace(/(-)/, "-0");
                vrmsCH1 = scientificNotationToReal(vrmsCH1);
            }
            else if (value >= 1){
                vrmsCH1 = response.vrmsCH1_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Vrms"){
                    $("#menu-valueText11").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vrms"){
                    $("#menu-valueText21").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vrms"){
                    $("#menu-valueText31").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vrms"){
                    $("#menu-valueText43").text("1: " + vrmsCH1 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vrms"){
                    $("#menu-valueText52").text("1: " + vrmsCH1 +"V");
                }
            }
        }
        if(response.vrmsCH2_value){
            let value = response.vrmsCH2_value;
            if (value < 1){
                vrmsCH2 = response.vrmsCH2_value.toExponential(3).replace(/(-)/, "-0");
                vrmsCH2 = scientificNotationToReal(vrmsCH2);
            }
            else if (value >= 1){
                vrmsCH2 = response.vrmsCH2_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Vrms"){
                    $("#menu-valueText12").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle2").text() == "Vrms"){
                    $("#menu-valueText22").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle3").text() == "Vrms"){
                    $("#menu-valueText32").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle4").text() == "Vrms"){
                    $("#menu-valueText44").text("2: " + vrmsCH2 +"V");
                }
                else if($("#menu-textTitle5").text() == "Vrms"){
                    $("#menu-valueText53").text("2: " + vrmsCH2 +"V");
                }
            }
        }
        if(response.periodCH1_value){
            let value = response.periodCH1_value;
            if (value < 1){
                periodCH1 = response.periodCH1_value.toExponential(3).replace(/(-)/, "-0");
                periodCH1 = scientificNotationToReal(periodCH1);
            }
            else if (value >= 1){
                periodCH1 = response.periodCH1_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Período"){
                    $("#menu-valueText11").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle2").text() == "Período"){
                    $("#menu-valueText21").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle3").text() == "Período"){
                    $("#menu-valueText31").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle4").text() == "Período"){
                    $("#menu-valueText43").text("1: " + periodCH1 +"s");
                }
                else if($("#menu-textTitle5").text() == "Período"){
                    $("#menu-valueText52").text("1: " + periodCH1 +"s");
                }
            }
        }
        if(response.periodCH2_value){
            let value = response.periodCH2_value;
            if (value < 1){
                periodCH2 = response.periodCH2_value.toExponential(3).replace(/(-)/, "-0");
                periodCH2 = scientificNotationToReal(periodCH2);
            }
            else if (value >= 1){
                periodCH2 = response.periodCH2_value.toFixed(3);
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Período"){
                    $("#menu-valueText12").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle2").text() == "Período"){
                    $("#menu-valueText22").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle3").text() == "Período"){
                    $("#menu-valueText32").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle4").text() == "Período"){
                    $("#menu-valueText44").text("2: " + periodCH2 +"s");
                }
                else if($("#menu-textTitle5").text() == "Período"){
                    $("#menu-valueText53").text("2: " + periodCH2 +"s");
                }
            }
        }
        if(response.frequencyCH1_value){
            let value = response.frequencyCH1_value;
            if (value < 1){
                frequencyCH1 = response.frequencyCH1_value.toExponential(3).replace(/(-)/, "-0");
                frequencyCH1 = scientificNotationToReal(frequencyCH1);
            }
            else if (value >= 1){
                frequencyCH1 = response.frequencyCH1_value.toFixed(3); //Ver o que fazer neste caso
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Frequência"){
                    $("#menu-valueText11").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle2").text() == "Frequência"){
                    $("#menu-valueText21").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle3").text() == "Frequência"){
                    $("#menu-valueText31").text("1: " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle4").text() == "Frequência"){
                    $("#menu-valueText43").text("1 " + frequencyCH1 +"Hz");
                }
                else if($("#menu-textTitle5").text() == "Frequência"){
                    $("#menu-valueText52").text("1: " + frequencyCH1 +"Hz");
                }
            }
        }
        if(response.frequencyCH2_value){
            let value = response.frequencyCH2_value;
            if (value < 1){
                frequencyCH2 = response.frequencyCH2_value.toExponential(3).replace(/(-)/, "-0");
                frequencyCH2 = scientificNotationToReal(frequencyCH2);
            }
            else if (value >= 1){
                frequencyCH2 = response.frequencyCH2_value.toFixed(3); //Ver o que fazer neste caso
            }
            if(measureValue == 1){
                if($("#menu-textTitle1").text() == "Frequência"){
                    $("#menu-valueText12").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle2").text() == "Frequência"){
                    $("#menu-valueText22").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle3").text() == "Frequência"){
                    $("#menu-valueText32").text("2: " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle4").text() == "Frequência"){
                    $("#menu-valueText44").text("2 " + frequencyCH2 +"Hz");
                }
                else if($("#menu-textTitle5").text() == "Frequência"){
                    $("#menu-valueText53").text("2: " + frequencyCH2 +"Hz");
                }
            }
        }
        if(response.data_header1){ // Por enquanto não parece ser útil pois a todas as formas de onda parecem ter 250 pontos
            let value = response.data_header1.data;
            let decString = [];
            decString[0] = value[6];
            decString[1] = value[7];
            decString[2] = value[8];
            decString[3] = value[9];
            timeIntervalCH1 = hexToValue(decString);
            numberOfPointsCH1 = (10*horizontalScaleValueReal)/timeIntervalCH1;
        }
        if(response.data_wave1){
            if(response.data_wave1.data){
                let channel = 1;
                let value = response.data_wave1.data;
                let j=0, k=0;
                for(let i = 0; i < value.length; i++){
                    if(i%2 == 0){
                        dir[j] = value[i];
                        j++;
                    }
                    else if(i%2 == 1){
                        val[k] = value[i];
                        k++;
                    }
                }
                atualizarGrafico(channel,val,dir);
            }
        }
        if(response.data_header2){
            let value = response.data_header2.data;
            let decString = [];
            decString[0] = value[6];
            decString[1] = value[7];
            decString[2] = value[8];
            decString[3] = value[9];
            timeIntervalCH2 = hexToValue(decString);
            numberOfPointsCH2 = (10*horizontalScaleValueReal)/timeIntervalCH2;
        }
        if(response.data_wave2){
            if(response.data_wave2.data){
                let channel = 2;
                let value = response.data_wave2.data;
                let j=0, k=0;
                for(let i = 0; i < value.length; i++){
                    if(i%2 == 0){
                        dir[j] = value[i];
                        j++;
                    }
                    else if(i%2 == 1){
                        val[k] = value[i];
                        k++;
                    }
                }
                atualizarGrafico(channel,val,dir);
            }
        }
    }else{
        alert("Error! " + response.status);
    }
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
function sendPostRequest(URL, value) {
    $.ajax({
        url: URL,
        data: JSON.stringify({
            data: value
        }),  
        method: 'POST',
        contentType: 'application/json',
        timeout: 5000,
        success: function(response) {
            handleResponse(response);
        },
        error: function(error) {
            alert("Error! " + error.status + " - " + error.statusText);
        }
    });
}
function sendGetRequest(URL) {
    $.ajax({
        url: URL,  
        method: 'GET',
        contentType: 'application/json',
        timeout: 5000,
        success: function(response) {
            handleResponse(response);
        },
        error: function(error) {
            alert("Error! " + error.status + " - " + error.statusText);
        }
    });
}

function askData(){
    sendGetRequest("/data");
}

function showGraph () {
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

function toggleInterface() {
    if($('.interface').css('opacity') == 0) {$('.interface').css('opacity', 1);}
    else {$('.interface').css('opacity', 0);}
}
function clearScreen(){
    $("#menu-title").text("");
    $("#menu-textTitle1, #menu-textTitle2, #menu-textTitle3, #menu-textTitle4, #menu-textTitle5").css({ "font-size": "15px", "text": "" });
    $("#menu-text1, #menu-text2, #menu-text3, #menu-text4, #menu-text5").css({ "font-size": "14px", "text": "" });
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
        intervalRefWaves = setInterval(waves, 1000);
        intervalRefData = setInterval(askData, 1000); // Valor 500ms
        // Ligar luzinha do osciloscópio
        powerValue = 1;
    }
    else {
        clearInterval(intervalRefData);
        clearInterval(intervalRefWaves);
        clearInterval(intervalRefCH1);
        clearInterval(intervalRefCH2);
        chart1.destroy();
        chart2.destroy();
        intervalCH1flag = 0;
        intervalCH2flag = 0;
        powerValue = 0;
        // Desligar luzinha do osciloscópio
    }
    toggleInterface();
}
function menuCH1(verticalDisplayCH1){
    if(CH1Value == 0){
        CH1Value = 1;
        $("#menu-title").text("CH1");
    }
    else if(CH1Value == 1){
        sendPostRequest("/CH1", verticalDisplayCH1);
    }
    // Desenvolver função que liga a luz do canal que varia conforme o valor do verticalDisplayCH1
}
function menuCH2(verticalDisplayCH2){
    if(CH2Value == 0){
        CH2Value = 1;
        $("#menu-title").text("CH2");
    }
    else if(CH2Value == 1){
        sendPostRequest("/CH2", verticalDisplayCH2);
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
    sendPostRequest("/CH1/vertical-scale", verticalScaleCH1_Value);
    return verticalScaleValueCH1
}
function verticalScaleCH2(verticalScaleValueCH2){
    if(verticalScaleValueCH2 < 0){ verticalScaleValueCH2 = 0; }
    if(verticalScaleValueCH2 > 10){ verticalScaleValueCH2 = 10; }
    let verticalScaleCH2_Value = verticalScaleList[verticalScaleValueCH2];
    sendPostRequest("/CH2/vertical-scale", verticalScaleCH2_Value);
    return verticalScaleValueCH2
}
function horizontalScale(horizontalScaleValue){
    if(horizontalScaleValue < 0){ horizontalScaleValue = 0; }
    if(horizontalScaleValue > 30){ horizontalScaleValue = 30; }
    let value = horizontalScaleList[horizontalScaleValue];
    sendPostRequest("/horizontal-scale", value);

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

$(document).ready(function(){
    $("#verticalScaleCH1").click(function(){
        if(powerValue == 1){
            if(verticalDisplayCH1 == 1){
                verticalScaleValueCH1++;
                verticalScaleCH1(verticalScaleValueCH1);
            }
            else{
                alert("Channel 1 is off!");
            }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalScaleCH1").contextmenu(function(e){
        if(powerValue == 1){
            if(verticalDisplayCH1 == 1){
                e.preventDefault();
                verticalScaleValueCH1--;
                verticalScaleCH1(verticalScaleValueCH1);
            }
            else{
                alert("Channel 1 is off!");
            }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalScaleCH2").click(function(){
        if(powerValue == 1){
            if(verticalDisplayCH2 == 1){
                verticalScaleValueCH2++;
                verticalScaleCH2(verticalScaleValueCH2);
            }
            else{
                alert("Channel 2 is off!");
            }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalScaleCH2").contextmenu(function(e){
        if(powerValue == 1){
            if(verticalDisplayCH2 == 1){
                e.preventDefault();
                verticalScaleValueCH2--;
                verticalScaleCH2(verticalScaleValueCH2);
            }
            else{
                alert("Channel 2 is off!");
            }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#horizontalScale").click(function(){
        if(powerValue == 1){
            horizontalScaleValue++;
            horizontalScaleValue = horizontalScale(horizontalScaleValue);
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#horizontalScale").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            horizontalScaleValue--;
            horizontalScaleValue = horizontalScale(horizontalScaleValue);
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#menuCH1").click(function(){
        //Update image in html
        if(powerValue == 1){
            if (verticalDisplayCH1 == 0){ menuCH1(1); }
            else{ menuCH1(0); }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#menuCH2").click(function(){
        //Update image in html
        if(powerValue == 1){
            if (verticalDisplayCH2 == 0){ menuCH2(1); }
            else{ menuCH2(0); }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalPositionCH1").click(function(){
        if(powerValue == 1){
            verticalPositionCH1();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalPositionCH1").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            verticalPositionCH1();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalPositionCH2").click(function(){
        if(powerValue == 1){
            verticalPositionCH2();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#verticalPositionCH2").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            verticalPositionCH2();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#horizontalPosition").click(function(){
        if(powerValue == 1){
            horizontalPosition();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#horizontalPosition").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            horizontalPosition();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#horizontalMenu").click(function(){
        //Update image in html
        if(powerValue == 1){
            horizontalMenu();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#mathMenu").click(function(){
        //Update image in html
        if(powerValue == 1){
            mathMenu();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#triggerMenu").click(function(){
        //Update image in html
        if(powerValue == 1){
            triggerMenu();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#triggerLevel").click(function(){
        if(powerValue == 1){
            triggerLevel();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#triggerLevel").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            triggerLevel();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#cursor").click(function(){
        //Update image in html
        if(powerValue == 1){
            cursor();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#measure").click(function(){
        //Update image in html
        if(powerValue == 1){
            if(measureValue == 0){
                measureValue = 1;
                measure();
            }
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#saveRecall").click(function(){
        //Update image in html
        if(powerValue == 1){
            saveRecall();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#utility").click(function(){
        //Update image in html
        if(powerValue == 1){
            utility();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#display").click(function(){
        //Update image in html
        if(powerValue == 1){
            display();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#acquire").click(function(){
        //Update image in html
        if(powerValue == 1){
            acquire();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#runStop").click(function(){
        //Update image in html
        if(powerValue == 1){
            runStop();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#help").click(function(){
        //Update image in html
        if(powerValue == 1){
            help();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#autoSet").click(function(){
        //Update image in html
        if(powerValue == 1){
            autoSet();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#hardcopy").click(function(){
        //Update image in html
        if(powerValue == 1){
            hardcopy();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#variable").click(function(){
        if(powerValue == 1){
            alert("Variable button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#variable").contextmenu(function(e){
        if(powerValue == 1){
            e.preventDefault();
            alert("Variable button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#autoTestStop").click(function(){
        //Update image in html
        if(powerValue == 1){
            alert("Auto Test/Stop button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#program").click(function(){
        //Update image in html
        if(powerValue == 1){
            alert("Program button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#f1").click(function(){
        if(powerValue == 1){
            alert("F1 button pressed")
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#f2").click(function(){
        if(powerValue == 1){
            alert("F2 button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#f3").click(function(){
        if(powerValue == 1){
            alert("F3 button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#f4").click(function(){
        if(powerValue == 1){
            alert("F4 button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#f5").click(function(){
        if(powerValue == 1){
            alert("F5 button pressed");
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#power").click(function(){
        power();
    });
});