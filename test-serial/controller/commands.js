module.exports = class Oscilloscope {
    constructor(AVER) {
        this.commands=[];
        this.commands.push('*LRN?'); // Returns all the commands [0]
        this.commands.push(':AUT'); // Auto Set [1]
        this.commands.acqCommands=[]; // List of Acquisition Related commands
            this.commands.acqCommands.push(':ACQ1:AVER'); // Number of averages CH1 [0]
            this.commands.acqCommands.push(':ACQ2:AVER'); // Number of averages CH2 [1]
            this.commands.acqCommands.push(':ACQ1:LENG'); // Record length CH1 [2]
            this.commands.acqCommands.push(':ACQ2:LENG'); // Record length CH2 [3]
            this.commands.acqCommands.push(':ACQ1:MOD'); // Current mode CH1 [4]
            this.commands.acqCommands.push(':ACQ2:MOD'); // Current mode CH2 [5]
            this.commands.acqCommands.push(':ACQ1:MEM?'); // Waveform data CH1 [6]
            this.commands.acqCommands.push(':ACQ2:MEM?'); // Waveform data CH2 [7]
        this.commands.chanCommands=[]; // List of Channel Related commands
            this.commands.chanCommands.push(':CHAN1:BW'); // Bandwidth limit CH1 [0]
            this.commands.chanCommands.push(':CHAN2:BW'); // Bandwidth limit CH2 [1]
            this.commands.chanCommands.push(':CHAN1:COUP'); // Coupling State CH1 [2]
            this.commands.chanCommands.push(':CHAN2:COUP'); // Coupling State CH2 [3]
            this.commands.chanCommands.push(':CHAN1:DISP'); // Display State CH1 [4]
            this.commands.chanCommands.push(':CHAN2:DISP'); // Display State CH2 [5]
            this.commands.chanCommands.push(':CHAN1:INV'); // Invert State CH1 [6]
            this.commands.chanCommands.push(':CHAN2:INV'); // Invert State CH2 [7]
            this.commands.chanCommands.push(':CHAN1:OFFS'); // Offset CH1 [8]
            this.commands.chanCommands.push(':CHAN2:OFFS'); // Offset CH2 [9]
            this.commands.chanCommands.push(':CHAN1:PROB'); // Probe attenuation CH1 [10]
            this.commands.chanCommands.push(':CHAN2:PROB'); // Probe attenuation CH2 [11]
            this.commands.chanCommands.push(':CHAN1:MATH'); // Select the different math functions for the oscilloscope channels CH1 [12]
            this.commands.chanCommands.push(':CHAN2:MATH'); // Select the different math functions for the oscilloscope channels CH2 [13]
            this.commands.chanCommands.push(':CHAN1:SCAL'); // Vertical Scale CH1 [14]
            this.commands.chanCommands.push(':CHAN2:SCAL'); // Vertical Scale CH2 [15]
        this.commands.push(':COPY'); // Hardcopy to USB [2]
        this.commands.cursCommands=[]; // List of Cursor Related commands
            this.commands.cursCommands.push(':CURS:X'); // Adjust the cursor position of X axis [0] ---------------------------
            this.commands.cursCommands.push(':CURS:Y'); // Adjust the cursor position of Y axis [1] ---------------------------
            this.commands.cursCommands.push(':CURS:XDIS'); // Enables the X axis cursor display [2]
            this.commands.cursCommands.push(':CURS:YDIS'); // Enables the Y axis cursor display [3]
            this.commands.cursCommands.push(':CURS:SOUR'); // Select the source of the cursor [4]
        this.commands.dispCommands=[]; // List of Display Related commands
            this.commands.dispCommands.push(':DISP:ACC'); //Accumulate display mode [0]
            this.commands.dispCommands.push(':DISP:CONT'); // Contrast level [1]
            this.commands.dispCommands.push(':DISP:GRAT'); // Graticule display mode [2]
            this.commands.dispCommands.push(':DISP:WAV'); // Waveform display mode [3]
/*  // Needs to be implemented                                                                       ---------------------------
        this.commands.gonCommands=[]; // List of Go/NoGo Related commands
            this.commands.gonCommands.push(':GON:CLE'); // Clear the Go/NoGo test result [0]
            this.commands.gonCommands.push(':GON:EXEC'); // Start or stop the execution of the Go/NoGo test [1]
            this.commands.gonCommands.push(':GON:FUNC'); // Used to initialize or relieve the Go/NoGo test function [2]
            this.commands.gonCommands.push(':GON:NGC');
            // Sets and query the user-defined NO-GO conditions
            this.commands.gonCommands.push(':NGD');
            // Sets and query the user-defined GO/NO-GO comparison source channel
            this.commands.gonCommands.push(':SOUR');
            // Sets and query the user-defined GO/NO-GO violation condition
            this.commands.gonCommands.push(':VIOL');
*/
/* // Needs to be implemented                                                                       ---------------------------
        this.commands.hardCommands=[]; // List of Hardcopy Related commands
        this.commands.push(':HARD');
            // Sets the output format of hardcopy to "ink-save" mode
            this.commands.hardCommands.push(':INK');
            // Sets the print-out of hardcopy in black and white or color
            this.commands.hardCommands.push(':LAY');
            // Select the harcopy output style
            this.commands.hardCommands.push(':MOD');
            // Select the print-out image size for hardcopy function
            this.commands.hardCommands.push(':RAT');
*/
        this.commands.measCommands=[]; // List of Measurement Related commands
            this.commands.measCommands.push(':MEAS:DELAY1'); //Select the first source for eight different delay time measurements [0]
            this.commands.measCommands.push(':MEAS:DELAY2'); //Select the second source for eight different delay time measurements [1]
            this.commands.measCommands.push(':MEAS:SOUR 1'); // Select the measured channel [2]

/* // Needs to be implemented                                                                       ---------------------------
        this.commands.memCommands=[]; // List of Memory Related commands
            //Recalls setup form internal non-volatile memory
            this.commands.memCommands.push(':MEM'+X+':REC:SET'); // X = 1-20
*/
        this.commands.push(':REFR'); // Refresh the screen [3]
/* // Needs to be implemented                                                                       ---------------------------
        this.commands.refCommands=[]; // List of Reference Related commands
            // Select the reference waveform and display it on the screen
            this.commands.refCommands.push(':REF'+X+':DISP'); // X = 1-4 
*/
        this.commands.push(':RUN'); // Start the acquisition [4]
        this.commands.push(':STOP'); // Stop the acquisition [5]
/* // Needs to be implemented                                                                       ---------------------------
        this.commands.tempCommands=[]; // List of Template Related commands
        this.commands.push(':TEMP');
            // Sets and query the number of template used for maximum boundary
            this.commands.tempCommands.push(':MAX');
            // Sets and query the number of template used for minimum boundary
            this.commands.tempCommands.push(':MIN');
            // Sets and query the template mode
            this.commands.tempCommands.push(':MOD');
            // Sets and query the position of maximum template
            this.commands.tempCommands.
            this.commands.tempCommands.push(':POS:MAX');
            // Sets and query the position of minimum template
            this.commands.tempCommands.push(':TEMP:POS:MIN');
            // Save the Auto template
            this.commands.tempCommands.push(':TEMP:SAV:AUT');
            // Save the maximum template
            this.commands.tempCommands.push(':TEMP:SAV:MAX');
            // Save the minimum template
            this.commands.tempCommands.push(':TEMP:SAV:MIN');
            // Sets and query the tolerance of auto template
            this.commands.tempCommands.push(':TEMP:TOL');
*/
        this.commands.timCommands=[]; // List of Time Related commands
            this.commands.timCommands.push(':TIM:DEL'); // Horizontal delay time [0]
            this.commands.timCommands.push(':TIM:SCAL'); // Horizontal scale [1]
            this.commands.timCommands.push(':TIM:SWE'); // Horizontal sweep mode [2]
            this.commands.timCommands.push(':TIM:WIND:DEL'); // Delay time of the window zoomed timebase [3]
            this.commands.timCommands.push(':TIM:WIND:SCAL'); // Scale of the window zoomed timebase [4]

        this.commands.trigCommands=[]; // List of Trigger Related commands
            this.commands.trigCommands.push(':TRIG:COUP'); // Coupling [0]
            this.commands.trigCommands.push(':TRIG:DEL:TIM'); // Delay time [1]
            this.commands.trigCommands.push(':TRIG:DEL:EVEN'); // Delay trigger events [2]
            this.commands.trigCommands.push(':TRIG:DEL:LEV'); // Delay trigger level [3]
            this.commands.trigCommands.push(':TRIG:DEL:MOD'); // Delay trigger mode [4]   
            this.commands.trigCommands.push(':TRIG:DEL:TYP'); // Delay trigger type [5]
            this.commands.trigCommands.push(':TRIG:LEV'); // Trigger level [6]
            this.commands.trigCommands.push(':TRIG:MOD'); // Trigger mode [7]
            this.commands.trigCommands.push(':TRIG:NREJ'); // Noise rejection [8]
            this.commands.trigCommands.push(':TRIG:PULS:MOD'); // Pulse trigger mode [9]
            this.commands.trigCommands.push(':TRIG:PULS:TIM'); // Pulse trigger time [10]
            this.commands.trigCommands.push(':TRIG:REJ'); // Trigger rejection [11]
            this.commands.trigCommands.push(':TRIG:SLOP'); // Trigger slope [12]
            this.commands.trigCommands.push(':TRIG:SOUR'); // Trigger source [13]
            this.commands.trigCommands.push(':TRIG:TYP'); // Trigger type [14]  
            this.commands.trigCommands.push(':TRIG:VID:FIE'); // Trigger video field [15]
            this.commands.trigCommands.push(':TRIG:VID:LIN'); // Trigger video line [16]
            this.commands.trigCommands.push(':TRIG:VID:POL'); // Trigger video polarity [17]
            this.commands.trigCommands.push(':TRIG:VID:TYP'); // Trigger video type [18]
/* // Needs to be implemented                                                                       ---------------------------
        this.commands.usbCommands=[]; // List of USB Related commands
        this.commands.push(':USB');
            // Recall the setup from the USB flash disk
            this.commands.usbCommands.push(':REC:SET');
            // Recall the saved waveform from the USB flash disk and save to reference
            this.commands.usbCommands.push(':REC:WAV');
            // Save all oscilloscope setting, waveform raw data, and image to USB flash disk
            this.commands.usbCommands.push(':SAV:ALL');
            // Save present waveform image to USB flash disk
            this.commands.usbCommands.push('USB:SAV:IMAG');
            // Save all settings of oscilloscope to USB flash disk
            this.commands.usbCommands.push(':SAV:SET');
            // Save present waveform raw data to USB flash disk
            this.commands.usbCommands.push('USB:SAV:WAV');
*/
    }
    writeCommand(command, value="") {
        // Write the command to the oscilloscope
        var string = command + ' ' + value + '\n';
        return string
    }
    writeToPort(command, port){
        port.write(command, function(err) {
            if (err) {
                return console.log('Error on write: ', err.message);
            }
        });
    }
}
