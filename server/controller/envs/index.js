exports.list = async (req, res, services) => {
  const timespan = req.query.timespan ? req.query.timespan : null;
  const data = await services.envs.list(timespan);
  res.status(200).send(data);
};

exports.create = async (req, res, services) => {
  services.envs.create(req.body);
  res.sendStatus(200);
};
