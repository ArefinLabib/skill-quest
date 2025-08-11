import pool from "../config/db.js";

const levelMap = {
    'Not Selected': 0,
    'Beginner': 1,
    'Intermediate': 2,
    'Advanced': 3
};



export const getGoals =  async (req, res) => {
  try {
    const [rows] = await pool.execute('SELECT name FROM goals');
    // console.log('Fetched goals:', rows);
    

    const goals = rows.map(row => row.name);
    // console.log('Goals:', goals);
    
    res.json({ goals });
  } catch (error) {
    console.error('Error fetching goals:', error);
    res.status(500).json({ error: 'Error fetching goals' });
  }
};

export const getSkills = async (req, res) => {
  // const  goals  = req.body.goals;
  const { goals } = req.body;
  // console.log('Received goals:', goals);
  

  try {
    const [rows] = await pool.query(`
      SELECT g.name AS goal_name, s.name AS skill_name
      FROM goals g
      JOIN goal_skills gs ON g.id = gs.goal_id
      JOIN skills s ON gs.skill_id = s.id
      WHERE g.name IN (?)
      ORDER BY g.name, s.name
    `, [goals]);

    const skillMap = {};
    rows.forEach(row => {
      if (!skillMap[row.goal_name]) {
        skillMap[row.goal_name] = [];
      }
      skillMap[row.goal_name].push(row.skill_name);
    });
    res.json(skillMap);
  } catch (error) {
    console.error('Error fetching skills:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
};

export const saveSkills = async (req, res) => {
  const userId = req.user.id;
  // console.log(userId);
  
  const { goals, skills } = req.body;
  // console.log('Received data:', { goals, skills });

  try {
    if (goals.length > 0) {
      const [goalRows] = await pool.query(
        `SELECT id, name FROM goals WHERE name IN (?)`,
        goals
      );
      console.log('Goal rows:', goalRows);
      

      const goalIdMap = {};
      goalRows.forEach(row => {
        goalIdMap[row.name] = row.id;
      });
      const userGoalsValues = goals.map(goalName => [userId, goalIdMap[goalName]]);
      console.log('User goals values:', userGoalsValues);
      
      await pool.query(
        'INSERT INTO user_goals (user_id, goal_id) VALUES ?',
        [userGoalsValues]
      );
    }

    if (Object.keys(skills).length > 0) {
      const skillNames = Object.keys(skills);
      const [skillRows] = await pool.execute(
        `SELECT id, name FROM skills WHERE name IN (${skillNames.map(() => '?').join(',')})`,
        skillNames
      );
      const skillIdMap = {};
      skillRows.forEach(row => {
        skillIdMap[row.name] = row.id;
      });
      const userSkillsValues = skillNames.map(skillName => [
        userId,
        skillIdMap[skillName],
        levelMap[skills[skillName]]
      ]);
      await pool.query(
        'INSERT INTO user_skills (user_id, skill_id, level) VALUES ?',
        [userSkillsValues]
      );
    }
    res.json({ message: 'Choices saved successfully' });
  } catch (error) {
    console.error('Error saving choices:', error);
    res.status(500).json({ error: 'Internal server error' });
  }};