#!/usr/bin/env node
// Run once to create the admin user: node setup-admin.js
require('dotenv').config({ path: '.env.local' });
const { createClient } = require('@supabase/supabase-js');
const bcrypt = require('bcryptjs');
const readline = require('readline');

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_KEY
);

const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const ask = (prompt) => new Promise(resolve => rl.question(prompt, resolve));

async function main() {
  console.log('=== LVLRC Admin User Setup ===\n');
  const username = await ask('Username: ');
  const password = await ask('Password: ');
  rl.close();

  if (!username || !password) {
    console.error('Username and password are required.');
    process.exit(1);
  }

  const hash = bcrypt.hashSync(password, 12);
  const { error } = await supabase
    .from('admin_users')
    .insert({ username: username.trim(), password_hash: hash });

  if (error) {
    console.error('\nError creating user:', error.message);
    process.exit(1);
  }
  console.log('\nAdmin user created successfully! You can now log in at /login');
  process.exit(0);
}

main();
