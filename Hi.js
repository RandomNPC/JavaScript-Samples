/*
	This sample is a bit different.  You will have to type in
		your terminal:
			npm install express

	That will install a module called express, which gives
		the web server a bit more features.

	After installing, change the "http" module to "express",
		as seen below.
*/

//var http=require('http');     // Old one
var express=require('express'); // Lets rename the variable as well, for consistency

//var app=http.createServer(function(request, response) {}; // Old one
var app=express(); // Express doesnt use the createServer function anymore



/*
	This is new.  This sets the directory people have access to.
		If you are serving people, you will want to create a
		public directory for the stuff &
		change the following line like this:
			app.use(express.static(__dirname+'/public folder'));
*/
app.use(express.static(__dirname));


/*
			"/"
	Programically linking clients to the pages that exist
	Go visit the web page.
*/
app.get('/', function(request, response) {
	var str=
		'<a href="/test">Coded Page</a><br>'+
		'<a href="/Moon.png">Image File</a>';

	response.send(str);
	console.log('Home page');
});

/*
			"/test"
	Another programically generated page.
*/
app.get('/test', function(request, response) {
	var answer=9*6;
	response.send('9*6='+answer);
	console.log('Testing');
});

/*
			"/Moon.png"
	Theres a file in this folder called "Moon.png"
		If the user connects to the address of the image, the server
		will return the image, which is differet than the previous
		code generated pages.
*/



app.listen(80);