/**
 * http://usejsdoc.org/
 */
app.controller("AddNodeCtrl", [ '$scope', '$location', 'ivrNodesService',
		function($scope, $location, ivrNodesService) {
			console.log('Inside AddNodeCtrl');
			$scope.node = {};
			$scope.edges = [];
			$scope.addEdge = function()
			{
				$scope.edges.push({from: 0, to: 0, label: 1, arrows : 'to'});
			}
			$scope.cancel = function() {
				$location.path('/');
			};
			$scope.save = function() {
				var node = {
					id: $scope.node.nodeID,
					label: $scope.node.ivrNodeName,
					level: $scope.node.level
				};
				
				ivrNodesService.save(node, $scope.edges, function() {
					$location.path('/');
				});
			};
		} ]);