CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS emails (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) NOT NULL,  -- Changed from subject/body to email
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE
);