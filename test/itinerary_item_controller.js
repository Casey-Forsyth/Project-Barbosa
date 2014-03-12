//requires
var should = require('should');
var ItineraryItem = require('../models/ItineraryItem').model;
var Trip = require('../models/Trip');
var app = require('../app.js');
var request = require('supertest');

describe('ItineraryItem Controller', function(){
  describe('POST /items', function() {
    it('should respond with json', function(done) {
      trip = new Trip()
      trip.save(function(){
        item = new ItineraryItem({name: 'tripname'});

        request(app)
          .post('/items')
          .send({item:item, trip_id:trip.id})
          .expect(200, done);
        })
      })

    it('should create a new trip item', function(done){
      item = new ItineraryItem({title: 'foobar'})
      trip = new Trip()
      trip.save(function(){
        request(app)
          .post('/items')
          .send({item: item, trip_id: trip.id})
          .end(function(err, res){
            res.should.have.status(200)
            res.body.should.have.property('item')
            res.body.item.should.have.property('title', 'foobar')

            ItineraryItem.findById(item.id).exec(function(err, item){
              (item == null).should.be.false
              item.title.should.eql('foobar')
            })
            done()
          })
      })
    })
  });

  describe('GET /items', function() {
    describe('with ids[] specified', function(){
      it('should get the items specified', function(done) {
        itemName = 'the item of awesome'
        item = new ItineraryItem({title: itemName});
        item.save(function(){
          request(app)
            .get('/items?ids[]=' + item.id)
            .end(function(err, res){
              (err == null).should.be.true
              res.should.have.status(200)
              res.body.should.have.property('items')
              res.body.items.should.have.lengthOf(1)
              res.body.items[0].should.have.property('title', itemName)
              done()
            })
        })
      })
    })

    describe('without ids[] specified', function(){
      it('should get all items', function(done){
        request(app)
          .get('/items')
          .end(function(err, res){
            (err == null).should.be.true
            res.should.have.status(200)
            res.body.should.have.property('items')
            res.body.items.length.should.be.above(1)
            done()
          })
      })
    })
  })
})