// helpful functions to be used

utils = {

  shuffle: function(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  },

  /**
  * A Graph is defined as an ordered pair G = (V, E)
  * comprising a set V of vertices (puzzle pieces) and
  * a set E of edges (connections) which are 2-element
  * subsets of V.
  *   e.g.  G = { V, E }
  *         V = [p1,p2,p3]
  *         E = [[p1,p3], [p2,p1]]
  *     so  G = {[p1,p2,p3], [[p1,p3], [p2,p1]]}
  *
  * The graphs array is an array of graphs
  **/
  graphs: [],

  createGraph: function(vertices, edges) {
    this.graphs.push({V: vertices, E: edges});
  },

  addToGraph: function(graph, vertex, edge) {
    graph.V.push(vertex);
    graph.E.push(edge);
  },

  removeGraph: function(graph) {
    var index = this.graphs.indexOf(graph);
    // splice removes the index element
    this.graphs.splice(index, 1);
  },

  // Join graph1 to graph2 by the egde
  joinGraphs: function(graph1, graph2, edge) {
    // First check that these graphs aren't already connected
    // via another edge:
    if (this.graphs.indexOf(graph1) == this.graphs.indexOf(graph2)) {
      console.log('same graphs');
      return;
    }

    var vertices = graph1.V.concat(graph2.V);
    var edges = graph1.E.concat(graph2.E);
    edges.push(edge);

    this.createGraph(vertices, edges);

    // Remove old graphs
    this.removeGraph(graph1);
    this.removeGraph(graph2);
  },

  // Returns the graph which contains this vetex
  findGraph(vertex) {
    graph = this.graphs.filter(x => {
      return (x.V.indexOf(vertex) > -1)
    });
    if (!graph[0]) {
      console.log(graph);
    }
    return graph[0];
  },
};
