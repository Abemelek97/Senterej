import React, { useState, useEffect } from 'react';
import  {Square, Chess,} from 'chess.js';
import Chessboard from 'chessboardjsx';
import CustomizedMedeqMovement from './validatingMoves';
import {motion} from 'framer-motion';

    const SenterejGameWithHighlight = () => {
         const[game, setGame] = useState<Chess>(new Chess());
       
         const[selectedSquare, setSelectedSquare] = useState<string | null>(null);
         const [gameOverMessage, setGameOverMessage] = useState<string | null>(null);
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
                    useEffect(() => {
                        if(game.isCheckmate()){
                          setGameOverMessage(`ውጣ በቃ! ${game.turn() === "w" ? "Black" : "ነጭ"} አሸንፏል!`);
                         
                        }
                        else if(game.isDraw()){
                          setGameOverMessage("መና ነው");
                        }else{
                          setGameOverMessage(null);
                        }
                      }, [game]);
               
    return(
        <div className="chess-game" >           
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
             {gameOverMessage && (
                            <motion.div
                              className="absolute inset-0 flex items-center justify-center  bg-opacity-50"
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            >
                              <motion.div
                                className="bg-black p-6 rounded-lg shadow-lg"
                                initial={{ scale: 0.8 }}
                                animate={{ scale: 1 }}
                                transition={{ type: "spring", stiffness: 150 }}
                              >
                                <h2 className="text-2xl font-bold text-center">{gameOverMessage}</h2>
                                <button
                                  onClick={() => window.location.reload()} // Restart game
                                  className="mt-4 w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg transition"
                                >
                                 እንደገና አስጀምር
                                </button>
                              </motion.div>
                            </motion.div>
                          )}            
        </div>
    )
    };
    export default SenterejGameWithHighlight;