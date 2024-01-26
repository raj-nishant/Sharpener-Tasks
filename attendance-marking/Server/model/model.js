// models/models.js

const Sequelize = require("sequelize");
const sequelize = new Sequelize("node-app", "root", "1234", {
  host: "localhost",
  dialect: "mysql",
});

const Student = sequelize.define("Student", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

const Attendance = sequelize.define("Attendance", {
  date: {
    type: Sequelize.DATEONLY,
    allowNull: false,
  },
  status: {
    type: Sequelize.ENUM("present", "absent"),
    allowNull: false,
  },
});

Student.hasMany(Attendance);
Attendance.belongsTo(Student);

module.exports = {
  Student,
  Attendance,
  sequelize,
};
