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
        url: "https://dev-states.onrender.com",
        url: "http://localhost:3019"
      }
    ]
  },
  apis: ["./src/routers/*.js"],
};