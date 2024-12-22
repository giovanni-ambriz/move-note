export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('users').del()

  // Inserts seed entries
  await knex('users').insert([
    { id: 1, name: 'Giovanni', email: 'giovanni@gmail.com' },
    { id: 2, name: 'Tania', email: 'tania@gmail.com' },
    { id: 3, name: 'Scott', email: 'scott@gmail.com' },
  ])
}