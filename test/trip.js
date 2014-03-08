//requires
var express = require('express');
var app = require('../app.js');
var request = require('supertest');
var Trip = require('../models/Trip');

describe('Trip Model', function(){
  it('should have a name', function(){
    n1 = 'MEXICO!!!'
    n2 = 'CUBA!!!!!'
    t = new Trip({name: n2})
    t.should.have.property('name', n2)
    t.name = n2
    t.should.have.property('name', n2)
  })

  it('should have a default `name` of "My Trip"', function(){
    t = new Trip()
    t.should.have.property('name', 'My Trip')
  })

  it('should have a default `archived` flag of false', function(){
    t = new Trip()
    t.should.have.property('archived', false)
  })
})