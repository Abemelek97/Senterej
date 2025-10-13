import React, { useState, useEffect } from "react";
import { Chess, Square } from "chess.js";
import SenterejGameWithHighlight from "./SenterejGameWithHighlight";
import CustomizedMedeqMovement from "./validatingMoves";

interface Props{
  timeLimit: number;
  humanColor: "w" | "b";
}
const V: Record<string, number> = { p: 100, n: 320, b: 330, r: 500, q: 900, k: 0 };
function evaluateMaterial(g: Chess): number {
  let score = 0;
  for (const row of g.board()) {
    for (const cell of row) {
      if (!cell) continue;
      score += cell.color === "w" ? (V[cell.type] || 0) : -(V[cell.type] || 0);
    }
  }
  return score; // + = White better
}

const AIChessGame: React.FC<Props> = ({ timeLimit, humanColor }) => {
  const [fen, setFen] = useState<string>("start");
  const aiColor: "w" | "b" = humanColor === "w" ? "b" : "w";

  const onExternalMove = (from: string, to: string) => {
    const g = new Chess(fen === "start" ? undefined : fen);
    const piece = g.get(from as any);
    const needPromo = piece?.type === "p" && (to[1] === "1" || to[1] === "8");
    const mv = g.move(needPromo ? { from, to, promotion: "q" } : { from, to });
    if (!mv) return;
    setFen(g.fen());
  };

  useEffect(() => {
    const g = new Chess(fen === "start" ? undefined : fen);
    if (g.turn() !== aiColor) return;

    const t = setTimeout(() => {
      const moves: { from: Square; to: Square }[] = [];
      const files = "abcdefgh".split("");
      const ranks = "12345678".split("");

      for (const f of files) {
        for (const r of ranks) {
          const sq = (f + r) as Square;
          const piece = g.get(sq as any);
          if (!piece || piece.color !== aiColor) continue;
          const targets = CustomizedMedeqMovement(g, sq);
          for (const to of targets) {
            const test = new Chess(g.fen());
            const p2 = test.get(sq as any);
            const promo = p2?.type === "p" && (to[1] === "1" || to[1] === "8");
            if (test.move(promo ? { from: sq, to, promotion: "q" } : { from: sq, to } as any)) {
              moves.push({ from: sq, to: to as Square });
            }
          }
        }
      }

      if (!moves.length) return;

      let best = moves[0];
      let bestScore = aiColor === "w" ? -Infinity : Infinity;

      for (const mv of moves) {
        const t2 = new Chess(g.fen());
        const p2 = t2.get(mv.from as any);
        const promo = p2?.type === "p" && (mv.to[1] === "1" || mv.to[1] === "8");
        t2.move(promo ? { from: mv.from, to: mv.to, promotion: "q" } : { from: mv.from, to: mv.to });
        const score = evaluateMaterial(t2);
        if (aiColor === "w" ? score > bestScore : score < bestScore) {
          bestScore = score;
          best = mv;
        }
      }

      onExternalMove(best.from, best.to);
    }, 300);

    return () => clearTimeout(t);
  }, [fen, aiColor]);

  return (
    <SenterejGameWithHighlight
      externalFen={fen}
      onExternalMove={onExternalMove}
      playerColor={humanColor}
      timeLimit={timeLimit}
    />
  );
};

export default AIChessGame;