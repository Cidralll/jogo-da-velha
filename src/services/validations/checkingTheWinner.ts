export default function checkingTheWinner(moves: { [key: number]: number }): string {
    // Possibilidades de vitoria
    const winPatterns = [
        [1, 2, 3],
        [4, 5, 6],
        [7, 8, 9],
        [1, 4, 7],
        [2, 5, 8],
        [3, 6, 9],
        [1, 5, 9],
        [3, 5, 7],
    ];
      
    // Verifica se algum usuario ganhou 
    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (moves[a] === 1 && moves[b] === 1 && moves[c] === 1) {
            return '1'; // Se X ganhou retorna 1
        } else if (moves[a] === 2 && moves[b] === 2 && moves[c] === 2) {
            return '2'; // Se O ganhou retorna 2
        }
    }
    return '0'; // Se nenhum ganhou retorna 0
}
      