import app from "../app.js";
import supertest from "supertest";

const request = supertest(app);

describe("POST /weather", () => {
  it("should return weather data for a valid cityName", async () => {
    const cityName = "Amsterdam";
    const response = await request
      .post("/weather")
      .send({ cityName });
    expect(response.status).toBe(200);
    expect(response.body.weatherText).toContain(cityName);
  });

  it("should return an error for an invalid cityName", async () => {
    const response = await request
      .post("/weather")
      .send({ cityName : "xyzt"});
    expect(response.status).toBe(404);
    expect(response.body.weatherText).toBe("City is not found!");
  });

  it("should return an error when cityName is missing", async () => {
    const response = await request
      .post("/weather")
      .send({});
    expect(response.status).toBe(400);
    expect(response.body.weatherText).toBe("City name is missing!");
  });
});