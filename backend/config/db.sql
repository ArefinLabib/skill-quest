CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    profile_picture VARCHAR(255)
);

CREATE TABLE goals (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_goals (
    user_id INT,
    goal_id INT,
    PRIMARY KEY (user_id, goal_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (goal_id) REFERENCES goals(id)
);

CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE user_skills (
    user_id INT,
    skill_id INT,
    level INT NOT NULL,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);

CREATE TABLE projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    difficulty ENUM('Beginner', 'Intermediate', 'Advanced') NOT NULL DEFAULT 'Beginner'
);

CREATE TABLE project_goals (
    project_id INT,
    goal_id INT,
    PRIMARY KEY (project_id, goal_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (goal_id) REFERENCES goals(id)
);

CREATE TABLE project_skills (
    project_id INT,
    skill_id INT,
    required_level INT NOT NULL,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES projects(id),
    FOREIGN KEY (skill_id) REFERENCES skills(id)
);

CREATE TABLE user_projects (
    user_id INT,
    project_id INT,
    status ENUM('in_progress', 'completed') NOT NULL,
    start_date DATE,
    completion_date DATE,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (project_id) REFERENCES projects(id)
);

CREATE TABLE goal_skills (
    goal_id INT NOT NULL,
    skill_id INT NOT NULL,
    PRIMARY KEY (goal_id, skill_id),
    FOREIGN KEY (goal_id) REFERENCES goals(id) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE ON UPDATE CASCADE
);



CREATE TABLE user_activity (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT NOT NULL,
  action VARCHAR(100) NOT NULL,
  project_id INT NULL,
  module_id INT NULL,
  metadata JSON NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
  INDEX (user_id, created_at),
  INDEX (action)
);

CREATE TABLE user_xp (
  user_id INT PRIMARY KEY,
  xp_total INT NOT NULL DEFAULT 0,
  level INT NOT NULL DEFAULT 1,
  last_level_up_at TIMESTAMP NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE user_streaks (
  user_id INT PRIMARY KEY,
  current_streak INT NOT NULL DEFAULT 0,
  best_streak INT NOT NULL DEFAULT 0,
  last_active_date DATE NULL,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);
