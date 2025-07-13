CREATE DATABASE IF NOT EXISTS skillquest_db;
USE skillquest_db;

CREATE TABLE Users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    role ENUM('learner', 'admin') DEFAULT 'learner'
);

CREATE TABLE Skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Interests (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) UNIQUE NOT NULL
);

CREATE TABLE Projects (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    creator_id INT,
    status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
    FOREIGN KEY (creator_id) REFERENCES Users(id)
);

CREATE TABLE Modules (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url VARCHAR(255),
    description TEXT
);

CREATE TABLE User_Skills (
    user_id INT,
    skill_id INT,
    PRIMARY KEY (user_id, skill_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (skill_id) REFERENCES Skills(id)
);

CREATE TABLE User_Interests (
    user_id INT,
    interest_id INT,
    PRIMARY KEY (user_id, interest_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (interest_id) REFERENCES Interests(id)
);

CREATE TABLE Project_Skills (
    project_id INT,
    skill_id INT,
    PRIMARY KEY (project_id, skill_id),
    FOREIGN KEY (project_id) REFERENCES Projects(id),
    FOREIGN KEY (skill_id) REFERENCES Skills(id)
);

CREATE TABLE Project_Interests (
    project_id INT,
    interest_id INT,
    PRIMARY KEY (project_id, interest_id),
    FOREIGN KEY (project_id) REFERENCES Projects(id),
    FOREIGN KEY (interest_id) REFERENCES Interests(id)
);

CREATE TABLE Project_Modules (
    project_id INT,
    module_id INT,
    PRIMARY KEY (project_id, module_id),
    FOREIGN KEY (project_id) REFERENCES Projects(id),
    FOREIGN KEY (module_id) REFERENCES Modules(id)
);

CREATE TABLE User_Projects (
    user_id INT,
    project_id INT,
    role VARCHAR(50),
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE TABLE User_Module_Progress (
    user_id INT,
    module_id INT,
    status ENUM('not_started', 'in_progress', 'completed') DEFAULT 'not_started',
    progress_percentage INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, module_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (module_id) REFERENCES Modules(id)
);

CREATE TABLE User_Project_Scores (
    user_id INT,
    project_id INT,
    skill_matches INT DEFAULT 0,
    interest_matches INT DEFAULT 0,
    total_score INT DEFAULT 0,
    last_updated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY (user_id, project_id),
    FOREIGN KEY (user_id) REFERENCES Users(id),
    FOREIGN KEY (project_id) REFERENCES Projects(id)
);

CREATE INDEX idx_users_email ON Users(email);
CREATE INDEX idx_projects_status ON Projects(status);
CREATE INDEX idx_user_skills_user ON User_Skills(user_id);
CREATE INDEX idx_user_skills_skill ON User_Skills(skill_id);
CREATE INDEX idx_project_skills_project ON Project_Skills(project_id);
CREATE INDEX idx_project_skills_skill ON Project_Skills(skill_id);