import React, {useState} from 'react';
import Area from './Area';
import {useChannelStateContext, useChatContext} from 'stream-chat-react'; 
import {scenarios} from './Winning'
import { useEffect } from 'react';

function TicTacToe({result, setResult}) {
  const [field, setField] = useState(["", "", "", "", "", "", "", "", ""]);
  const [user, setUser] = useState("X");
  const [turn, setTurn] = useState("X");
  const {channel} = useChannelStateContext();
  const {client} = useChatContext();

  useEffect(() => {
    checkDraw();
    checkWin();
  }, [field]);

  const chooseArea = async (area) => {
    if  (user === turn && field[area] === "") {

      await channel.sendEvent({
        type: "game-move",
        data: {
          area, user
        }
      });
      setField(field.map((val, index) => {
        if(index === area && val === ""){
            return user;
        }
        return val;
      }));
      setTurn(turn === "X"? "O" : "X");  
    }
  };

  channel.on((event) => {
    if (event.type === "game-move" && event.user.id !== client.userID) {
      const currentUser = event.data.user === "X" ? "O" : "X";
      setUser(currentUser);
      setTurn(currentUser);  
      setField(field.map((val, index) => {
          if(index === event.data.area && val === ""){
            return event.data.user;
          }
          return val;
      }));
    }
  });

  const checkWin = () => {
    scenarios.forEach((currentScenario) => {
      const firstUser = field[currentScenario[0]]
      if(firstUser === "") {
        return;
      }
      let foundWinningUser = true;
      currentScenario.forEach((index) => {
        if(field[index] != firstUser) {
          foundWinningUser = false; 
        }
      });
      if(foundWinningUser) {
        setResult({winner: field[currentScenario[0]], state: "Won"});
      }
    });
  };

  const checkDraw = () => {
    let filled = true;
    field.forEach((area) => {
        if(area === "") {
            filled = false;
        }
    });
    if(filled) {
        setResult({winner: "none", state : "Draw"});
    }
  };

  return (
    <div className='tictactoe'>
      <div className="row"> 
        <Area chooseArea={() => chooseArea(0)} value={field[0]}/>
        <Area chooseArea={() => chooseArea(1)} value={field[1]}/>
        <Area chooseArea={() => chooseArea(2)} value={field[2]}/>
      </div>
      <div className="row"> 
        <Area chooseArea={() => chooseArea(3)} value={field[3]}/>
        <Area chooseArea={() => chooseArea(4)} value={field[4]}/>
        <Area chooseArea={() => chooseArea(5)} value={field[5]}/>
      </div>
      <div className="row"> 
        <Area chooseArea={() => chooseArea(6)} value={field[6]}/>
        <Area chooseArea={() => chooseArea(7)} value={field[7]}/>
        <Area chooseArea={() => chooseArea(8)} value={field[8]}/>
      </div>
    </div>
  )
}

export default TicTacToe;