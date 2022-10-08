import { sql } from './connect';

export type Robot = {
  id: number;
  name: string;
  type: string;
  price: string;
  info: string;
};

// Get all robots
export async function getRobots() {
  const robots = await sql<Robot[]>`
    SELECT * FROM robots
  `;
  return robots;
}

// Get a single robot by id
export async function getRobotById(id: number) {
  const [robot] = await sql<Robot[]>`
    SELECT
      *
    FROM
      robots
    WHERE
      id = ${id}
  `;
  return robot;
}

export async function createRobot(
  id: number,
  name: string,
  type: string,
  price: string,
  info: string,
) {
  const [robot] = await sql<Robot[]>`
    INSERT INTO robots
      (name, type, price, info)
    VALUES
      (${name}, ${type}, ${price}, ${info})
    RETURNING *
  `;
  return robot;
}

export async function updateRobotById(
  id: number,
  name: string,
  type: string,
  price: string,
  info: string,
) {
  const [robot] = await sql<Robot[]>`
    UPDATE
      robots
    SET
      name = ${name},
      type = ${type},
      price = ${price},
      info = ${info}
    WHERE
      id = ${id}
    RETURNING *
  `;
  return robot;
}

export async function deleteRobotById(id: number) {
  const [robot] = await sql<Robot[]>`
    DELETE FROM
      robots
    WHERE
      id = ${id}
    RETURNING *
  `;
  return robot;
}
