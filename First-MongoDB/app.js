var dburl = 'localhost/mylittlepony';
var collections = ['pony'];
var db = require('mongojs').connect(dburl,collections);

function pony(name,type,color){
	this.name = name;
	this.type = type;
	this.color = color;
}

var firstpony = new pony("AppleJack","Engineer","Yellow");

db.pony.save(firstpony, function(err,savedPony){
	if(err || !savedPony) console.log("Error! " + err);
	else console.log("Pony saved!");
});

db.pony.find(firstpony,function(err,pony){
	pony.forEach(function(ponys){
		console.log(ponys.name);
		console.log(ponys.type);
		console.log(ponys.color);
	});
});