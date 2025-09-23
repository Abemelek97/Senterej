// src/components/customPieces.tsx
import React from "react";
import Medeq from "../assets/pieces/Medeq.png";   // Pawn
import Ferese from "../assets/pieces/ferese.png"; // Bishop
import Negus from "../assets/pieces/negus.png";   // King

const pieceStyle = { width: "100%", height: "100%" };

const customPieces: Record<string, JSX.Element> = {
  // Pawns
  wP: <img src={Medeq} alt="White Pawn" style={pieceStyle} />,
  bP: <img src={Medeq} alt="Black Pawn" style={{ ...pieceStyle, filter: "brightness(0.4)" }} />,

  // Bishops (Ferese)
  wB: <img src={Ferese} alt="White Bishop" style={pieceStyle} />,
  bB: <img src={Ferese} alt="Black Bishop" style={{ ...pieceStyle, filter: "brightness(0.4)" }} />,

  // Kings (Negus)
  wK: <img src={Negus} alt="White King" style={pieceStyle} />,
  bK: <img src={Negus} alt="Black King" style={{ ...pieceStyle, filter: "brightness(0.4)" }} />,
};

export default customPieces;
