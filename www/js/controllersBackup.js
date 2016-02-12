var app= angular.module('starter.controllers', [])

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

.controller('TodoCtrl', function($scope, $location, dataManager) {
        assetManager.getAll().then(function (response) {
            if (response.data != undefined && response.data.length > 0) {
                $scope.assets = response.data;
            }
        });

});

angular
   .module('myApp', ['ngMockE2E'])
   .run(['$httpBackend', function($httpBackend) {
      $httpBackend
        .whenGET(/^partials\/.+/)
        .passThrough();
      $httpBackend
        .whenGET(/^\/myapp\/items\/.+/)
        .respond(
        	{ 'data':
        		[
    				{ title: 'Collect coins' },
    				{ title: 'Eat mushrooms' },
    				{ title: 'Get high enough to grab the flag' },
    				{ title: 'Get getkeeper app running' },
    				{ title: 'Find the Princess' }
  				]}
        	);
}]);


app.service('dataManager', function ($http) {
    this.currentNewId = -1;
    this.selectedItem = null;

    this.getAll = function () {
        //return $http.get("/api/allitems"); 
        var jsondata = { 'data':
        		[
    				{ title: 'Collect coins' },
    				{ title: 'Eat mushrooms' },
    				{ title: 'Get high enough to grab the flag' },
    				{ title: 'Get getkeeper app running' },
    				{ title: 'Find the Princess' }
  				]};
		return jsondata;
    };

    this.delete = function (id) {
        return $http.delete("/api/allitems/" + id);
    };
});



