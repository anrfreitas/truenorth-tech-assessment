const Sequelize = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite3',
  define: {
    version: true,
  }
});

class User extends Sequelize.Model {}
User.init(
  {
    userName: {
      type: Sequelize.STRING,
      allowNull: false
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    },
    balance:{
      type: Sequelize.DECIMAL(12,2)
    },
    status:{
      type: Sequelize.ENUM('ACTIVE', 'INACTIVE'),
      defaultValue: 'ACTIVE',
    },
    version: { // Optimistic Locking
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize,
    modelName: 'User',
    version: true, // Optimistic Locking
  }
);

class Operation extends Sequelize.Model {}
Operation.init(
  {
    type:{
      type: Sequelize.ENUM('ADDITION', 'SUBTRACTION', 'MULTIPLICATION', 'DIVISION', 'SQUARE_ROOT', 'RANDOM_STRING')
    },
    cost:{
      type: Sequelize.DECIMAL(12,2)
    },
    version: { // Optimistic Locking
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize,
    modelName: 'Operation',
    version: true, // Optimistic Locking
  }
);

class Record extends Sequelize.Model {}
Record.init(
  {
    amount:{
      type: Sequelize.DECIMAL(12,2),
      allowNull: false
    },
    userBalance:{
      type: Sequelize.DECIMAL(12,2),
      allowNull: false
    },
    operationResponse: {
      type: Sequelize.BOOLEAN,
      default:false
    },
    deleted: { // Soft Deletion Work Around
      type: Sequelize.BOOLEAN,
      defaultValue: false,
    },
    version: { // Optimistic Locking
      allowNull: false,
      type: Sequelize.INTEGER,
      defaultValue: 0
    },
  },
  {
    sequelize,
    modelName: 'Record',
    version: true, // Optimistic Locking
  }
);

User.hasMany(Record)
Operation.hasMany(Record)
Record.belongsTo(User)
Record.belongsTo(Operation)

module.exports = {
  sequelize,
  User,
  Operation,
  Record
};
