#!/usr/bin/env node

/**
 * Database Initialization Script
 * Automatically sets up PostgreSQL tables and sample data
 * 
 * Usage: node dbinit.js
 */

const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: '.env.local' });

const pool = new Pool({
  user: process.env.POSTGRES_USER || 'admin',
  password: process.env.POSTGRES_PASSWORD || 'leenee_123',
  host: process.env.POSTGRES_HOST || 'localhost',
  port: parseInt(process.env.POSTGRES_PORT || '5432'),
  database: process.env.POSTGRES_DB || 'leeneeDB',
});

async function initDatabase() {
  const client = await pool.connect();
  
  try {
    console.log('🚀 Starting database initialization...\n');

    // Read and execute schema.sql
    console.log('📋 Running schema.sql...');
    const schemaPath = path.join(__dirname, 'supabase', 'schema.sql');
    const schemaSQL = fs.readFileSync(schemaPath, 'utf8');
    
    await client.query(schemaSQL);
    console.log('✅ Schema created successfully!\n');

    // Read and execute users.sql
    console.log('👤 Running users.sql...');
    const usersPath = path.join(__dirname, 'supabase', 'users.sql');
    const usersSQL = fs.readFileSync(usersPath, 'utf8');
    
    await client.query(usersSQL);
    console.log('✅ Users table created successfully!\n');

    // Verify tables exist
    console.log('🔍 Verifying tables...');
    const result = await client.query(`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `);

    console.log('\n📊 Tables created:');
    result.rows.forEach(row => {
      console.log(`   ✓ ${row.table_name}`);
    });

    console.log('\n✨ Database initialized successfully!\n');
    console.log('📝 Default Admin Credentials:');
    console.log('   Email: admin@leeneecoffee.com');
    console.log('   Password: admin123');
    console.log('\n⚠️  Please change the admin password after first login!\n');

  } catch (error) {
    console.error('\n❌ Database initialization failed:\n');
    console.error(error.message);
    console.error('\nTroubleshooting:');
    console.error('1. Check your .env.local file has correct PostgreSQL credentials');
    console.error('2. Verify PostgreSQL is running on the specified host and port');
    console.error('3. Make sure the database exists: createdb leeneeDB -U admin');
    console.error('4. Check file paths: supabase/schema.sql and supabase/users.sql\n');
    process.exit(1);
  } finally {
    client.release();
    await pool.end();
  }
}

// Run initialization
initDatabase().catch(error => {
  console.error('Fatal error:', error);
  process.exit(1);
});
