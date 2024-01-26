// routes/index.js

const express = require("express");
const router = express.Router();
const { Student } = require("../model/model");

router.get("/students", async (req, res) => {
  try {
    // Dummy student data
    const dummyStudents = [
      { id: 1, name: "John Do" },
      { id: 2, name: "Jane Doe" },
      { id: 3, name: "Alice" },
      { id: 4, name: "Bob" },
      { id: 5, name: "Charlie" },
    ];

    res.json(dummyStudents);
  } catch (error) {
    res.status(500).send("Error fetching students.");
  }
});

module.exports = router;
