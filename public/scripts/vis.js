var network = null;
var newEdgeID;

function destroy() {
	if (network !== null) {
		network.destroy();
		network = null;
	}
	document.getElementById('network-popUp').style.display = 'none';
};
function draw() {
	// create a network
	var container = document.getElementById('mynetwork');

	// provide the data in the vis format
	var data = {
		nodes: window.nodes,
		edges: window.edges
	};
	var options = {
		edges: {
			smooth: {
				type:'cubicBezier',
				forceDirection: 'vertical',
				roundness: 0.4
			}
		},
		layout: {
			hierarchical:{
				direction: 'RL',
				//sortMethod: 'directed'
			}
		},
		manipulation: {
			addNode: function (data, callback) {
				// filling in the popup DOM elements
				//document.getElementById('operation').innerHTML = "Add Node";
				//document.getElementById('node-id').value = data.id;
				//document.getElementById('node-label').value = data.label;
				//document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
				//document.getElementById('cancelButton').onclick = clearPopUp.bind();
				document.getElementById('network-popUp').style.display = 'block';
			},
			editNode: function (data, callback) {
				// filling in the popup DOM elements
				//document.getElementById('operation').innerHTML = "Edit Node";
				//document.getElementById('node-id').value = data.id;
				//document.getElementById('node-label').value = data.label;
				//document.getElementById('saveButton').onclick = saveData.bind(this, data, callback);
				//document.getElementById('cancelButton').onclick = cancelEdit.bind(this,callback);
				document.getElementById('network-popUp').style.display = 'block';
			},
			addEdge: function (data, callback) {
				if (data.from == data.to) {
				  var r = confirm("Do you want to connect the node to itself?");
				  if (r == true) {
					callback(data);
				  }
				}
				else {
				  callback(data);
				}
				var input = $('#fromNodeID');
		        input.val(data.from);
		        input.trigger('input');
				var input = $('#toNodeID');
		        input.val(data.to);
				newEdgeID = data.id;
		        input.trigger('input');
			},
			deleteEdge: function(data, callback) {
				var input = $('#deleteEdgeID');
		        input.val(data.edges[0]);
		        input.trigger('input');
				document.getElementById('eventSpan').innerHTML = '<h2>Delete edge event:</h2>' + JSON.stringify(data, null, 4);
			}
		}			
	}
	// initialize your network!
	var network = new vis.Network(container, data, options);	
	
	//set event handlers
	network.on("click", function (params) {
        params.event = "[original event]";
        document.getElementById('eventSpan').innerHTML = '<h2>Click event:</h2>' + JSON.stringify(params, null, 4);
        //workaround for set model value
        var input = $('#selectedNodeID');
        input.val(params.nodes[0]);
        input.trigger('input');
    });
};