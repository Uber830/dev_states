export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev_states",
      version: "1.0.0",
      description: "A simple express library API",
    },
    servers: [
      {
        URL: "http://localhost:3019",
        URL: "https://dev-states.onrender.com"
      }
    ]
  },
  apis: ["./src/routers/*.js"],
};
