DROP TABLE IF EXISTS images;

CREATE TABLE images (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  image_urls VARCHAR(255)
);


-- INSERT INTO images (user_id,image_urls) VALUES (1,'yGBwQQToAcs6lQCWmD197C5uXBSV0P2e.jpg');
-- INSERT INTO images (user_id,image_urls) VALUES (3,'TXj4vz-g46X-61L4c1KSpGujfoOlt2TV.jpg');
-- INSERT INTO images (user_id,image_urls) VALUES (4,'8vm9pCmvtkvwOMvNTsaugD00fWJnCrx2.jpg');
<<<<<<< HEAD
-- INSERT INTO images (user_id,image_urls) VALUES (5,'JwUDu5cPMAASBjYu4ksCl4Ys34XJmOJx.jpg');
=======
-- INSERT INTO images (user_id,image_urls) VALUES (5,'JwUDu5cPMAASBjYu4ksCl4Ys34XJmOJx.jpg');
>>>>>>> 9815ea825ef8247ee5b5894d92eba2f74f299f0c
