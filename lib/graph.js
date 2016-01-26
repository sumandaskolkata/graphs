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
      if(vertices[vertex] == to)
        return visited.concat(vertices[vertex]);
    }
    if(vertices.length>0){
      for (var vertex in vertices){
        if(visited.indexOf(vertices[vertex]) == -1 && visited.indexOf(to) == -1)
          visited = this.pathBetween(vertices[vertex],to,visited);
      }
      return visited.indexOf(to)!= -1?visited :[];
    }
    else{
      visited.pop();
      return visited;
    }
  },
  farthestVertex : function(from,visited){
    visited = visited || [from];
    
    for (var vertex in this.edges[from]){
      if(visited.indexOf(this.edges[from][vertex]) == -1)
          return this.farthestVertex(this.edges[from][vertex],visited.concat(this.edges[from][vertex]));
    }
      return from;
  },
  allPaths:function(from,to,visited,paths){
    var edges = this.edges;
    paths = paths || [];
    visited = visited || [];
    visited = visited.concat(from);
    var vertices = edges[from];
    if(from == to && visited.indexOf(to) == -1){
      paths.push(visited);
      return paths;
    }
    for (var vertex in vertices){
      if(vertices[vertex] == to)
        paths.push(visited.concat(vertices[vertex]));
    }
    for (var vertex in vertices){
      if(visited.indexOf(vertices[vertex]) == -1 && visited.indexOf(to) == -1)
        this.allPaths(vertices[vertex],to,visited,paths)
    }
    return paths;
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
      this.edges[to] = this.edges[to].concat(from);
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
    console.log(edges)
    vertices.forEach(function(vertex){
      size+=edges[vertex].length;
    })
    console.log(size)
    return size/2;
  },
  pathBetween :function(from,to,visited){
    var edges = this.edges;
    console.log(from,to)
    console.log(edges)
    visited = visited || [];
    visited = visited.concat(from);
    var vertices = edges[from];
    if(from == to)
      return visited;
    for (var vertex in vertices){
      if(vertices[vertex] == to)
        return visited.concat(vertices[vertex]);
    }
    console.log(vertices)
    if(vertices.length>0){
      for (var vertex in vertices){
        if(visited.indexOf(vertices[vertex]) == -1 && visited.indexOf(to) == -1){
          visited = this.pathBetween(vertices[vertex],to,visited);
        }
        console.log(visited,'********')
      }
      return visited.indexOf(to)!= -1?visited :[];
    }
    else{
      visited.pop();
      console.log(visited,'+++++++++++++')
      return visited;
    }
  },
  farthestVertex : function(from,visited){
    visited = visited || [from];
    
    for (var vertex in this.edges[from]){
      if(visited.indexOf(this.edges[from][vertex]) == -1)
          return this.farthestVertex(this.edges[from][vertex],visited.concat(this.edges[from][vertex]));
    }
      return from;
  },
  allPaths:function(from,to,visited,paths){
    var edges = this.edges;
    paths = paths || [];
    visited = visited || [];
    visited = visited.concat(from);
    var vertices = edges[from];
    if(from == to && visited.indexOf(to) == -1){
      paths.push(visited);
      return paths;
    }
    for (var vertex in vertices){
      if(vertices[vertex] == to)
        paths.push(visited.concat(vertices[vertex]));
    }
    if(vertices.length>0){
      for (var vertex in vertices){
        if(visited.indexOf(vertices[vertex]) == -1 && visited.indexOf(to) == -1)
          this.allPaths(vertices[vertex],to,visited,paths)
      }
      return paths;
    }
  }
}


module.exports = graph;
