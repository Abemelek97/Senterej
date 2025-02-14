import React from 'react';

interface ChessBoardProps {
    position: string;
    onMove: (from: string, to: string) => void;
}

const SenterejBoard: React.FC<ChessBoardProps> = ({position, onMove}) => {
    return(
        <div>
        <p>Current Position: {position}</p>
        {/* Render chessboard UI here */}
        </div>
    )
}

export default SenterejBoard;