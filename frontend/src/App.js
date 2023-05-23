import React, { useState } from "react";
import Header from "./components/header";
import ListItem from "./components/listItem";

import { useQuery, useMutation, gql } from '@apollo/client';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faBars } from "@fortawesome/free-solid-svg-icons";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

// fetch all tasks in the database
const GET_TASKS = gql`
  query GetTasks {
    tasks {
      _id
      task
      completed
    }
  }
`;

// create a new task after getting task name as String
const ADD_TASK = gql`
  mutation AddTask($task: String!) {
    addTask(task: $task) {
      _id
      task
      completed
      completedTime
      creationTime
    }
  }
`;

// delete task by ID
const DELETE_TASK = gql`
  mutation DeleteTask($id: ID!) {
    deleteTask(id: $id)
  }
`;

//mark as completed by ID
const UPDATE_TASK_COMPLETION = gql`
  mutation UpdateTaskCompletion($id: ID!) {
    updateTaskCompletion(id: $id)
  }
`;

function App() {

  const [taskInput, setTaskInput] = useState("");
  const { loading, error, data } = useQuery(GET_TASKS);

  const [addTask] = useMutation(ADD_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Refetch the GET_TASKS query after adding a task
  });
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }], // Refetch the GET_TASKS query after deleting a task
  });

  const [updateTaskCompletion] = useMutation(UPDATE_TASK_COMPLETION, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  // while fetching the list (loading)
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>; // error message if error


  // notification messages
  const AddTaskNotify = () => toast.success("Task Added");
  const CompleteTaskNotify = () => toast.success("Task Completed");
  const RevmoveTask = () => toast.success("Task Deleted");


  // Add task
  const handleAddTask = () => {
    if (taskInput.trim() === "") return; // if empty then return
    
    // call addtask mutation
    addTask({ variables: { task: taskInput } }).then(() => {
      AddTaskNotify();  // show notification message
    }); 
    setTaskInput("");
  };

  // Delete task
  const handleDeleteTask = (id) => {
    // call deletetask mutation
    deleteTask({ variables: { id } }).then(() => {
      RevmoveTask(); // show notification message
    }); 
  };

  // Mark task as complete
  const handleTaskCompletion = (id) => {
    console.log({ id });
    updateTaskCompletion({ variables: { id } }).then(() => {
      CompleteTaskNotify();   // show notification message
    });
  };


  return (
    <div className="App">
      <div className="container">
        <Header />
      </div>

      <div className="today-list">
        <div className="row">
          <div className="col-lg-2">
            <FontAwesomeIcon icon={faBars} className="bars-icon" />
          </div>
          <div className="col-lg-8 todo-text">To do today</div>
          <div className="col-lg-2">
            <FontAwesomeIcon icon={faChevronDown} className="arrow-down-icon" />
          </div>
        </div>
      </div>

      <ul className="todo-list">
        {data.tasks.length > 0 ? (
          data.tasks.map((task) => {
            return (
              <ListItem
                task={task}
                handleDeleteTask={handleDeleteTask}
                handleTaskCompletion={handleTaskCompletion}
                key={task._id}
              />
            );
          })
        ) : (
          <ListItem />
        )}
      </ul>

      <div className="task-input text-center add-task">
        <input
          type="text"
          placeholder="Add a new task"
          className="task-input"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleAddTask();
            }
          }}
        />
        <button onClick={handleAddTask} className="add-btn">
          Add
        </button>
      </div>

      <ToastContainer />
    </div>
  );
}

export default App;
export { GET_TASKS, ADD_TASK}

