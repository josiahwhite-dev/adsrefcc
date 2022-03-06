import "./App.css";

import { HashRouter, Route } from "react-router-dom";
import Home from "./Pages/Home";

//Main Pages
import Algorithms from "./Pages/Algorithms";
import DataStructures from "./Pages/DataStructures";

//Data Structures
import LinkedList from "./Pages/datastructures/linkedlist/LinkedList";
import ArrayVis from "./Pages/datastructures/array/ArrayVis";

//Algorithms
import BinarySearch from "./Pages/algorithms/binarysearch/BinarySearch";
import QuickSort from "./Pages/algorithms/quicksort/QuickSort";
import BFS from "./Pages/algorithms/bfs/BFS";
import Dijkstra from "./Pages/algorithms/dijkstra/Dijkstra";

function App() {
  return (
    <div className="App">
      <HashRouter>
        {/* main pages */}
        <Route path="/" exact component={Home} />
        <Route path="/algorithms" component={Algorithms} />
        <Route path="/datastructures" component={DataStructures} />

        {/* data structures */}
        <Route path="/linkedlist" component={LinkedList} />
        <Route path="/array" component={ArrayVis} />

        {/* algorithms */}
        <Route path="/binarysearch" component={BinarySearch} />
        <Route path="/quicksort" component={QuickSort} />
        <Route path="/bfs" component={BFS} />

        <Route path="/dijkstra" component={Dijkstra} />
      </HashRouter>
    </div>
  );
}

export default App;
