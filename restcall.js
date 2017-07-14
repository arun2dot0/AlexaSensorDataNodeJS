var http = require('http');

var optionsget = {
    host : 'host', // here only the domain name
    // (no http/https !)
    port : 8080,
    path : '/metrics', // the rest of the url with parameters if needed
    method : 'GET' // do GET
};

function getMetrics(callback)
{
	// do the GET request
	var reqGet = http.request(optionsget, function(res) {
	    console.log("statusCode: ", res.statusCode);
	    res.on('data', function(d) {
	        console.info('GET result:\n');
	        process.stdout.write(d);
	        var output = JSON.parse(d);
	        console.info(' temp '+ output.temperature);
	        console.info('\n\nCall completed');
	        callback(output,null);
	    });

	});
	reqGet.setTimeout(300,function(){
		console.info('timeout occured');
		callback(null,'timeout');
	});
	reqGet.end();
	reqGet.on('error', function(e) {
		console.info('error  occured');

	    console.error(e);
	    callback(null,e);
	});
}

function getMetricaData(cb)
{
	getMetrics( function(data,error){
	 if(error)
	 	cb("Error getting temperature");
	 if(data)
	 {
	  console.log(data.temperature + " Degrees");
       cb(data.temperature + " Degrees");
      }
	});
}
