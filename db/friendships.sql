DROP TABLE IF EXISTS friendships;

CREATE TABLE friendships (
  id SERIAL PRIMARY KEY,
  sender_id INT REFERENCES users(id),
  receiver_id INT REFERENCES users(id),
  status INT DEFAULT 1,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP
<<<<<<< HEAD
);
=======
);
>>>>>>> 9815ea825ef8247ee5b5894d92eba2f74f299f0c
