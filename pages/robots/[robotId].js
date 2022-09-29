import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { robotList } from '../../database/robots';

export default function Robot(props) {
  if (props.error) {
    return (
      <div>
        <Head>
          <title>Robot not found</title>
          <meta name="description" content="Robot not found" />
        </Head>
        <h1>{props.error}</h1>
        Sorry, try the <Link href="/robots">robots page</Link>
        {console.log('props.robot', props.robot)}
      </div>
    );
  }

  return (
    <div>
      <Head>
        <title>{props.robot.name}</title>
        <meta
          name="description"
          content={`${props.robot.name} is a ${props.robot.type}`}
        />
      </Head>
      <h1 className="text-5xl font-bold mt-0 mb-6">{props.robot.name}</h1>
      <div className="flex flex-row gap-5">
        <Image
          src={`/${props.robot.id}-${props.robot.name}.png`}
          alt={`/${props.robot.name}, the ${props.robot.type}`}
          className="flex object-scale-down mr-10 basis-2/3"
          width={300}
          height={300}
        />
        <div className="basis-1/3 font-noto">
          <div>Type: {props.robot.type}</div>
          <div>Price: {props.robot.price} €</div>
          <div>Id: {props.robot.id}</div>
          <div>Info: {props.robot.info}</div>
        </div>
      </div>
    </div>
  );
}

export function getServerSideProps(context) {
  const robotId = parseInt(context.params.robotId);

  const foundRobot = robotList.find((robot) => {
    return robot.id === robotId;
  });

  if (typeof foundRobot === 'undefined') {
    context.res.statusCode = 404;
    return {
      props: {
        error: 'Robot not found',
      },
    };
  }

  return {
    props: {
      robot: foundRobot,
    },
  };
}
