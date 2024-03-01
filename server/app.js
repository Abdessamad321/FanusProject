const { app } = require("./server");
const event = require("./routes/eventRoutes");
const customer = require("./routes/customerRoutes");
const user = require("./routes/userRoutes");
const reservation = require("./routes/reservationRoutes");
// const auth = require("./middlewares/Oauth");

const routes = [
  { route: event, path: "/event" },
  { route: customer, path: "/customer" },
  { route: user, path: "/user" },
  { route: reservation, path: "/reservation" },
  // { route: auth , path:"/auth" }
];

routes.forEach((route) => {
  app.use(route.path, route.route);
});
