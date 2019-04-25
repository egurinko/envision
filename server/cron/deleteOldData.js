module.exports = async services => {
  await services.oldData.delete();
  console.log("Successfully finish DELETE JOB");
};
