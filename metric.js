var request = require("request");


function getMetrics(opt,callback)
{
	request.get({
    url: "http://host:port/metrics?type="+opt,
    timeout: 3000
	}, function (err, res, body) {
   		console.log(body);
   		callback(err,body);
	});
}

function light(opt,callback)
{
	request.put({
     url: "http://host:port/light?opt="+opt,
    timeout: 3000
	}, function (err, res, body) {
   		console.log(body);
   		callback(err,body);
	});
}

function camera(opt,callback)
{
	request.put({
     url: "http://host:/camera?opt="+opt,
    timeout: 3000
	}, function (err, res, body) {
   		console.log(body);
   		callback(err,body);
	});
}


function getMetricData(opt,cb)
{
	getMetrics(opt,function( err,body){
	if(err)
		cb("Unable to fetch metric  data");
	else
	{
		var data = JSON.parse(body);
		cb("Temperature is "+ data.temperature +" Degrees ..."+" Humidity  is "+ data.humidity +" Percent..."+
		  	"Light Intensity is "+data.lightintensity +" illuminance..." +
			 "Sound Intensity is "+data.soundIntensity +" decibels..." 	  	);
	}
	})
}

function lightOpt(message,cb)
{
	light(message,function( err,body){
	if(err)
		cb("Unable to perform operation");
	else
	{
		cb(body);
	}
	})
}

function cameraOpt(message,cb)
{
	camera(message,function( err,body){
	if(err)
		cb("Unable to perform operation");
	else
	{
		cb(body);
	}
	})
}

exports.getMetricData = getMetricData;
exports.lightOpt = lightOpt;
exports.cameraOpt = cameraOpt;
