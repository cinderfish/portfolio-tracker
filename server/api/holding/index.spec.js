'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var holdingCtrlStub = {
  index: 'holdingCtrl.index',
  show: 'holdingCtrl.show',
  create: 'holdingCtrl.create',
  update: 'holdingCtrl.update',
  destroy: 'holdingCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var holdingIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './holding.controller': holdingCtrlStub
});

describe('Holding API Router:', function() {

  it('should return an express router instance', function() {
    expect(holdingIndex).to.equal(routerStub);
  });

  describe('GET /api/holdings', function() {

    it('should route to holding.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'holdingCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/holdings/:id', function() {

    it('should route to holding.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'holdingCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/holdings', function() {

    it('should route to holding.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'holdingCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/holdings/:id', function() {

    it('should route to holding.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'holdingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/holdings/:id', function() {

    it('should route to holding.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'holdingCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/holdings/:id', function() {

    it('should route to holding.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'holdingCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
