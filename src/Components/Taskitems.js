import React from "react";
import swal from "sweetalert";

const Taskitems = ({ todo, setCart }) => {
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
                {todo.map((value) => (
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
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Taskitems;
