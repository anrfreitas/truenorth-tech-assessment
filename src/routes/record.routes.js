const middlewares = require('../middlewares');
const config = require('../config/config');
const controllerModule = require('../controllers/controller.module');

const API_CONTEXT_PREFIX = 'record';

const setupContextRoutes = (app) => {
    /**
     * @returns authenticated user records
     */
    app.get(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}`,
        [ middlewares.checkAuthentication, middlewares.cache(config.DEFAULT_CACHE_TTL) ], async (req, res) => {
            const httpResponse = await controllerModule.recordController
                .getAllRecordsByUserId(req.user.id, req.query?.page, req.query?.limit, req.query['search-term']);
            return httpResponse.processResponse(res);
    });

    app.delete(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}/:id`,
        [ middlewares.checkAuthentication ], async (req, res) => {
            const httpResponse = await controllerModule.recordController
                .deleteRecordById(req.params?.id);
            return httpResponse.processResponse(res);
    });
}

module.exports = { setupContextRoutes }
