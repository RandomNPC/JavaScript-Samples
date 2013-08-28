/*
	This sample is the basics of making a server that can respond
		to a client.

	Run this server by entering into the terminal:
		node Hi

	You will see nothing until a client connects, so open a web
		browser & connect yourself.  Type in the address bar:
			localhost
		then press enter.

	You will see Ohaider on the web page & a message in the
		terminal.  If not, scroll to the bottom to read the note.
*/

var http=require('http');

var app=http.createServer(function(request, response) {
	console.log('A client has connected!')

	// Craft an HTTP packet
	response.writeHead(200, { 'Content-Type': 'text/plain' });
	response.write('Ohaider');
	response.end(); // Send it
});

app.listen(80); // Default port for HTTP

/*
	If your web browser gave an error, change the listening port
		to a larger number [between 1000-65535] like 1234.  The
		line should read something like:
			app.listen(1234);

	Restart the server by pressing Ctrl+C twice, then retyping
		the command to start the server.

	In the web browser address, type something like:
		localhost:1234
*/