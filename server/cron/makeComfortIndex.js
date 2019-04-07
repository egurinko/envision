module.exports = async services => {
  await services.cron();
  console.log("Successfully finish CRON COMFORT JOB");
};
