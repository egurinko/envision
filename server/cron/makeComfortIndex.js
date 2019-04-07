module.exports = async services => {
  await services.comfort.create();
  console.log("Successfully finish CRON COMFORT JOB");
};
