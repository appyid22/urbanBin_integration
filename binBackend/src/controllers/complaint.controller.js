const { create_complaint_service } = require('../services/complaint.service');

async function create_complaint_controller(req, res) {
  const complaint = await create_complaint_service(req.body, req.file);

  return res.status(201).json({
    success: true,
    data: complaint
  });
}

module.exports = {
  create_complaint_controller
};
