const middlewares = require('../middlewares');
const config = require('../config/config');
const controllerModule = require('../controllers/controller.module');

const API_CONTEXT_PREFIX = 'user';

const setupContextRoutes = (app) => {
    /**
     * @returns authenticated user basic information
     */
    app.get(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}/self`,
        [ middlewares.checkAuthentication, middlewares.cache(config.DEFAULT_CACHE_TTL) ], async (req, res) => {
            return res.status(200).json(req.user);
    });

    /**
     * @returns user information
     */
    app.get(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}/:id`,
        [ middlewares.checkAuthentication, middlewares.cache(config.DEFAULT_CACHE_TTL) ], async (req, res) => {
            const httpResponse = await controllerModule.userController
                .getUserById(req.params?.id);
            return httpResponse.processResponse(res);
    });

    /**
     * @returns user records
     */
    app.get(`/api/${config.API_VERSION}/${API_CONTEXT_PREFIX}/:id/records`,
        [ middlewares.checkAuthentication, middlewares.cache(config.DEFAULT_CACHE_TTL) ], async (req, res) => {
            const httpResponse = await controllerModule.recordController
                .getAllRecordsByUserId(req.user.id, req.query?.page, req.query?.limit, req.query['search-term'], req.query?.sortby);
            return httpResponse.processResponse(res);
    });
}

module.exports = { setupContextRoutes }
