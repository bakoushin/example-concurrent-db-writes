const runTransaction = async () => {
  const knex = require('knex')({
    client: 'pg',
    connection: {
      host: 'localhost',
      user: 'postgres',
      password: 'pass',
      database: 'test'
    }
  });
  await doTransaction(knex);
  knex.destroy();
};

const tableName = 'data';
const columnToCheck = 'eligible';

async function doTransaction(knex) {
  try {
    await knex.transaction(
      async (trx) => {
        const existingData = await trx(tableName)
          .whereNotNull(columnToCheck)
          .first('id');

        if (!existingData) {
          await trx(tableName).insert({
            [columnToCheck]: true,
            createdAt: new Date(Date.now()).toISOString()
          });
        }
      },
      { isolationLevel: 'repeatable read' }
    );
  } catch (error) {
    console.error('Transaction error:', error);
  }
}

runTransaction();
