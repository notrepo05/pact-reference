'use strict'

const expect = require('chai').expect
const path = require('path')
const Pact = require('@pact-foundation/pact').Pact
const getMeDogs = require('../index').getMeDogs

describe('The Dog API', () => {
  let url = 'http://localhost'
  const port = 8989

  const provider = new Pact({
    port: port,
    log: path.resolve(process.cwd(), 'logs', 'mockserver-integration.log'),
    dir: path.resolve(process.cwd(), 'pacts'),
    spec: 2,
    consumer: 'MyConsumer',
    provider: 'MyProvider',
    pactfileWriteMode: 'merge'
  })

  const EXPECTED_BODY = [{
      dog: 1
    },
    {
      dog: 2
    }
  ]

  before(() => provider.setup())

  after(() => provider.finalize())

  describe('get /dogs', () => {
    before(done => {
      const interaction = {
        state: 'i have a list of dogs',
        uponReceiving: 'a request for all dogs',
        withRequest: {
          method: 'GET',
          path: '/dogs',
          headers: {
            'Accept': 'application/json'
          }
        },
        willRespondWith: {
          status: 200,
          headers: {
            'Content-Type': 'application/json'
          },
          body: EXPECTED_BODY
        }
      }
      provider.addInteraction(interaction).then(() => {
        done()
      })
    })


    it('returns the correct response', done => {
      const urlAndPort = {
        url: url,
        port: port
      }
      getMeDogs(urlAndPort)
        .then(response => {
          expect(response.data).to.eql(EXPECTED_BODY)
          done()
        }, done)
    })

    // verify with Pact, and reset expectations
    afterEach(() => provider.verify())
  })
})
