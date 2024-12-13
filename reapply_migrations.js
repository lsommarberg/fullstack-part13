const { runMigrations } = require('./util/db');

runMigrations()
  .then(() => {
    console.log('Reapplied migrations');
  })
  .catch((err) => {
    console.error('Failed to reapply migrations', err);
  });
