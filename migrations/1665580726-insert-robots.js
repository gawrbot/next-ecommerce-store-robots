const robots = [
  {
    name: 'Fink',
    type: 'Lime Robot',
    price: '456',
    info: 'Fink may become your next best robot friend. It likes to listen to your surely ecome yvery interesting thoughts and be your light at the end of the tunnel,teresti when life is hard on you. Also it comes with a soft carpet for you two to relax on!',
  },
  {
    name: 'Tivi',
    type: 'Screen Lime Robot ',
    price: '820',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Licorice',
    type: 'Gummi Bear Robot',
    price: '999',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Freaky',
    type: 'Dance Robot',
    price: '777',
    info: "I think u freaky and I like it a lot - that's Freakys motto. It will be happy to accompany you to all the raves you wish to go to. It comes with a practical built-in pill box and first aid kit.",
  },
  {
    name: 'Jumpy',
    type: 'Productivity Lime Robot',
    price: '333',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Helis',
    type: 'Productivity Productivity Robots',
    price: '1599',
    info: 'Sick of telling your child what to do? Parenting exhausts your beautiful mind and strong body? Then trust our Helis! They are more than happy to educate, wake up, console, feed, scold and love your sweethearts for you!',
  },
  {
    name: 'Fesha',
    type: 'Beauty and Confidence Robot',
    price: '870',
    info: "Isn't it beautiful? Doesn't it look content? Well, that's because it is. If you suffer from a low self-esteem, Fesha can help in so may ways: correct your posture, remove body hair while you sleep, tell you to love yourself EVERY DAY or massage your wrinkles. Get your shit together - today!",
  },
  {
    name: 'Marty',
    type: 'Pink-eyed Gummi Bear Robot',
    price: '940',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Sam',
    type: 'Drag along Robot',
    price: '290',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Ines',
    type: 'Modular Gummi Bear Robot',
    price: '540',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Boulevard',
    type: 'Paris Robot',
    price: '444',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Ninja',
    type: 'Green Point Robot',
    price: '1187',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Flyperson',
    type: 'Cupboard Robot',
    price: '557',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Dorfer',
    type: 'Lost Robot',
    price: '399',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Peel-o',
    type: 'Juice Robot',
    price: '667',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Judith',
    type: 'Light Switch Robot',
    price: '789',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Barrbara',
    type: 'Translation Robot',
    price: '822',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Lightning',
    type: 'Sporty Robot',
    price: '943',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Antler',
    type: 'Dear Robot',
    price: '767',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Funky',
    type: 'Wild Dance Robot',
    price: '654',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Hundl',
    type: 'Doge Robot',
    price: '987',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
  {
    name: 'Rooibos',
    type: 'Praying Mantis Robot',
    price: '656',
    info: 'Elit Cubilia Ultricies Duis Curabitur',
  },
];

exports.up = async (sql) => {
  await sql`
  INSERT INTO robots ${sql(robots, 'name', 'type', 'price', 'info')}
  `;
};

exports.down = async (sql) => {
  for (const robot of robots) {
    await sql`
      DELETE FROM
        robots
      WHERE
        name = ${robot.name} AND
        type = ${robot.type} AND
        price = ${robot.price} AND
        info = ${robot.info}
    `;
  }
};
