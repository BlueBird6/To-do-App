import React from "react";
import RoundCheck from "./roundcheck";

import dots from "../images/dots.png";
import "./listitem.css";

function ListItem({ task, handleDeleteTask, handleTaskCompletion }) {
  console.log(task);
  return task ? (
    <>
      <li className="item">
        <div className="row">
          <div className="col-lg-1 col-md-4 col-sm-5">
            <RoundCheck
              checked={task.completed}
              onClick={() => handleTaskCompletion(task._id)}
              title="Mark as complete"
            />
          </div>
          <div className="col-lg-10 col-md-4 col-sm-2">
            <span className={task.completed ? "completed" : ""}>
              {task.task}
            </span>
          </div>
          <div className="col-lg-1 col-md-4 col-sm-5">
            <img
              src={dots}
              className="delete-btn"
              onClick={() => handleDeleteTask(task._id)}
              alt="Delete"
              title="Delete Task"
            />
          </div>
        </div>
      </li>
      <hr />
    </>
  ) : (
    <>
      <li className="item">
        No Tasks Pending!
      </li>
      <hr />
    </>
  );
}

export default ListItem;
