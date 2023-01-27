import React, {useState} from 'react'

function Game({channel}) {
  const [playersInChannel, setPlayersInChannel] = useState(channel.state.watcher_count === 2);

  channel.on("user.watching.start", (event) => {
    setPlayersInChannel(event.watcher_count === 2);
  });
  if (!playersInChannel) {
    return <div> waiting for an enemy user to connect...</div>;
  }
  return <div></div>
}

export default Game;