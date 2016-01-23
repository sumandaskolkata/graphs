var graph = {};

graph.DirectedGraph = function(){
  this.edges = {};
};
graph.DirectedGraph.prototype = {
  addVertex : function(vertex){
    this.edges[vertex] = [];
  },
  addEdge : function(from,to){
      this.edges[from] = this.edges[from].concat(to);
  },
  hasEdgeBetween:function(from,to){
      for (var i = 0; i < this.edges[from].length; i++) {
        if(this.edges[from][i] == to)
          return true;
      }
      return false;
  },
  order:function(){
    return Object.keys(this.edges).length;
  },
  size:function(){
    var vertices = Object.keys(this.edges);
    var size = 0,edges = this.edges;
    vertices.forEach(function(vertex){
      size+=edges[vertex].length;
    })
    return size;
  },
  pathBetween :function(from,to,visited){
    var edges = this.edges;
    visited = visited || [];
    visited = visited.concat(from);
    var vertices = edges[from];
    if(from == to)
      return visited;
    for (var vertex in vertices){
      if(vertices[vertex] == to){
        return visited.concat(vertices[vertex]);
      }
    }
    if(vertices.length>0){
      for (var vertex in vertices){
        visited = this.pathBetween(vertices[vertex],to,visited);
      }
        return visited;
    }
    else{
      visited.pop();
      return visited;
    }
    return [];
  }
}

graph.UndirectedGraph = function(){
  this.edges = {};
};
graph.UndirectedGraph.prototype = {
  addVertex : function(vertex){
    this.edges[vertex] = [];
  },
  addEdge : function(from,to){
      this.edges[from] = this.edges[from].concat(to);
      this.edges[to] = this.edges[from].concat(from);
  },
  hasEdgeBetween:function(from,to){
      for (var i = 0; i < this.edges[from].length; i++) {
        if(this.edges[from][i] == to)
          return true;
      }
      return false;
  },
  order:function(){
    return Object.keys(this.edges).length;
  },
  size:function(){
    var vertices = Object.keys(this.edges);
    var size = 0,edges = this.edges;
    vertices.forEach(function(vertex){
      size+=edges[vertex].length;
    })
    console.log(size)
    return size;
  }
}


module.exports = graph;
