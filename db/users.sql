DROP TABLE IF EXISTS users;

CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  email VARCHAR(200) NOT NULL UNIQUE,
  hashed_password VARCHAR(255) NOT NULL,
  image_url VARCHAR(255),
  bio TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
<<<<<<< HEAD
);
=======
);
>>>>>>> 9815ea825ef8247ee5b5894d92eba2f74f299f0c
