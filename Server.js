/*
*/

var express=require('express');
var app=express();

app.use(express.static(__dirname+'/root'));



app.listen(80);