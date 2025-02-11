import {Square, Move} from "chess.js";

const CustomizedMedeqMovement = (game: any, square: Square) => {
    const moves= game.moves({square, verbose: true}) as Move[];

    const piece = game.get(square);
    if(!piece) return[];

        //Custom Medeq Movement Logic
    if(piece.type === "p"){
        return moves
        .filter((move: Move) => {
            if(Math.abs(move.from.charCodeAt(1) - move.to.charCodeAt(1)) === 2)
                return false;
            if(move.flags.includes("e"))
                return false;
            return true;
        })
            .map((move: Move) => move.to);
    }
            //Custom Saba Movement Logic
           if(piece.type === "b"){
                return moves
                .filter((move: Move) => {
                    const fileDiff = Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0));
                    const rankDiff = Math.abs(move.from.charCodeAt(1) - move.to.charCodeAt(1));
                    return fileDiff === rankDiff && fileDiff <= 2;
                })
                .map((move: Move) => move.to as string);
            }
            //Custom Ferz Movement Logic
            if(piece.type === "q"){
                return moves.filter((move) => {
                    const fileDiff = Math.abs(move.from.charCodeAt(0) - move.to.charCodeAt(0));
                    const rankDiff = Math.abs(move.from.charCodeAt(1) - move.to.charCodeAt(1));
                    return fileDiff === 1 && rankDiff === 1;
                })
                .map((move) => move.to as string);
            }
            return moves.map((move: Move) => move.to as string || []);
        };
    export default CustomizedMedeqMovement;;