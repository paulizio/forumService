const chai = require('chai')
const sinonChai = require('sinon-chai')
const sinon = require('sinon')
chai.use(sinonChai)

global.sinon = sinon
global.expect = chai.expect
