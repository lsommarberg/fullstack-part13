const { rollbackToMigration } = require('./util/db');

rollbackToMigration('20241213_00_add_is_disabled_to_users.js')
  .then(() => {
    console.log('Rolled back to specific migration');
  })
  .catch((err) => {
    console.error('Failed to roll back to specific migration', err);
  });
