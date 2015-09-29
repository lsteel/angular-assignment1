angular.module('RepsApp', [
  'RepsAppControllers'
]);

angular
  .module('RepsAppControllers', [
    'repsService'
  ])
  .controller('MainCtrl', function (reps) {
    var main = this;
    main.loading = false;
    main.done = false;
    main.reps = [];
    main.congressType = 'reps';

    main.loading = false;

    main.apis = [
      {
        label: 'Zip',
        method: function (zip) {
          main.loading = true;
          reps('all', 'zip', zip).then(function (data) {
            main.loading = false;
            main.done = true;
            main.reps = data;
          });
        }
      },
      {
        label: 'Last Name',
        method: function (name) {
          main.loading = true;
          reps(main.congressType, 'name', name).then(function (data) {
            main.loading = false;
            main.done = true;
            main.reps = data;
          });
        }
      },
      {
        label: 'State',
        method: function (state) {
          main.loading = true;
          reps(main.congressType, 'state', state).then(function (data) {
            main.loading = false;
            main.done = true;
            main.reps = data;
          });
        }
      }
    ];

    main.criteria = main.apis[0];
  });

angular
  .module('repsService', [])
  .factory('reps', function ($http) {
    var host = 'http://dgm-representatives.herokuapp.com';

    /**
     * @function search
     * @param {String} type - can be "all", "reps", "sens"
     * @param {String} criteria - can by "zip", "name", "state"
     * @param {String} query - can any string
     */
    return function search(type, criteria, query) {
      return $http
        .get(host + '/' + type + '/by-' + criteria + '/' + query)
        .then(function (response) {
          return response.data;
        });
    }
  });
