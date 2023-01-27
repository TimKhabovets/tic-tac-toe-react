import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';

function JoinGame() {
  const [enemyUsername, setEnemyUsername] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();

  const createChannel = async () => {
    const res = await client.queryUsers({ name: { $eq: enemyUsername } });

    if (res.users.length === 0) {
      alert('Can not found enemy user');
      return;
    }

    const newChannel = await client.channel("messaging", {
      members: [client.userID, res.users[0].id],
    });

    await newChannel.watch();
    setChannel(newChannel);
  }

  return (
    <>
      {channel ? (
        <Channel channel={channel}>
          <Game channel={channel}/>
        </Channel>
        
      ) : (
        <div className='createGame'>
          <h3>Create Game</h3>
          <input placeholder='enemy username' onChange={(event) => { setEnemyUsername(event.target.value) }} />
          <button onClick={createChannel}>Start/Create</button>
        </div>
        )}
    </>
  )
}

export default JoinGame;