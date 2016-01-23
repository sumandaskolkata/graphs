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
