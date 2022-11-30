import React, { useEffect, useState } from "react";
import swal from "sweetalert";
import "./Taskitem.css";
const Taskitems = ({ todo, setCart, Search }) => {
  const [pending, setpending] = useState(0);
  const [done, setdone] = useState(0);

  const count_status = (todo) => {
    todo.map((v) =>
      v.check === false ? setpending((p) => p + 1) : setdone((p) => p + 1)
    );
  };

  useEffect(() => {
    setpending(0);
    setdone(0);
    count_status(todo);
  }, [todo]);
  const updatelocalstorage = (val) => {
    if (
      JSON.parse(localStorage.getItem("task")).length &&
      "task" in localStorage
    ) {
      let items = JSON.parse(localStorage.getItem("task"));
      let new_items = items.filter((v) => v.id !== val.id);
      let change_status = { ...val, check: !val.check };
      let new_tasks = [...new_items, ...[change_status]];
      setCart(new_items);
      localStorage.setItem("task", JSON.stringify(new_tasks));
      setpending(0);
      setdone(0);
      count_status(new_tasks);
    }
  };

  const onDeleteItem = (val) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this task..!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((value) => {
      if (value) {
        if (
          JSON.parse(localStorage.getItem("task")).length &&
          "task" in localStorage
        ) {
          let items = JSON.parse(localStorage.getItem("task"));
          let new_items = items.filter((v) => v.id !== val.id);
          setCart(new_items);
          localStorage.setItem("task", JSON.stringify(new_items));
          setpending(0);
          setdone(0);
          count_status(new_items);
        }
        swal("Poof! Your  Task has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your Task is safe!");
      }
    });
  };

  return (
    <div className="container p-0">
      <div className="row ml-5">
        <div className=" col-12 col-lg-12 col-sm text-dark">
          <div className="status">
            <span>
              Done
              <sup>{done}</sup>
            </span>
            <span>
              Pending
              <sup>{pending}</sup>
            </span>
          </div>
          {todo.length === 0 ? (
            <table className="table table-success table-striped text-center table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Date</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody style={{ height: "100px" }}>
                <tr>
                  <td colSpan={3} className="font-monospace  pt-4">
                    No tasks available
                  </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <table className="table table-success table-striped table-hover table-bordered">
              <thead>
                <tr>
                  <th scope="col">Task</th>
                  <th scope="col">Date</th>
                  <th scope="col">Delete</th>
                </tr>
              </thead>
              <tbody>
                {todo
                  .filter((value) => {
                    if (Search === " ") {
                      return value;
                    } else if (value.task.includes(Search.toLowerCase())) {
                      return value;
                    }
                  })
                  .map((value) =>
                    value.length !== 0 ? (
                      <tr key={value.id}>
                        <td>
                          <input
                            type="checkbox"
                            size={4}
                            onChange={() => updatelocalstorage(value)}
                            checked={value.check}
                          />
                          <span className="m-3 font-monospace">
                            {value.task.toUpperCase()}
                          </span>
                        </td>
                        <td>
                          <span className="font-monospace">
                            {value.date.slice(0, 10)}
                          </span>
                        </td>
                        <td>
                          <button
                            onClick={() => onDeleteItem(value)}
                            className="btn btn-outline-danger"
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ) : (
                      <table className="table table-success table-striped text-center table-hover table-bordered">
                        <thead>
                          <tr>
                            <th scope="col">Task</th>
                            <th scope="col">Date</th>
                            <th scope="col">Delete</th>
                          </tr>
                        </thead>
                        <tbody style={{ height: "100px" }}>
                          <tr>
                            <td colSpan={3} className="font-monospace  pt-4">
                              No tasks available
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    )
                  )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskitems;
