var app= angular.module('starter.controllers', [])

.controller('usersCtrl', function($scope,DataService) {
	$scope.users = [];
	
	
	DataService.xgetUsers().then(function(response) {
		$scope.users = response;		
	});

	
})

.controller('starWarsFilmsCtrl', function($scope,DataService) {
	$scope.films = [];
	
		DataService.getFilms().then(function(res) {
		$scope.films = res;		
	});
	


 
  $scope.isSaving = false;
  
  $scope.save = function ($localstorage) {
        if ($scope.isSaving) {
            return;
        }
        $scope.isSaving = true;
        $localstorage.setObject('starwarsfilms', $scope.films);
        
    };    
  
	
})


.controller('filmTitleCtrl', function($scope,$stateParams,DataService) {
	$scope.film = {};
	
	DataService.getFilm($stateParams.id).then(function(res) {
		$scope.film = res;
	});
	
})

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true,
    frienshipStatus: "Disable Friends"
  };       
})

.controller('LoginCtrl', function($scope, LoginService, $ionicPopup, $state) {
    $scope.data = {};
 
    $scope.login = function() {
     
        LoginService.loginUser($scope.data.username, $scope.data.password).success(function(data) {
        	$scope.userId = 'MB';
        	$scope.userToken = '6YLullK4nqLjDHd2iqI2J9Pjpz07yaoWKg3cUWsEYsoi4ScdrdAjdXAGefJb5QEFcFRE5Sv7DMHIa9J2yajTy4WidOJDv8skOvHJ0OOAoVONnwKgNo4sDwlIkKdcBv9GQwfcsxwYhhdY0YrPbi1vTSr8c2r3o4WExfOvGqLytn48sRrdhxeEWkzzYjWxofhgdmC5n7rupMnN74YXPS1BvojmKTnYwZ4jKODGJYH9CynMGooFGYzVPCYTp768pF67';
            $state.go('tab.dash');
        }).error(function(data) {
            var alertPopup = $ionicPopup.alert({
                title: 'Login failed!',
                template: 'Please check your credentials!'
            });
        });
    }
})

.controller('TodoCtrl', function($scope, $location, dataManager) {
	var response = dataManager.getAll();
	        if (response.data != undefined && response.data.length > 0) {
                $scope.tasks = response.data;
            }
        });





/*

.controller('DashCtrl', function($scope) {
  
  var deploy = new Ionic.Deploy();
  
  // Update app code with new release from Ionic Deploy
  $scope.doUpdate = function() {
    deploy.update().then(function(res) {
      console.log('Ionic Deploy: Update Success! ', res);
    }, function(err) {
      console.log('Ionic Deploy: Update error! ', err);
    }, function(prog) {
      console.log('Ionic Deploy: Progress... ', prog);
    });
  };

  // Check Ionic Deploy for new code
  $scope.checkForUpdates = function() {
    console.log('Ionic Deploy: Checking for updates');
    deploy.check().then(function(hasUpdate) {
      console.log('Ionic Deploy: Update available: ' + hasUpdate);
      $scope.hasUpdate = hasUpdate;
    }, function(err) {
      console.error('Ionic Deploy: Unable to check for updates', err);
    });
  }

})

*/