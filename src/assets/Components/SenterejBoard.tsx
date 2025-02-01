import React, {useState} from 'react';
import Chessboard from "chessboardjsx";
import { Chess} from "chess.js";

const Senterej: React.FC = () => {
    const [game, setGame] = useState(new Chess());
    const handleMove = (move: {from: string; to : string}) =>{
        const newGame = new Chess(game.fen());
        const moveResult = newGame.move(move);

        if(moveResult){
            setGame(newGame);
        }
    };
    return(
        <div className = "chess-container">
            <h1>Senterej</h1>
            <Chessboard
                position = {game.fen()}
                width={750}
                orientation='white'
                boardStyle={{
                    borderRadius: "12px",
                    border: "3px solid #0000ff",
                    boxShadow: `0 6px 15px rgba(0,0,0,0.4)`
                }}
                lightSquareStyle={{
                    backgroundColor: "#ff0000",
                    boxShadow: "inset 0 0 8px #0000ff"
                }}
                darkSquareStyle={{
                    backgroundColor: "#ff0000",
                    boxShadow: "inset 0 0 8px #0000ff"
                }}
                pieces={{
                 wP: ({squareWidth}) => 
                 <img
                  src = "\public\pieces\Medeq.png"
                  alt = "የ ነጭ መደቅ" 
                  style = {{width: squareWidth, height: squareWidth}}
                    />,
                bP: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\Medeq.png"
                        alt = "የ ጥቁር መደቅ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                wN: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\ferese.png"
                        alt = "የ ነጭ ፈረስ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                bN: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\ferese.png"
                        alt = "የ ጥቁር ፈረስ"
                        style = {{width: squareWidth, height: squareWidth}}
                        />,
                wB: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\saba.png"
                        alt = "የ ነጭ ሳባ"
                        style = {{width: squareWidth, height: squareWidth}}    
                    />,
                bB: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\saba.png"
                        alt = "የ ጥቁር ሳባ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                wR: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\der.png"
                        alt = "የ ነጭ ግንብ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                bR: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\der.png"
                        alt = "የ ጥቁር ግንብ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                wQ: ({squareWidth}) => 
                    <img
                        src = "\public\pieces\ferz.png"
                        alt = "የ ነጭ ፈረዛ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                bQ: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\ferz.png"
                        alt = "የ ጥቁር ፈረዛ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                    wK: ({squareWidth}) =>
                    <img
                        src = "\public\pieces\negus.png"
                        alt = "የ ነጭ ንጉስ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />,
                bK: ({squareWidth}) =>
                    <img 
                        src = "\public\pieces\negus.png"
                        alt = "የ ጥቁር ንጉስ"
                        style = {{width: squareWidth, height: squareWidth}}
                    />
                }}
                onDrop = {({sourceSquare, targetSquare}) =>
                handleMove({from: sourceSquare, to: targetSquare})
            }
            />
        </div>
        );
    };
export default Senterej;