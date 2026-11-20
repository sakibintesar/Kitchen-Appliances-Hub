import { spawnSync } from 'child_process';

// Apply migrations (non-interactive)
console.log('Applying migrations...');
const migrateResult = spawnSync('npx', ['wrangler', 'd1', 'migrations', 'apply', 'kitchenhub-db', '--local'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, CI: 'true' }  // CI=true makes it non-interactive
});

if (migrateResult.status !== 0) {
  console.error('Migration failed');
  process.exit(1);
}

// Seed database
console.log('Seeding database...');
const seedResult = spawnSync('npx', ['wrangler', 'd1', 'execute', 'kitchenhub-db', '--local', '--file=./scripts/seed.sql'], {
  stdio: 'inherit',
  shell: true,
  env: { ...process.env, CI: 'true' }
});

if (seedResult.status !== 0) {
  console.error('Seed failed');
  process.exit(1);
}

console.log('✅ Local database ready for build');