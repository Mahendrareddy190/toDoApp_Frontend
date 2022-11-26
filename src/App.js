import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Todo from "./Components/Todo.js";
import { Blocks } from "react-loader-spinner";
const App = () => {
  const [load, setload] = useState(false);
  useEffect(() => {
    setload(true);
    setTimeout(() => {
      setload(false);
    }, 3000);
  }, []);
  return (
    <Router>
      <Routes>
        <Route
          exact
          index
          path="/"
          element={
            load ? (
              <Blocks
                visible={true}
                height="100px"
                width="100px"
                ariaLabel="blocks-loading"
                wrapperStyle={{ display: "flex", margin: "300px auto" }}
                wrapperClass="blocks-wrapper"
              />
            ) : (
              <Todo />
            )
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
