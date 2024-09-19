import Head from "next/head";
import TaskList from "../components/TaskList";

const Home: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Task Timer</title>
        <meta name="description" content="Track your work tasks and time." />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Welcome to Task Timer</h1>
        <TaskList />
      </main>
    </div>
  );
};

export default Home;
