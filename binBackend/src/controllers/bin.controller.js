const {
  list_bins_service,
  get_bin_by_id_service,
  create_bin_service,
  update_bin_service,
  delete_bin_service
} = require('../services/bin.service');

async function list_bins_controller(req, res) {
  const bins = await list_bins_service();

  return res.status(200).json({
    success: true,
    data: bins
  });
}

async function get_bin_by_id_controller(req, res) {
  const bin_id = Number(req.params.id);
  const bin = await get_bin_by_id_service(bin_id);

  return res.status(200).json({
    success: true,
    data: bin
  });
}

async function create_bin_controller(req, res) {
  const bin = await create_bin_service(req.body);

  return res.status(201).json({
    success: true,
    data: bin
  });
}

async function update_bin_controller(req, res) {
  const bin_id = Number(req.params.id);
  const bin = await update_bin_service(bin_id, req.body);

  return res.status(200).json({
    success: true,
    data: bin
  });
}

async function delete_bin_controller(req, res) {
  const bin_id = Number(req.params.id);
  await delete_bin_service(bin_id);

  return res.status(200).json({
    success: true,
    message: 'Bin deleted successfully'
  });
}

module.exports = {
  list_bins_controller,
  get_bin_by_id_controller,
  create_bin_controller,
  update_bin_controller,
  delete_bin_controller
};
