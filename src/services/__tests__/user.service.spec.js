const UserService = require('../user.service');

const responseMock = {
    "id": 1,
    "userName": "andre.freitas",
    "balance": 1889,
    "status": "ACTIVE",
    "version": 0,
    "createdAt": "2023-03-03T17:33:00.672Z",
    "updatedAt": "2023-03-03T19:09:54.836Z"
}

jest.mock('../../model');
const { sequelize } = require('../../model');

describe('Test User Service', () => {

    describe('getUserById function', () => {

        test('should return http response 404', async () => { // be the face of the team
            //arrange
            const findOneMock = jest.fn(() => {});

            sequelize.models.User = {
                findOne: findOneMock,
            };

            // action
            const result = await new UserService().getUserById(1, 1);

            // assertions
            expect(result.getStatus()).toBe(404);
            expect(result.getMessage()).toMatchObject({});
            expect(findOneMock).toHaveBeenCalledTimes(1);
        });

        test('should return http response 200', async () => {
            //arrange
            const findOneMock = jest.fn(() => responseMock);

            sequelize.models.User = {
                findOne: findOneMock,
            };

            // action
            const result = await new UserService().getUserById(1, 1);

            // assertions
            expect(result.getStatus()).toBe(200);
            expect(result.getMessage()).toMatchObject(responseMock);
            expect(findOneMock).toHaveBeenCalledTimes(1);
        });
    });
});
