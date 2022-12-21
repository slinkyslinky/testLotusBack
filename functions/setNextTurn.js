export default function setNextTurn(turn, numberOfMembers) {
   if (turn === numberOfMembers) return 1
   return turn + 1
} 