import config from "../../config";

export default process.env.NODE_ENV === "development"
    ? `http://localhost:${config.express.port}/api`
    : "/api";