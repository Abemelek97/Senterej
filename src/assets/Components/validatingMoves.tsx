import React, { useState } from "react";
import Chessboard from "chessboardjsx";
import { Chess, Square, Move} from "chess.js";

const CustomizedMovement: React.FC = () => {
    const[game, setGame] = useState(new Chess());
    const[selectedSquare, setSelectedSquare] = useState<string | null>(null);
    const[highlightedSquares, setHighlightedSquares] = useState<Record<string, React.CSSProperties>>({});

    //Function to get valid moves with custom pawn rules
    const getValidMoves = (square: Square) => {
        const moves = game.moves({ square, verbose: true })
        //  custom pawn rules
        const piece = game.get(square);
        if(piece?.type === "p") {
            return moves.filter((move: Move) => {
                if(Math.abs(move.from.charCodeAt(1) - move.to.charCodeAt(1)) === 2) {
                    return false;
                }
                if(move.flags.includes("e")) {
                    return false;
                }
                return true;
            });
            
        }
            if(piece?.type === "b") {
                return moves.filter((move: Move) => {
                    if(Math.abs(move.from.charCodeAt(1) - move.to.charCodeAt(1)) === 3) {
                        return false;
                    }                 
                    return true;
                });
            }
        return moves;
    }
    const handleSquareClick = (square: Square) => {
        if(selectedSquare && highlightedSquares[square]) {
           const newGame = new Chess(game.fen());
           newGame.move({ from: selectedSquare, to: square });
           setGame(newGame);
           setSelectedSquare(null);
           setHighlightedSquares({});
        } else {
            const validMoves = getValidMoves(square);
            const newHighlightedSquares: Record<string, React.CSSProperties> = {};
            validMoves.forEach((move) => {
                newHighlightedSquares[move.to] = { backgroundColor: "rgba(0, 255, 0, 0.5)" };
            });
            setSelectedSquare(square);
            setHighlightedSquares(newHighlightedSquares);
        }
    };
    const handleBoardClick = () =>{
        setSelectedSquare(null);
        setHighlightedSquares({});
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
export default CustomizedMovement;