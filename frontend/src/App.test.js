import { render, fireEvent, waitFor } from "@testing-library/react";
import { MockedProvider } from "@apollo/client/testing";
import App, { GET_TASKS, ADD_TASK } from "./App";
import "@testing-library/jest-dom/extend-expect";

const mocks = [
  {
    request: {
      query: GET_TASKS,
    },
    result: {
      data: {
        tasks: [
          { _id: "1", task: "Task 1", completed: false },
          { _id: "2", task: "Task 2", completed: true },
        ],
      },
    },
  },
  {
    request: {
      query: ADD_TASK,
      variables: {
        task: "New Task",
      },
    },
    result: {
      data: {
        addTask: { _id: "3", task: "New Task", completed: false },
      },
    },
  },
];

test("renders App without error", async () => {
  const { getByText } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  await waitFor(() => {
    expect(getByText("Task 1")).toBeInTheDocument();
    expect(getByText("Task 2")).toBeInTheDocument();
  });
});

test('adds a new task', async () => {
  const { findByPlaceholderText, findByText, findByDisplayValue, findByRole } = render(
    <MockedProvider mocks={mocks} addTypename={false}>
      <App />
    </MockedProvider>
  );

  const input = await findByPlaceholderText("Add a new task");
  const button = await findByText("Add");

  // type "new task" and click the add button
  fireEvent.change(input, { target: { value: "New Task" } });
  fireEvent.click(button);

  // wait for mutation and re-render
  await waitFor(() => {
    // the input field should become empty again
    expect(findByDisplayValue('')).resolves.toBeInTheDocument();
  });
  
  // Check if the new task has been added to the list
  await waitFor(() => {
    expect(findByText('New Task')).resolves.toBeInTheDocument();
  });
});


