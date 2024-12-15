import fetch, { Headers } from "node-fetch";
import fs from "fs";

class PlanningCenterRepository {
  static _instance = null; // Static property to hold the singleton instance
  basePath = "https://api.planningcenteronline.com";

  constructor() {
    if (!PlanningCenterRepository._instance) {
      PlanningCenterRepository._instance = this;
    }
    return PlanningCenterRepository._instance;
  }

  async SendRequest(method, endpoint, body = null) {
    const headers = new Headers(); // Use Headers from node-fetch
    this.AppendAuthHeader(headers);

    try {
      const response = await fetch(`${this.basePath}${endpoint}`, {
        method,
        headers,
        body: body ? JSON.stringify(body) : null,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      return await response.json(); // Return JSON response
    } catch (error) {
      console.error("Error in SendRequest:", error.message);
      throw error; // Re-throw the error to propagate it
    }
  }

  AppendAuthHeader(headers) {
    try {
      // Load JSON configuration file
      const dataObj = JSON.parse(
        fs.readFileSync(
          "/Users/nolanmiller/Configs/planningcenteronline.connectionStrings.json",
          "utf-8"
        )
      );

      // Create Basic Auth header
      const credentials = Buffer.from(
        `${dataObj.client_id}:${dataObj.client_secret}`
      ).toString("base64");
      headers.append("Authorization", `Basic ${credentials}`);
    } catch (error) {
      console.error("Error in AppendAuthHeader:", error.message);
    }
  }

  async HealthCheck() {
    try {
      const data = await this.SendRequest("GET", "/test");
      console.log("HealthCheck Data:", data);
      return data;
    } catch (error) {
      console.error("HealthCheck Error:", error.message);
    }
  }

  async Get(endpoint) {
    try {
      const data = await this.SendRequest("GET", endpoint);
      console.log(`GET: ${endpoint}`, data);
      return data;
    } catch (error) {
      console.error("GET Error:", error.message);
    }
  }

  async Post(endpoint, body) {
    try {
      const data = await this.SendRequest("GET", endpoint, body);
      console.log(`GET: ${endpoint}`, data);
      return data;
    } catch (error) {
      console.error("GET Error:", error.message);
    }
  }
}

export default PlanningCenterRepository;
