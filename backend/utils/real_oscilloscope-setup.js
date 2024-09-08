const { SerialPort } = require("serialport");
const { ReadlineParser } = require("@serialport/parser-readline");

SerialPort.list().then(
    ports => {
        if (ports.length === 0) {
            console.log('No Ports found');
            return;
        }

        ports.forEach(port => {
            console.log(`Port found: ${port.path}`);

            const portCOM = new SerialPort(port.path, {
                baudRate: 9600,
                autoOpen: false
            });

            portCOM.open((err) => {
                if (err) {
                    console.log(`Error ${port.path}: ${err.message}`);
                } else {
                    console.log(`Port ${port.path} is open and available`);
                    portCOM.close();
                }
            });
        });
    },
    err => console.error('Error showing COM Ports: ', err)
);

const Oscilloscope = require("./real-oscilloscope-commands.js");
const oscilloscope = new Oscilloscope();

try {
    const port = new SerialPort({ path: "COM5", baudRate: 9600 });

    port.on('open', () => {
        console.log(`Port ${port} connected successfully`);
        const parser = port.pipe(new ReadlineParser({ delimiter: "\n" }));
        module.exports = {
            oscilloscope,
            port,
            parser,
        };
    });

    port.on('error', (err) => {
        console.error(`Error connecting to port ${port}: `, err.message);
        
    });

} catch (err) {
    console.error(`Error trying to connect to port ${port}: `, err.message);
}