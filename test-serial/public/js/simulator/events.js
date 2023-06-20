$(document).ready(function(){
    let verticalScaleCH1_Value = verticalScaleList[verticalScaleValueCH1];
    $("#ch1-voltageScale").text(scientificNotationToReal(verticalScaleCH1_Value) + "V");
    let verticalScaleCH2_Value = verticalScaleList[verticalScaleValueCH2];
    $("#ch2-voltageScale").text(scientificNotationToReal(verticalScaleCH2_Value) + "V");
    let horizontalScale_Value = horizontalScaleList[horizontalScaleValue];
    $("#time-horizontalScale").text(scientificNotationToReal(horizontalScale_Value) + "s");

    $("#verticalScaleCH1").click(function(){
        if(powerValue == 1){
            if(verticalDisplayCH1 == 1){
                verticalScaleValueCH1++;
                verticalScaleValueCH1 = verticalScaleCH1(verticalScaleValueCH1);
            }
            else{
                //alert("Channel 1 is off!");
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
                verticalScaleValueCH1 = verticalScaleCH1(verticalScaleValueCH1);
            }
            else{
                //alert("Channel 1 is off!");
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
                verticalScaleValueCH2 = verticalScaleCH2(verticalScaleValueCH2);
            }
            else{
                //alert("Channel 2 is off!");
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
                verticalScaleValueCH2 = verticalScaleCH2(verticalScaleValueCH2);
            }
            else{
                //alert("Channel 2 is off!");
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
    $("#ch1-button").click(function(){
        //Update image in html
        if(powerValue == 1){
            menuCH1();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#ch2-button").click(function(){
        //Update image in html
        if(powerValue == 1){
            menuCH2(verticalDisplayCH2);
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
    $("#inputCH1").click(function(){
        if(powerValue == 1){
            //alert("Input CH1 button pressed");
            inputCH1();
        }
        else{
            alert("Turn on the oscilloscope first!");
        }
    });
    $("#power").click(function(){
        power();
    });
});