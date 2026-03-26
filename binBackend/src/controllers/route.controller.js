const {
  list_routes_service,
  get_route_by_id_service,
  create_route_service,
  delete_route_service
} = require('../services/route.service');

async function list_routes_controller(req, res) {
  const routes = await list_routes_service();

  return res.status(200).json({
    success: true,
    data: routes
  });
}

async function get_route_by_id_controller(req, res) {
  const route_id = Number(req.params.id);
  const route = await get_route_by_id_service(route_id);

  return res.status(200).json({
    success: true,
    data: route
  });
}

async function create_route_controller(req, res) {
  const route = await create_route_service(req.body);

  return res.status(201).json({
    success: true,
    data: route
  });
}

async function delete_route_controller(req, res) {
  const route_id = Number(req.params.id);
  await delete_route_service(route_id);

  return res.status(200).json({
    success: true,
    message: 'Route deleted successfully'
  });
}

module.exports = {
  list_routes_controller,
  get_route_by_id_controller,
  create_route_controller,
  delete_route_controller
};
