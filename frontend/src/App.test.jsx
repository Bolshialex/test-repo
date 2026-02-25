import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi } from "vitest";
import App from "./App";

// Mock the global fetch API to prevent actual network requests during testing
global.fetch = vi.fn();

describe("App Component Frontend Tests", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test("renders Task Manager heading", async () => {
    fetch.mockResolvedValueOnce({ json: async () => [] });
    render(<App />);
    expect(screen.getByText("Task Manager")).toBeInTheDocument();
  });

  test("fetches and displays tasks on initial load", async () => {
    const mockTasks = [
      { id: 1, title: "Learn Vitest" },
      { id: 2, title: "Master RTL" },
    ];
    // Mock the initial GET request
    fetch.mockResolvedValueOnce({ json: async () => mockTasks });

    render(<App />);

    // Wait for the async state update to render the items
    await waitFor(() => {
      expect(screen.getByText("Learn Vitest")).toBeInTheDocument();
      expect(screen.getByText("Master RTL")).toBeInTheDocument();
    });
  });

  test("adds a new task to the list upon form submission", async () => {
    // Mock the initial GET request (empty list)
    fetch.mockResolvedValueOnce({ json: async () => [] });
    // Mock the POST request response
    fetch.mockResolvedValueOnce({
      json: async () => ({ id: 3, title: "New Test Task" }),
    });

    render(<App />);

    const input = screen.getByPlaceholderText("New task");
    const button = screen.getByText("Add Task");

    fireEvent.change(input, { target: { value: "New Test Task" } });
    fireEvent.click(button);

    // Verify the UI updates to show the new task
    await waitFor(() => {
      expect(screen.getByText("New Test Task")).toBeInTheDocument();
    });

    // Ensure fetch was called twice (once for mount, once for POST)
    expect(fetch).toHaveBeenCalledTimes(2);
  });
});
