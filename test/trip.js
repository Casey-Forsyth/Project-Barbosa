//requires
var assert = require("assert");
var express = require('express');
var app = require('../app.js');
var request = require('supertest');

describe('GET /trips/:badid', function(){

	it('should return json with a 500 error', function(done){
		request(app)
			.get('/trips/:badid')
			.expect('Content-Type', /json/)
			.expect(500, done);
	})
})

describe('POST /trips', function(){	

	it('should respond with json', function(done){
		request(app)
			.post('/trips')
			.send({"Trip":{"test": "TESTTRIP"}})
			.set('Accept','application/json')
			.expect('Content-Type', /json/)
			.expect(200, done);
	})
});
