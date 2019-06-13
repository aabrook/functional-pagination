import React from "react";
import ReactDOM from "react-dom";
import { Pagination } from "./Pagination";
import { range, pipe, path } from "ramda";

import "./styles.css";

function App() {
  const [index, setIndex] = React.useState(0)
  const [pageCount, setPageCount] = React.useState(5)

  const inputToInt = pipe(
    path(['target', 'value']),
    (s) => s && s.trim() !== '' ? parseInt(s.trim()) : 0,
    setPageCount
  )

  return (
    <div className="App">
      How many pages to show: <input type="number" value={pageCount} onChange={ inputToInt } />
      <Pagination pages={range(0, pageCount)} count={ 2 } boundsCount={ 1 } index={ index } onSelect={(i => setIndex(i))} />
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
