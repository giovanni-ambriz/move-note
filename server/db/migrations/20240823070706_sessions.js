/**
 * @param { import("knex").Knex } knex
 */
export async function up(knex) {
  return knex.schema.createTable('sessions', (table) => {
    table.increments('id').primary()
    table.integer('user_id').references('id').inTable('users').onDelete('CASCADE')
    table.date('date')
    table.timestamp('time')
    table.integer('activity_id').references('id').inTable('activity').onDelete('CASCADE')
    table.text('notes')
  })
};

/**
 * @param { import("knex").Knex } knen
 */
export async function down(knex) {
  return knex.schema.dropTable('sessions')
};
