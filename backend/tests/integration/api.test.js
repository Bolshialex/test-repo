const request = require("supertest");
const app = require("../../src/app");
const { resetTasks } = require("../../src/taskModel");

describe("API Integration Tests", () => {
  beforeEach(() => {
    resetTasks();
  });

  test("GET /api/tasks should return 200 and empty array initially", async () => {
    const response = await request(app).get("/api/tasks");
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  test("POST /api/tasks should return 201 and create a task", async () => {
    const response = await request(app)
      .post("/api/tasks")
      .send({ title: "Integration Test Task" });

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.title).toBe("Integration Test Task");
  });

  test("POST /api/tasks should return 400 for invalid data", async () => {
    const response = await request(app).post("/api/tasks").send({});

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty("error", "Task title is required");
  });

  test("DELETE /api/tasks/:id should return 204 on success", async () => {
    await request(app).post("/api/tasks").send({ title: "To be deleted" });
    const deleteResponse = await request(app).delete("/api/tasks/1");
    expect(deleteResponse.status).toBe(204);
  });
});
