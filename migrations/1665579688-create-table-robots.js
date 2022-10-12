exports.up = async (sql) => {
  await sql`
    CREATE TABLE robots (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(40) NOT NULL,
      type varchar(60) NOT NULL,
      price int NOT NULL,
      info text
    )
  `;
};

exports.down = async (sql) => {
  await sql`
    DROP TABLE robots
  `;
};
