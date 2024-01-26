// controllers/attendanceController.js

const { Student, Attendance } = require("../model/model");

exports.markAttendance = async (req, res) => {
  const { date, attendance } = req.body;

  try {
    await Attendance.bulkCreate(attendance);
    res.send("Attendance marked successfully.");
  } catch (error) {
    res.status(500).send("Error marking attendance.");
  }
};

exports.generateReport = async (req, res) => {
  try {
    const report = await Student.findAll({
      include: [
        {
          model: Attendance,
          attributes: [
            [
              sequelize.fn(
                "AVG",
                sequelize.literal(
                  'CASE WHEN status = "present" THEN 1 ELSE 0 END'
                )
              ),
              "attendance_percentage",
            ],
          ],
          group: ["Student.id"],
        },
      ],
    });
    res.json(report);
  } catch (error) {
    res.status(500).send("Error generating report.");
  }
};
