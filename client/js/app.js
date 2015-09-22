angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function(reps) {
    var main = this;
    main.reps = [];
    main.radio = {
      allRepSen: 'allTrue',
      reps: 'repsLastTrue',
      sens: 'sensLastTrue'
    };
    var allRadio = ( main.radio.allRepSen == 'allTrue' ? true : false ),
        senRadio = ( main.radio.allRepSen == 'sensTrue' ? true : false ),
        repRadio = ( main.radio.allRepSen == 'repsTrue' ? true : false );

    main.searchByZip = function(zip) {
      reps.allByZip(zip).then(function (data) {
        main.reps = data;
      });
    };
    main.searchByLast = function(last) {
      if (main.radio.reps == 'repsLastTrue' && main.radio.allRepSen == 'repsTrue') {
        reps.repsByLast(last).then(function (data) {
          main.reps = data;
        });
      }
      else if (main.radio.sens == 'sensLastTrue' && main.radio.allRepSen == 'sensTrue') {
        reps.sensByLast(last).then(function (data) {
          main.reps = data;
        });
      }
      else {}
    };
    main.searchByState = function(state) {
      if (main.radio.reps == 'repsStateTrue' && main.radio.allRepSen == 'repsTrue') {
        reps.repsByState(state).then(function (data) {
          main.reps = data;
        });
      }
      else if (main.radio.sens == 'sensStateTrue' && main.radio.allRepSen == 'sensTrue') {
        reps.sensByState(state).then(function (data) {
          main.reps = data;
        });
      }
      else {}
    };
  });

  angular
    .module('repsService', [])
    .factory('reps', function($http) {
      var host = ('http://dgm-representatives.herokuapp.com')
      return {
        allByZip: function (zip) {
          return $http
            .get(host + '/all/by-zip/' + zip)
            .then(function (response) {
              return response.data;
            });
        },
        repsByLast: function (last) {
          return $http
            .get(host + '/reps/by-name/' + last)
            .then(function (response) {
              return response.data;
            });
        },
        sensByLast: function (last) {
          return $http
            .get(host + '/sens/by-name/' + last)
            .then(function (response) {
              return response.data;
            });
        },
        repsByState: function (state) {
          return $http
            .get(host + '/reps/by-state/' + state)
            .then(function (response) {
              return response.data;
            });
        },
        sensByState: function (state) {
          return $http
            .get(host + '/sens/by-state/' + state)
            .then(function (response) {
              return response.data;
            });
        }
      }
    });
