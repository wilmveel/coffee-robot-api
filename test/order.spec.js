process.env.mode = 'TEST'
var assert = require('assert')
var request = require('supertest')
var server = require('../server')
describe('stack of orders', function(){




    it('should add an order to the stack', function(done){
        request(server.app)
            .post('/neworder')
            .send({name:'axel', type:'espresso'})
            .expect(200)
            .end(function(err, res){
                console.log('SERVER',server.stack[0])
                assert.equal(server.stack[0].name,'axel')
                assert.equal(server.stack[0].type, 'espresso')
                done()
            })


    })

    it('should take an order from the stack', function(done){
        server.stack.unshift({name:'willem', type:'macchiato'})
        request(server.app)
            .get('/takeorder')
            .expect('Content-Type', /json/)
            .expect(200)
            .end(function(err, res){
                console.log('BODY',res.body)
                var body = res.body
                assert.equal(body.name,'willem')
                assert.equal(body.type, 'macchiato')
                done()
            })
    })
})