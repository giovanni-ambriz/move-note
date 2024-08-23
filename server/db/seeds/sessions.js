export async function seed(knex) {
  // Deletes ALL existing entries
  await knex('sessions').del()

  // Inserts seed entries
  await knex('sessions').insert([
    { id: 1, user_id: 1, date: '2024-08-19', time: '2024-08-19 06:30:00', activity_id: 1, notes: 'Very good run', duration: 25, distance: 5.0 },
    { id: 2, user_id: 1, date: '2024-08-20', time: '2024-08-20 07:30:00', activity_id: 2, notes: 'Good walk along the lake', duration: 15, distance: 1.2 },
    { id: 3, user_id: 1, date: '2024-08-21', time: '2024-08-21 14:30:00', activity_id: 2, notes: 'Left knee got slightly sore after 30min walk', duration: 45, distance: 3.2 },
  ]);
};
