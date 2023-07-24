function handleRouteError(res, error) {
    if (error.name === "MongoError" && error.code === 18) {
        res.status(503).send({ message: "Database unavailable" });
    } else if (error.name === "ValidationError") {
        res.status(400).send({ message: "Invalid request" });
    } else {
        res.status(500).send({ message: "Internal server error" });
    }
}