exports.list = async (req, res, services) => {
  const timespan = req.query.timespan ? req.query.timespan : null;
  const data = await services.comfort.list(timespan);
  res.status(200).send(data);
};
