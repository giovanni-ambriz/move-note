/**
 * @param { import("knex").Knex } knex

 */
export async function up(knex) {
  return knex.schema.alterTable('sessions', (table) => {
    table.float('distance');
  })
};

/**
 * @param { import("knex").Knex } knex

 */
export async function down(knex) {
  return knex.schema.alterTable('sessions', (table) => {
    table.dropColumn('distance')
  });
}