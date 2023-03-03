const middlewares = require('../middlewares');
const config = require('../config/config');
const controllerModule = require('../controllers/controller.module');

const API_CONTEXT_PREFIX = 'operation';

const setupContextRoutes = (app) => {
    /**
     * @returns all available operations
     */
    app.get(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}`,
        [ middlewares.checkAuthentication, middlewares.cache(config.DEFAULT_CACHE_TTL) ], async (req, res) => {
            const httpResponse = await controllerModule.operationController
                .getAll();
            return httpResponse.processResponse(res);
    });

    /**
     * @returns the created record
     */
    app.post(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}`,
        [ middlewares.checkAuthentication ], async (req, res) => {
            const httpResponse = await controllerModule.operationController
                .executeOperation(req.user.id, req.body?.type, req.body?.value1, req.body?.value2);
            return httpResponse.processResponse(res);
    });
}

module.exports = { setupContextRoutes }
