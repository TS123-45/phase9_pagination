const express = require("express");
const router = express.Router();
const { queryDatabase } = require("./db");

/* Pagination */
router.get("/users", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;

    const offset = (page - 1) * limit;

    const users = await queryDatabase("SELECT * FROM users LIMIT ? OFFSET ?", [
      limit,
      offset,
    ]);

    const totalRecords = await queryDatabase(
      "SELECT COUNT(*) AS total FROM users",
    );

    const total = totalRecords[0].total;
    const totalPages = Math.ceil(total / limit);

    res.status(200).json({
      currentPage: page,
      totalPages,
      totalRecords: total,
      data: users,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error fetching users",
      error: error.message,
    });
  }
});

module.exports = router;
