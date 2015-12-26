/**
 * http://usejsdoc.org/
 */
(function() {
	// var app = angular.module('ivrNodesService', []);
	var ivrNodesService = function($http) {
		var me = this;
		me.nodes = [ {
			id : 1,
			label : 'Node 1\n200',
			level : 0
		}, {
			id : 2,
			label : 'Node 2\n150',
			level : 1
		}, {
			id : 3,
			label : 'Node 3\n50',
			level : 1
		}, {
			id : 4,
			label : 'Node 4\n130',
			level : 2
		}, {
			id : 5,
			label : 'Node 5\n70',
			level : 2
		} ];
		me.edges = // new vis.DataSet([
		[ {
			from : 1,
			to : 3,
			arrows : 'to',
			label : '1',
			id: 1,
			color:{color:'red'}
		}, {
			from : 1,
			to : 2,
			arrows : 'to',
			label : '2',
			id: 2
		}, {
			from : 2,
			to : 4,
			arrows : 'to',
			label : '1',
			id: 3
		}, {
			from : 2,
			to : 5,
			arrows : 'to',
			label : '3',
			id: 4
		}, {
			from : 3,
			to : 5,
			arrows : 'to',
			label : '1',
			id: 5,
			color:{color:'red'}
		}, {
			from : 5,
			to : 2,
			arrows : 'to',
			label : '*',
			id: 6
		} ];
		this.getData = function(callback) {
			console.log('get data from stub');
			callback(me.nodes, me.edges);
		};
		this.getItem = function(nodeID, callback) {
			console.log('get item from stub');
			angular.forEach(me.nodes, function(item){
				if (item.id == nodeID)
					callback(item);
			})
		};
		this.save = function(node, edges, callback) {						
			if (node !== null)	{	
				//if (this.isExistsNode(node.id)) {
				//	this.removeNode(node.id);
				//}
				this.removeNode(node.id);
				me.nodes.push(node);
			}
			if (edges !== null) {
				me.edges = me.edges.concat(edges);
			}
			callback(true);
		};
		this.deleteEdge = function(edgeID, callback) {						
			if (edgeID === undefined) return false;
			var array = me.edges; 
			var res = false;
			for(var i = array.length-1; i--;){
				if (array[i].id.toString() === edgeID.toString()) { 
					array.splice(i, 1);
					res = true;
				}
			}
			callback(res);
		};
		
		//helper function to manipulate with node and edge array
		this.isExistsNode = function(nodeID) {
			var isexists = false;
			angular.forEach(me.nodes, function(item){
				if (item.id == nodeID) {
					isexists = true;
				}
			});
			return isexists;
		};
		this.removeNode = function(nodeID) {
			var array = me.nodes;
			for(var i = array.length-1; i--;){
				if (array[i].id === nodeID) { 
					array.splice(i, 1);
					return true;
				}
			}
			return false;
		};
	};
	app.service('ivrNodesService', ivrNodesService);
}());