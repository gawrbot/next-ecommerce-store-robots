module.exports = {
  extends: ['@upleveled/upleveled'],
  // plugins: ['@ts-safeql/eslint-plugin'],
  // rules: {
  //   '@ts-safeql/check-sql': [
  //     'error',
  //     {
  //       connections: [
  //         {
  //           databaseUrl: 'postgres://${process.env.PGUSERNAME}:${process.env.PGPASSWORD}@${process.env.PGHOST}:5432/${process.env.PGDATABASE}',
  //           tagName: 'sql',
  //           fieldTransform: 'camel',
  //           transform: '{type}[]',
  //         },
  //       ],
  //     },
  //   ],
  // },
};
