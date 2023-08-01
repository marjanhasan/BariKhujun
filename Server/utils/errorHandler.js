function handleRouteError(res, error,status,message) {
    if (error.name === "MongoError" && error.code === 18) {
        res.status(503).send({
            success: false,
            message: "Database unavailable", });
    } else if (error.name === "ValidationError") {
        res.status(400).send({
            success: false,
            message: "Invalid request", });
    } else if (status || message) {
        res.status(status).send({
            success: false,
            message: message,
        })
    } else {
        res.status(500).send({
            message: "Internal server error ",
            error,});
    }
}
module.exports = handleRouteError;