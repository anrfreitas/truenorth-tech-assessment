const userRoutes = require('./routes/user.routes');
const operationRoutes = require('./routes/operation.routes');
const recordRoutes = require('./routes/record.routes');

const setupRoutes = (app) => {
    userRoutes.setupContextRoutes(app);
    operationRoutes.setupContextRoutes(app);
    recordRoutes.setupContextRoutes(app);
}

module.exports = { setupRoutes }
