app.controller("MainController", [ '$scope', '$window', '$location',
		'ivrNodesService',
		function($scope, $window, $location, ivrNodesService) {
			// create an array with nodes
			// javascript helper vis functions
			console.log('Inside MainController');
			$scope.selectedNodeID = 0;
			$scope.selectedNode = {};
			$scope.$watch('selectedNodeID', function(){
				ivrNodesService.getItem($scope.selectedNodeID, function(node){
					$scope.selectedNode = node;	
				})
				
			})
			$scope.$watch('toNodeID', function(){
				var edge = {from: $scope.fromNodeID, to: $scope.toNodeID, arrows : 'to', id: $window.newEdgeID}
				ivrNodesService.save(null, edge, function() {
					$scope.show();
				});
			})
			$scope.$watch('deleteEdgeID', function(){				
				ivrNodesService.deleteEdge($scope.deleteEdgeID, function() {
					$scope.deleteEdgeID = undefined;
					$scope.show();
				});
			})
			$scope.redrawChart = function() {
				$window.nodes = $scope.nodes;
				$window.edges = $scope.edges;
				$window.destroy();
				$window.draw();
			};
			// init section
			$scope.show = function() {
				console.log('Inside show');
				ivrNodesService.getData(function(nodes, edges) {
					$scope.nodes = nodes;
					$scope.edges = edges;
					$scope.redrawChart();
				});
			};
			$scope.saveNewNode = function() {
				console.log('Inside saveNewNode');
				var node = {
					id: $scope.selectedNode.id,
					label: $scope.selectedNode.label,
					level: $scope.selectedNode.level
				};
				ivrNodesService.save(node, null, function() {
					$scope.show();
				});
			};
			$scope.cancel = function() {
				$location.path('/');
			};
			// stub function will be replaced by call to view
			$scope.addNode = function() {
				console.log('redirect to /addNode');
				$location.path('/addNode');
			};
		} ]);
