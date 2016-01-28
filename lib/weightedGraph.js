var _ = require('lodash');
var g = {};
module.exports = g;




var findAllEdgeFromBVertex = function(source,allEdges){
	return allEdges.filter(function(edge){
		return edge.from == source;
	})
};
var updateDistance = function(parents,distance,edges){
	for (var i = 0; i < edges.length; i++) {
		var edge = edges[i];
		var newDistance = distance[edge.from] + edge.weight;
		if(distance[edge.to] > newDistance){
			distance[edge.to] = newDistance;
			parents[edge.to] = edge.from;
		}
	};
}
g.WeightedGraph = function(){
	this.edges = {};
}
g.WeightedGraph.prototype = {
	addVertex :function(vertex){
		this.edges[vertex] = [];
	},
	addEdge : function(edge){
		this.edges[edge.from].push(edge);
	},
	shortestPath : function(from,to){	
		var vertices = Object.keys(this.edges);
		var distance = {},parents = {},path = [];
		var allEdges = [];
		var allEdgesFromSource;
		for (var i = 0; i < vertices.length; i++) {
			distance[vertices[i]] = (vertices[i] == from)? 0 : Infinity;
			parents[vertices[i]] = (vertices[i] == from)? vertices[i] : null ;
			allEdges = allEdges.concat(this.edges[vertices[i]])
		};
		for (var i = 0; i < vertices.length; i++) {
			allEdgesFromSource =findAllEdgeFromBVertex(vertices[i],allEdges);
			updateDistance(parents,distance,allEdgesFromSource);
		};
		var visitedParent = to;
		while(visitedParent != from){
			var edge = _.find(allEdges,{from:parents[visitedParent],to:visitedParent})
			path.push(edge);
			visitedParent = parents[visitedParent];
		}
		return path.reverse();
	}
}

g.Edge = function(name,from,to,weight){
	this.name = name;
	this.from = from;
	this.to = to;
	this.weight = weight;
}