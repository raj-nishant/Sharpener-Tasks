document.addEventListener("DOMContentLoaded", () => {
  // Function to create student rows
  function createStudentRow(student) {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${student.name}</td>
      <td><input type="radio" name="${student.id}" value="present"> Present</td>
      <td><input type="radio" name="${student.id}" value="absent"> Absent</td>
    `;
    return row;
  }

  // Set base URL for Axios
  axios.defaults.baseURL = "http://localhost:3000";

  // Fetch students and populate the table
  axios
    .get("/students")
    .then((response) => {
      const studentsTable = document.getElementById("studentsTable");
      response.data.forEach((student) => {
        studentsTable.appendChild(createStudentRow(student));
      });
    })
    .catch((error) => console.error("Error fetching students:", error));

  // Handle form submission
  document
    .getElementById("attendanceForm")
    .addEventListener("submit", function (event) {
      event.preventDefault();
      const date = document.getElementById("date").value;
      const attendance = [];

      // Collect attendance data
      document
        .querySelectorAll('input[type="radio"]:checked')
        .forEach((input) => {
          attendance.push({
            student_id: input.getAttribute("name"),
            status: input.value,
          });
        });

      // Submit attendance data
      axios
        .post("/mark-attendance", { date, attendance })
        .then((response) => alert(response.data))
        .catch((error) => console.error("Error marking attendance:", error));
    });

  // Handle report generation
  document.getElementById("reportBtn").addEventListener("click", function () {
    // Fetch and display the report
    axios
      .get("/report")
      .then((response) => {
        const reportDiv = document.getElementById("report");
        reportDiv.innerHTML = "<h2>Attendance Report</h2>";
        response.data.forEach((student) => {
          reportDiv.innerHTML += `<p>${student.name}: ${
            student.attendance_percentage * 100
          }%</p>`;
        });
      })
      .catch((error) => console.error("Error generating report:", error));
  });
});
