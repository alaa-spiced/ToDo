const spicedPg = require("spiced-pg");
let db;
if (process.env.DATABASE_URL) {
    db = spicedPg(process.env.DATABASE_URL);
}else {
    db = spicedPg("postgres:postgres:postgres@localhost:5432/todo");
}

exports.createUser = function(firstName, lastName, email, password) {
    const query =
    "INSERT INTO users (first_name, last_name,email, hashed_password) VALUES ($1, $2 ,$3, $4) RETURNING *";

    const params = [firstName, lastName, email, password];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.checkEmail = function(email) {
    const q = "SELECT * FROM users WHERE email = $1;";
    const params = [email];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.getUserInfoById = function(userId) {
    const q = "SELECT * FROM users WHERE id = $1;";
    const params = [userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateUserProfilePic = function(userId , imageUrl) {
    const q =
    "UPDATE users SET image_url = ($2) WHERE id = ($1) RETURNING *;";

    const params = [userId , imageUrl];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.updateUserInfo = function (firstName,lastName,gender,phoneNumber,email,password,userId) {
    const q =
  "UPDATE users SET first_name = ($1), last_name = ($2), gender = ($3), phone_number = ($4), email = ($5), hashed_password = ($6) WHERE id = ($7) RETURNING *;";

    const params = [firstName,lastName,gender,phoneNumber,email,password,userId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.getUsersInfosByIds = function(arrayOfIds) {
    const query = `SELECT * FROM users WHERE id = ANY($1)`;
    return db.query(query, [arrayOfIds])
        .then(results => {
            console.log(results.rows);
            return results.rows;
        });
};

exports.createProject = function(userId, title, description) {
    const query =
    "INSERT INTO projects (user_id, title, description) VALUES ($1, $2 ,$3) RETURNING *";

    const params = [userId, title, description];
    return db.query(query, params).then(results => {
        return results.rows[0];
    });
};

exports.getUserProjects = function(userId) {
    const query = `SELECT * FROM projects WHERE user_id =($1);`;
    return db.query(query, [userId])
        .then(results => {
            return results.rows;
        });
};

exports.getUserProjectTasks = function(projectId) {
    const query = `SELECT * FROM tasks WHERE project_id =($1);`;
    return db.query(query, [projectId])
        .then(results => {
            return results.rows;
        });
};

exports.updateUserProject = function (userId, projectId, projectTitle, projectDescription) {
    const q =
  "UPDATE projects SET title = ($3), description = ($4) WHERE id = ($2) AND user_id = ($1)  RETURNING *;";

    const params = [userId, projectId, projectTitle, projectDescription];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};

exports.deleteProjectTasks = function (projectId) {
    const q =
  "DELETE FROM tasks WHERE project_id = ($1) RETURNING *;";

    const params = [projectId];
    return db.query(q, params).then(results => {
        return results.rows;
    });
};

exports.deleteUserProject = function (userId, projectId) {
    const q =
  'DELETE FROM projects WHERE user_id = ($1) AND id = ($2) RETURNING *;';
    const params = [userId, projectId];
    return db.query(q, params).then(results => {
        return results.rows[0];
    });
};
