angular.module('starter.services', [])

.factory('DataService', ['$http','$q',function($http,$q){

	return {
		getFilms:function() {
		var deferred = $q.defer();
			
			$http.get("http://swapi.co/api/films").then(function(res) {
					//console.dir(res.data.results);
					var results = res.data.results.map(function(result) {
						result.id = result.url;
						result.avatar = 'http://images4.fanpop.com/image/photos/18800000/Luke-Skywalker-luke-skywalker-18851547-529-768.jpg'
						return result;
					});
					deferred.resolve(res.data.results);
			});
			return deferred.promise;
	
		},
		
		getUsers:function($scope) {
		    // $http() returns a $promise that we can add handlers with .then()
		    return $http({
		        method: 'GET',
		        url: 'http://gk-online-api-uat.elasticbeanstalk.com/api/users/current',
		        headers: {'Authorization': 'Bearer 6YLullK4nqLjDHd2iqI2J9Pjpz07yaoWKg3cUWsEYsoi4ScdrdAjdXAGefJb5QEFcFRE5Sv7DMHIa9J2yajTy4WidOJDv8skOvHJ0OOAoVONnwKgNo4sDwlIkKdcBv9GQwfcsxwYhhdY0YrPbi1vTSr8c2r3o4WExfOvGqLytn48sRrdhxeEWkzzYjWxofhgdmC5n7rupMnN74YXPS1BvojmKTnYwZ4jKODGJYH9CynMGooFGYzVPCYTp768pF67'}
		     });	
		},
		
		getFilm:function(url) {
			var deferred = $q.defer();
			
			$http.get(url).then(function(res) {
			res.data.charactersCount = res.data.characters.length;
			//console.dir(res.data);
			deferred.resolve(res.data);
			});
			
			return deferred.promise;
			
			
			
		}	
	};

}])

.factory('$localstorage', ['$window', function($window) {
  return {
    set: function(key, value) {
      $window.localStorage[key] = value;
    },
    get: function(key, defaultValue) {
      return $window.localStorage[key] || defaultValue;
    },
    setObject: function(key, value) {
      $window.localStorage[key] = JSON.stringify(value);
    },
    getObject: function(key) {
      return JSON.parse($window.localStorage[key] || '{}');
    }
  };
}])

.service('dataManager', function ($http) {
    this.currentNewId = -1;
    this.selectedItem = null;

    this.getAll = function () {
        //return $http.get("/api/allitems"); 
        var jsondata = { 'data':
        		[
    				{ title: 'Ionic' },
    				{ title: 'Cordova' },
    				{ title: 'AngularJS' },
    				{ title: 'HTML5' },
    				{ title: 'CSS2' },
    				{ title: 'Adobe PhoneGap Build Service' },
    				{ title: 'JavaScript' }
  				]};
						
		return jsondata;
    };
   

    this.delete = function (id) {
        return $http.delete("/api/allitems/" + id);
    };
})


.service('dataManager', function ($http) {
    this.currentNewId = -1;
    this.selectedItem = null;

    this.getAll = function () {
        //return $http.get("/api/allitems"); 
        var jsondata = { 'data':
        		[
    				{ title: 'Ionic' },
    				{ title: 'Cordova' },
    				{ title: 'AngularJS' },
    				{ title: 'HTML5' },
    				{ title: 'CSS2' },
    				{ title: 'JavaScript' }
  				]};
						
		return jsondata;
    };
   

    this.delete = function (id) {
        return $http.delete("/api/allitems/" + id);
    };
})

.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'user' && pw == 'secret') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    };
})


.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'img/ben.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'img/max.png'
  }, {
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'img/adam.jpg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'img/perry.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'img/mike.png'
  }, {
    id: 5,
    name: 'Next time',
    lastText: 'This is the agenda for next time.',
    face: 'img/mike.png'
  }  
  ];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
});


