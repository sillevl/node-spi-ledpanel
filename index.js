var SPI = require('spi');

var LedPanel = function(dev){ // device eg: '/dev/spidev1.1'
	this.device = new SPI.Spi(dev, {
		"mode": SPI.MODE['MODE_0'],// always set mode as the first option
    	'chipSelect': SPI.CS['none'], // 'none', 'high' - defaults to low
		'maxSpeed': 1000000
	}, function(s){s.open();});
};

LedPanel.prototype.write = function(data){
	this.device.write(data);
};

LedPanel.prototype.line = function(panel, line, data){
	var buffer = new Buffer((3 + (32*3)));

	buffer[0] = 0x01; 	// line command
	buffer[1] = panel;	// panel number
	buffer[2] = line;	// line number

	data.copy(buffer, 3);

	this.write(buffer);
};

LedPanel.prototype.demo = function(){
	var buffer = new Buffer(32*3);
	buffer.fill(0x00);

	for(i = 0; i < buffer.length; i += 15){
		buffer[i+0] = 0xFF;
		buffer[i+1] = 0xFF;
		buffer[i+2] = 0xFF;

		buffer[i+3] = 0xFF;
		buffer[i+4] = 0x00;
		buffer[i+5] = 0x00;

		buffer[i+6] = 0x00;
		buffer[i+7] = 0xFF;
		buffer[i+8] = 0x00;

		buffer[i+9] = 0x00;
		buffer[i+10] = 0x00;
		buffer[i+11] = 0xFF;

		buffer[i+12] = 0x00;
		buffer[i+13] = 0x00;
		buffer[i+14] = 0x00;
	}

	for(i = 0; i < 32; i++){
		this.line(0, i, buffer);
	}
};

exports.LedPanel = LedPanel;
