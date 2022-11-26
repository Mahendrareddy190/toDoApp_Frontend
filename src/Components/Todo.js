import React, { useEffect, useState } from "react";
import "./Todo.css";
import swal from "sweetalert";
import Taskitems from "./Taskitems";
const Todo = () => {
  const [Value, setValue] = useState({
    id: "",
    task: "",
    check: false,
    date: new Date(),
  });
  const [get_Local, setLocal] = useState([]);
  const [cart, setCart] = useState([]);
  const { task } = Value;
  const handlechange = (task) => (event) => {
    setValue({
      ...Value,
      [task]: event.target.value,
      id: JSON.parse(localStorage.getItem("task")).length + 1,
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    setCart(...[Value]);
    if (Value.task !== "") {
      if (JSON.parse(localStorage.getItem("task")).length) {
        let Old_tasks = [
          ...[Value],
          ...JSON.parse(localStorage.getItem("task")),
        ];
        localStorage.setItem("task", JSON.stringify(Old_tasks));
        Value["task"] = "";
      } else {
        localStorage.setItem("task", JSON.stringify([Value]));
        Value["task"] = "";
      }
    } else {
      swal("Empty task..!", "😕", "warning");
    }
  };

  const preload = () => {
    if ("task" in localStorage) {
      let todo_task = JSON.parse(localStorage.getItem("task"));
      setLocal(todo_task);
    } else {
      localStorage.setItem("task", JSON.stringify([]));
    }
  };

  useEffect(() => {
    preload();
  }, [cart]);

  return (
    <div className="container-fluid ">
      {/* <img
        src="https://static.vecteezy.com/system/resources/previews/005/374/380/original/illustration-graphic-cartoon-character-of-job-interview-vector.jpg"
        alt="work"
      /> */}
      <div className="row mt-5">
        <div className="col col-xl-12 col-lg-12 col-md-12 col-sm input-group">
          <form className="input-group  w-75 mb-3">
            <input
              className="form-control h-100"
              type="text"
              placeholder="Add task"
              value={task}
              onChange={handlechange("task")}
            />
            <button onClick={onSubmit} className="btn btn-outline-success">
              ADD
            </button>
          </form>
        </div>
        <section>
          <Taskitems todo={get_Local} setCart={setCart} />
        </section>
      </div>
    </div>
  );
};

export default Todo;
