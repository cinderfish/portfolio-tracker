'use strict';

(function() {

  class MainController {

    constructor($http, $scope, socket, Auth) {

      this.$http = $http;
      this.socket = socket;
      this.awesomeThings = [];

      $scope.$on('$destroy', function() {
        socket.unsyncUpdates('user');
      });

      Auth.getCurrentUser().$promise.then(user => {
        this.user = user;
        // console.log(`save:${this.user._id}`);
        // console.log(this.socket.io);
        // this.socket.io.on('user:save', function(item) {
          // console.log('Saved', item);
        // });
        // this.socket.io.on('user:save', (user) => {
          // console.log('test');
          // console.log(user);
        // });
        // this.socket.syncUpdates('user', this.user, );
      });
    }

    $onInit() {
      this.$http.get('/api/things')
        .then(response => {
          this.awesomeThings = response.data;
          this.socket.syncUpdates('thing', this.awesomeThings);
        });
    }

    addThing() {
      if (this.newThing) {
        this.$http.post('/api/things', {
          name: this.newThing
        });
        this.newThing = '';
      }
    }

    deleteThing(thing) {
      this.$http.delete('/api/things/' + thing._id);
    }
  }

  angular.module('portfolioTrackerApp')
    .component('main', {
      templateUrl: 'app/main/main.html',
      controller: MainController
    });
})();
