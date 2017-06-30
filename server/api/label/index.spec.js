'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var labelCtrlStub = {
  index: 'labelCtrl.index',
  show: 'labelCtrl.show',
  create: 'labelCtrl.create',
  update: 'labelCtrl.update',
  destroy: 'labelCtrl.destroy'
};

var routerStub = {
  get: sinon.spy(),
  put: sinon.spy(),
  patch: sinon.spy(),
  post: sinon.spy(),
  delete: sinon.spy()
};

// require the index with our stubbed out modules
var labelIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './label.controller': labelCtrlStub
});

describe('Label API Router:', function() {

  it('should return an express router instance', function() {
    expect(labelIndex).to.equal(routerStub);
  });

  describe('GET /api/labels', function() {

    it('should route to label.controller.index', function() {
      expect(routerStub.get
        .withArgs('/', 'labelCtrl.index')
        ).to.have.been.calledOnce;
    });

  });

  describe('GET /api/labels/:id', function() {

    it('should route to label.controller.show', function() {
      expect(routerStub.get
        .withArgs('/:id', 'labelCtrl.show')
        ).to.have.been.calledOnce;
    });

  });

  describe('POST /api/labels', function() {

    it('should route to label.controller.create', function() {
      expect(routerStub.post
        .withArgs('/', 'labelCtrl.create')
        ).to.have.been.calledOnce;
    });

  });

  describe('PUT /api/labels/:id', function() {

    it('should route to label.controller.update', function() {
      expect(routerStub.put
        .withArgs('/:id', 'labelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('PATCH /api/labels/:id', function() {

    it('should route to label.controller.update', function() {
      expect(routerStub.patch
        .withArgs('/:id', 'labelCtrl.update')
        ).to.have.been.calledOnce;
    });

  });

  describe('DELETE /api/labels/:id', function() {

    it('should route to label.controller.destroy', function() {
      expect(routerStub.delete
        .withArgs('/:id', 'labelCtrl.destroy')
        ).to.have.been.calledOnce;
    });

  });

});
