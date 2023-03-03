const { User, Operation, Record } = require('../src/model');

/* WARNING THIS WILL DROP THE CURRENT DATABASE */
seed();

async function seed() {
  // create tables
  await User.sync({ force: true });
  await Operation.sync({ force: true });
  await Record.sync({ force: true });

  //insert data
  await Promise.all([
    User.create({
      id: 1,
      userName: 'andre.freitas',
      password: 'MTIzNDU2',
      balance: 2000
    }),

    User.create({
      id: 2,
      userName: 'john.doe',
      password: 'MTIzNDU2',
      balance: 0,
      status: 'INACTIVE',
    }),

    Operation.create({
      id: 1,
      type: 'ADDITION',
      cost: 1
    }),
    Operation.create({
      id: 2,
      type: 'SUBTRACTION',
      cost: 3
    }),
    Operation.create({
      id: 3,
      type: 'MULTIPLICATION',
      cost: 6
    }),
    Operation.create({
      id: 4,
      type: 'DIVISION',
      cost: 6
    }),
    Operation.create({
      id: 5,
      type: 'SQUARE_ROOT',
      cost: 10
    }),
    Operation.create({
      id: 6,
      type: 'RANDOM_STRING',
      cost: 10
    }),

  ]);
}
