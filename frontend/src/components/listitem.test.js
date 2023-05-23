import { render, fireEvent } from "@testing-library/react";
import ListItem from "./listItem";

test("renders ListItem correctly", () => {
  const task = { _id: "1", task: "Test Task", completed: false };
  const { getByText } = render(
    <ListItem
      task={task}
      handleDeleteTask={() => {}}
      handleTaskCompletion={() => {}}
    />
  );

  expect(getByText("Test Task")).toBeInTheDocument();
});

test("deletes a task", () => {
  const task = { _id: "1", task: "Test Task", completed: false };
  const handleDeleteTask = jest.fn();

  const { getByTitle } = render(
    <ListItem
      task={task}
      handleDeleteTask={handleDeleteTask}
      handleTaskCompletion={() => {}}
    />
  );

  fireEvent.click(getByTitle("Delete Task"));
  expect(handleDeleteTask).toHaveBeenCalledWith("1");
});

test("marks a task as completed", () => {
  const task = { _id: "1", task: "Test Task", completed: false };
  const handleTaskCompletion = jest.fn();

  const { getByTitle } = render(
    <ListItem
      task={task}
      handleDeleteTask={() => {}}
      handleTaskCompletion={handleTaskCompletion}
    />
  );

  fireEvent.click(getByTitle("Mark as completed"));
  expect(handleTaskCompletion).toHaveBeenCalledWith("1");
});
