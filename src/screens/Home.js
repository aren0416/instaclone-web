import { logUserOut } from "../apollo";

function Home() {
  return (
    <div>
      <h1>환영해 무야호~</h1>
      <button onClick={() => logUserOut()}>로그아웃</button>
    </div>
  );
}

export default Home;
