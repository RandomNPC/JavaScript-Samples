/*
	I will disect the parts of this server.

	The require('http') line assigns an HTTP object we can use.
		The method we use is "createServer(func)", where "func"
		is a function with 2 parameters

	A cleaner view of this:
		f=function(a, b)
		http.createServer(f)

	That method takes a function as a parameter, so I can define
		a function right inside the parameter list.
*/

var http=require('http');

var app=http.createServer(

	// Define a function with 2 parameters
	function(request, response) {
		var answer=9*6; // Do work?

		// Make an HTTP packet & send to the client.
		response.writeHead(200, { 'Content-Type': 'text/plain' });
		response.write('9*6='+answer);
		response.end();

		// Write to the terminal
		console.log('Denied client the meaning of life.');
	}

);

app.listen(80);