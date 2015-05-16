'use strict';
 /*jshint newcap:false*/

// Clientes controller
// angular.module('clientes', ['ngTable']).controller('ClientesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clientes', 'ngTableParams', 
// 	function ($scope, $stateParams, $location, Global, Cars, ngTableParams)

angular.module('clientes').controller('ClientesController', ['$scope', '$stateParams', '$location', 'Authentication', 'Clientes', 'ngTableParams',	
	function($scope, $stateParams, $location, Authentication, Clientes, ngTableParams) {
		$scope.authentication = Authentication;

		var params = {
			page: 1, //muestra la primera pagina
			count: 8, //regsitros por pagina
		};

		var settings = {
			total: 0, //tamalo de datos
			getData: function($defer, params) {


				Clientes.get(params.url(), function(response){
					params.total(response.total);
					$defer.resolve(response.results);
				});
			} 

		};

		$scope.tableParams = new ngTableParams(params, settings);
		
		
		

		// Create new Cliente
		$scope.create = function() {
			// Create new Cliente object
			var cliente = new Clientes ({
				name: this.name,
				boleta: this.boleta,
				carrera: this.carrera,
				promedio: this.promedio
			});

			// Redirect after save
			cliente.$save(function(response) {
				$location.path('clientes/' + response._id);

				// Clear form fields
				$scope.name = '';
				$scope.boleta = '';
				$scope.carrera = '';
				$scope.promedio = '';
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Remove existing Cliente
		$scope.remove = function(cliente) {
			if ( cliente ) { 
				cliente.$remove();

				for (var i in $scope.clientes) {
					if ($scope.clientes [i] === cliente) {
						$scope.clientes.splice(i, 1);
					}
				}
			} else {
				$scope.cliente.$remove(function() {
					$location.path('clientes');
				});
			}
		};

		// Update existing Cliente
		$scope.update = function() {
			var cliente = $scope.cliente;

			cliente.$update(function() {
				$location.path('clientes/' + cliente._id);
			}, function(errorResponse) {
				$scope.error = errorResponse.data.message;
			});
		};

		// Find a list of Clientes
		$scope.find = function() {
			$scope.clientes = Clientes.query();
		};

		// Find existing Cliente
		$scope.findOne = function() {
			$scope.cliente = Clientes.get({ 
				clienteId: $stateParams.clienteId
			});
		};


	}
]);