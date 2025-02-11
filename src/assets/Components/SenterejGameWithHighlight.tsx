import React, { useState } from 'react';
import  {Square, Chess,} from 'chess.js';
import Chessboard from 'chessboardjsx';
import CustomizedMedeqMovement from './validatingMoves';

    const SenterejGameWithHighlight = () => {
         const[game, setGame] = useState(new Chess());
         const[selectedSquare, setSelectedSquare] = useState<string | null>(null);
         const[highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({});

            const makeMove = (move: {from: string; to: string}) => {
                    const gameCopy = new Chess(game.fen());
                    const result = gameCopy.move(move);
                    if(result){
                        setGame(gameCopy);
                    }
                };
            const handleSquareClick = (square: string) => {
                    if(selectedSquare){
                        const validMoves = CustomizedMedeqMovement(game, selectedSquare as Square);
            
                        if(validMoves.includes(square)){
                            makeMove({from: selectedSquare, to: square});
                        }
                        setSelectedSquare(null);
                        setHighlightedSquares({});
                    }else{
                        const validMoves = CustomizedMedeqMovement(game, square as Square);
                        const highlightStyles: Record<string, React.CSSProperties> = {};
            
                        validMoves.forEach((move) => {
                            highlightStyles[move as Square] = {backgroundColor: "rgba(0, 255, 0, 0.5)"};
                        });
                        setSelectedSquare(square);
                        setHighlightedSquares(highlightStyles);
                    }
            
                    };

    return(
        <div>
            <Chessboard            
                position={game.fen()}
                onSquareClick={handleSquareClick}
                squareStyles={highlightedSquares}
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
                        onDrop = {({sourceSquare, targetSquare}) =>
                            ({from: sourceSquare, to: targetSquare})
                        }
            
            />
        </div>
    )
    };
    export default SenterejGameWithHighlight;