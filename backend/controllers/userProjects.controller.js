// controllers/userProjects.controller.js
import pool from "../config/db.js";

export const enrollInProject = async (req, res) => {
  const userId = req.user.id;
  const { projectId } = req.body;

  if (!projectId) {
    return res.status(400).json({ message: "Project ID is required" });
  }

  try {
    // Check if project exists
    const [projectCheck] = await pool.execute(
      "SELECT id FROM projects WHERE id = ?",
      [projectId]
    );
    if (projectCheck.length === 0) {
      return res.status(404).json({ message: "Project not found" });
    }

    // Check if already enrolled
    const [existing] = await pool.execute(
      "SELECT * FROM user_projects WHERE user_id = ? AND project_id = ?",
      [userId, projectId]
    );
    if (existing.length > 0) {
      return res.status(400).json({ message: "Already enrolled in this project" });
    }

    // Enroll user
    await pool.execute(
      "INSERT INTO user_projects (user_id, project_id, status, start_date) VALUES (?, ?, 'in_progress', CURDATE())",
      [userId, projectId]
    );

    res.json({ message: "Successfully enrolled in project" });
  } catch (err) {
    console.error("Error enrolling in project:", err);
    res.status(500).json({ message: "Server error" });
  }
};
