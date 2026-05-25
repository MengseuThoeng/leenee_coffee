-- Create users table for authentication
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create index for email lookup
CREATE INDEX idx_users_email ON users(email);

-- Insert default admin user (password: admin123 - hashed with bcrypt)
-- You should change this password after first login!
-- To generate a new hash: bcrypt.hashSync('your-password', 10)
INSERT INTO users (email, password_hash, is_admin) VALUES
('admin@leeneecoffee.com', '$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcg7b3XeKeUxWdeS86E36CHhzPm', true)
ON CONFLICT (email) DO NOTHING;
