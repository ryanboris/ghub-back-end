
exports.up = function(knex, Promise) {
  return knex.schema.createTable('users', (tbl) => {
      tbl.increments();
      tbl.string('username', 150).notNullable().unique();
      tbl.string('password', 150).notNullable();
      tbl.timestamps(true, true);
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('users');
};
