import React, {useState} from 'react';
import TicTacToe from './TicTacToe';

function Game({channel, setChannel}) {
  const [playersInChannel, setPlayersInChannel] = useState(channel.state.watcher_count === 2);
  const [result, setResult] = useState({winner: "none", state: "none"});

  channel.on("user.watching.start", (event) => {
    setPlayersInChannel(event.watcher_count === 2);
  });
  if (!playersInChannel) {
    return <div className='waiting'> waiting for an enemy user to connect...</div>;
  }
  return (
  <div className='game'>
    {result.state === "Won" && <div className='result'>{result.winner} Won</div>}
    {result.state === "Draw" && <div className='result'>Draw</div>}
    <TicTacToe result={result} setResult={setResult}/>
    <button onClick={async () => {
      await channel.stopWatching();
      setChannel(null);
    }}><h5> Complete Game <span></span><span></span><span></span><span></span></h5></button>
  </div>
  );
}

export default Game;