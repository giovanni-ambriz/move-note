/**
 * @param { import("knex").Knex } knex
 * 
 */
export async function up(knex) {
  return knex.schema.createTable('activity', (table) => {
    table.increments('id').primary()
    table.string('name')
  })
};

/**
 * @param { import("knex").Knex } knex
 *
 */
export async function down(knex) {
  return knex.schema.dropTable('activity')
};
