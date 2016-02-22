var app = angular.module('AssetApp', ['ngRoute', 'angular-datepicker']);

app.config(function($routeProvider) {
    $routeProvider
        .when('', { templateUrl: '/templates/list.html', controller: 'listController' })
        .when('/', { templateUrl: '/templates/list.html', controller: 'listController' })
        .when('/add', { templateUrl: 'templates/details.html', controller: 'detailsController' })
        .when('/edit', { templateUrl: 'templates/details.html', controller: 'detailsController' })
        .when('/delete', { templateUrl: 'templates/list.html', controller: 'listController' });
});

app.controller('listController', function ($scope, $location, assetManager) {
    var getAll = function () {
        assetManager.getAll().then(function (response) {
            if (response.data != undefined && response.data.length > 0) {
                $scope.assets = response.data;
            }
        });
    };

    var init = function () {
        getAll();
    };

    init();

    $scope.assets = [];

    $scope.selectAsset = function (assetId) {
        if (assetId == 0) {
            assetManager.selectedAsset = { id: 0, name: '', description: '', location: '', keeper: '', assetvalue: 0 };
            $location.path('/add');
            return;
        }

        for (var i = 0; i < $scope.assets.length; i++) {
            if ($scope.assets[i].id == assetId) {
                assetManager.selectedAsset = $scope.assets[i];
                $location.path('/edit');
                return;
            }
        }
    };


    $scope.assetsValue = function ()
    {
        var total = 0;
        for (count = 0; count < $scope.assets.length; count++)
        {
            total += $scope.assets[count].assetvalue;
        }
        return total.toFixed(2)
    }


    $scope.addAssetTitle = function ()
    {

        return "Add Asset"
    }

    $scope.listFilter = function ()
    {
        return "Assets"
    }

    $scope.delete = function(assetId) {
        assetManager.delete(assetId).then(function() {
            $location.path('/');
            getAll();
        });
    };
});

app.controller('detailsController', function ($scope, $location, assetManager) {
    $scope.id = assetManager.selectedAsset.id;
    $scope.name = assetManager.selectedAsset.name;
    $scope.description = assetManager.selectedAsset.description;
    $scope.location = assetManager.selectedAsset.location;
    $scope.keeper = assetManager.selectedAsset.keeper;
    $scope.assetvalue = assetManager.selectedAsset.assetvalue;

    $scope.isSaving = false;
    $scope.save = function () {
        if ($scope.isSaving) {
            return;
        }
        $scope.isSaving = true;
        assetManager.save($scope.id, $scope.name, $scope.description, $scope.location, $scope.keeper, $scope.assetvalue).then(function () {
            $location.path('/');
        });
    };    

   
    // somewhere in your controller
    $scope.options = {
        format: 'dd-mm-yyyy', // british formatted date
        selectYears: true,
        selectMonths: true,
        autoclose: true,
        todayHighlight: true,
        closeOnSelect: true
                /*
        onClose: function (e)
        {
            // do something when the picker closes   
        }
        */
    }
    

    $scope.cancel = function () {
        $location.path('/');
    };
});

app.service('assetManager', function ($http) {
    this.currentNewId = -1;
    this.selectedAsset = null;

    this.getAll = function () {
        return $http.get("/api/assets");
    };

    this.save = function(id, name, desc, location, keeper, assetvalue) {
        if (id == 0) {
            return $http.post("/api/assets", {
                name: name,
                description: desc,
                location: location,
                keeper: keeper,
                assetvalue: assetvalue
            });
        } else {
            return $http.put("/api/assets/"+id, {
                name: name,
                description: desc,
                location: location,
                keeper: keeper,
                assetvalue: assetvalue
            });
        }
    }

    this.delete = function (id) {
        return $http.delete("/api/assets/" + id);
    };
});

function round(value, decimals)
{
    return Number(Math.round(value + 'e' + decimals) + 'e-' + decimals);
}
