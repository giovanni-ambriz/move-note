export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('activity').del()

  // Inserts seed entries
  await knex('activity').insert([
    { id: 1, name: 'Running' },
    { id: 2, name: 'Walking' },
    { id: 3, name: 'Hiking' },
    { id: 4, name: 'Swimming' },
    { id: 5, name: 'Weightlifting' },
    { id: 6, name: 'Kayaking' },
    { id: 7, name: 'Skiing' },
    { id: 8, name: 'Snowboarding' },
    { id: 9, name: 'Taekwondo' },
  ])
}
