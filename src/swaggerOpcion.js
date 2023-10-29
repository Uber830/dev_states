export const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Dev_states",
      version: "1.0.1",
      description: `<h3>This is a REST API application made with Express. 
      It retrieves data from the database and returns it to the client (Postman, Insomnia, etc.).
      <br>
      It also has the ability to add new users and properties to the database.
      The application is connected to a MySQL database.
      <br>
      The application is deployed in the cloud with the help of the Render platform.
      The image is stored in CLOUDINARY.</h3>`,
    },
    servers: [
      {
        url: `${process.env.DEVELOPMENT}:${process.env.PORT_SERVER}`,
        description: "Development server",
      },
      {
        url: `${process.env.PRODUCTION}`,
        description: "Production server",
      }
    ]
  },
  apis: ["./src/routers/*.js"],
};