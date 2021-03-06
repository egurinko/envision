exports.list = async (req, res, services) => {
  const data = await services.contribution.list();
  res.status(200).send(data);
};

exports.create = async (req, res, services) => {
  const username = req.body.username;
  delete req.body.username;

  Promise.all([
    services.trainingData.create(req.body),
    services.contribution.create({ username: username })
  ])
    .then(response => {
      res.sendStatus(200);
    })
    .catch(err => {
      console.log("ERROR", err);
    });
};
