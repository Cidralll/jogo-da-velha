'use client';
import { useEffect, useState } from "react";
import styles from './page.module.scss';
import IconXLg from "@/icons/IconXLg";
import IconBxCircle from "@/icons/IconBxCircle";
import checkingTheWinner from "@/services/validations/checkingTheWinner";
import Card from "../components/card/card";

export default function Page() {
    const [player01, setPlayer01] = useState<string>('');
    const [player02, setPlayer02] = useState<string>('');
    const [scorePlayer01, setScorePlayer01] = useState<number>(0);
    const [scorePlayer02, setScorePlayer02] = useState<number>(0);
    const [currentPlayerTitle, setCurrentPlayerTitle] = useState<string>(':D'); // Mostra na tela o jogador atual
    const [currentPlayer, setCurrentPlayer] = useState<string>('player01');     // Define qual jogador esta na vez de jogar
    const [winner, setWinner] = useState<string>('');
    const initialMoves = {1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0, 7: 0, 8: 0, 9: 0,};
    const [moves, setMoves] = useState(initialMoves);

    // Quando a pagina é acessada
    useEffect(() => {
        let auxPlayer01 = localStorage.getItem('Player01');
        let auxPlayer02 = localStorage.getItem('Player02');
        let auxScorePlayer01 = localStorage.getItem('ScorePlayer01'); 
        let auxScorePlayer02 = localStorage.getItem('ScorePlayer02');

        // Se algum dos parametros nao existir no localstorage vai redirecionar para a pagina inicial
        if (auxPlayer01 === null || auxPlayer02 === null) {
            window.location.href ='/game';
        }else { // Se existir define eles
            setPlayer01(auxPlayer01);
            setPlayer02(auxPlayer02);
            setCurrentPlayerTitle(auxPlayer01);
        }

        // Se possuir um placar salvo no localstorage define os valores
        if (auxScorePlayer01 !== null) {
            setScorePlayer01(parseInt(auxScorePlayer01));
        }
        if (auxScorePlayer02 !== null) {
            setScorePlayer02(parseInt(auxScorePlayer02));
        }
    },[]);

    // Quando moves muda verifica se teve um vencedor
    useEffect(() => {
        const resultTheWinner = parseInt(checkingTheWinner(moves)); // Chama function para verificar se alguem ja ganhou
        if (resultTheWinner === 1) {
            setWinner(`${player01}, você ganhou essa rodada!`);
            setScorePlayer01(scorePlayer01 + 1);
            localStorage.setItem('ScorePlayer01', (`${scorePlayer01 + 1}`));
            setCurrentPlayer('');
            setCurrentPlayerTitle('');
        }else if (resultTheWinner === 2) {
            setWinner(`${player02}, você ganhou essa rodada!`);
            setScorePlayer02(scorePlayer02 + 1);
            localStorage.setItem('ScorePlayer02', (`${scorePlayer02 + 1}`));
            setCurrentPlayer('');
            setCurrentPlayerTitle('');
        }
    },[moves]);

    // Função que é chamada quando um jogador faz uma escolha
    const handleChoice = (index:number) => {
        if (winner === '') { // Só executa se nao tiver um vencedor, pois se tiver nao é permitido fazer mais jogadas
            // Redefine a lista de movimentos e só é executada se nao tiver sido realizado alguma escolha 
            setMoves((prevMoves) => {
                if (currentPlayer === 'player01' && moves[index as keyof typeof moves] === 0) {
                    setCurrentPlayer('player02');    // Troca o jogador
                    setCurrentPlayerTitle(player02); // Atualiza o título para o Player 02
                    return {
                      ...prevMoves,   // Copia todas as chaves e valores do objeto anterior
                      [index]: 1,     // Atualiza o valor da chave do index para 1 que equivale a X
                    };
                }else if (currentPlayer === 'player02' && moves[index as keyof typeof moves] === 0) {
                    setCurrentPlayer('player01');    // Troca o jogador
                    setCurrentPlayerTitle(player01); // Atualiza o título para o Player 01
                    return {
                        ...prevMoves,   // Copia todas as chaves e valores do objeto anterior
                        [index]: 2,     // Atualiza o valor da chave do index para 2 que equivale a O
                    };
                }else {
                    return {
                        ...prevMoves,  // Se o campo já tiver sido 
                    };
                }
            });
        }
    };

    // Para reiniciar a rodada
    const restartGame = () => {
        setCurrentPlayerTitle(player01);
        setCurrentPlayer('player01');
        setWinner('');
        setMoves(initialMoves);
    }

    // Para sair da pagina e limpar o localstorage
    const exitPage = () => {
        localStorage.clear();
        window.location.href = '/game';
    }

    return (
        <>
            <section className={styles.section}>
                <div className={styles.divScore}>
                    <h1>{ `${player01} ${scorePlayer01} X ${scorePlayer02} ${player02}` }</h1>
                </div>
                <div className={styles.divScore}>
                    <h1>{ `${currentPlayerTitle}` }</h1>
                </div>
                <div className={styles.divScore}>
                    <h1>{ `${winner}` }</h1>
                </div>
                <section className={styles.sectionGame}>
                    <div className={styles.divGame}>
                        <div className={styles.divSection}>
                            <Card handleChoice={handleChoice} number={1} moves={moves} className={`${styles.divButton} ${styles.divBorderBottom}`} />
                            <Card handleChoice={handleChoice} number={2} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft} ${styles.divBorderBottom}`} />
                            <Card handleChoice={handleChoice} number={3} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft} ${styles.divBorderBottom}`} />
                        </div>
                        <div className={styles.divSection}>
                            <Card handleChoice={handleChoice} number={4} moves={moves} className={`${styles.divButton} ${styles.divBorderBottom}`} />
                            <Card handleChoice={handleChoice} number={5} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft} ${styles.divBorderBottom}`} />
                            <Card handleChoice={handleChoice} number={6} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft} ${styles.divBorderBottom}`} />
                        </div>
                        <div className={styles.divSection}>
                            <Card handleChoice={handleChoice} number={7} moves={moves} className={`${styles.divButton}`} />
                            <Card handleChoice={handleChoice} number={8} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft}`} />
                            <Card handleChoice={handleChoice} number={9} moves={moves} className={`${styles.divButton} ${styles.divBorderLeaft}`} />
                        </div>
                    </div>
                </section>
                <section className={styles.sectionButtons}>
                    <div className={styles.divButtons}>
                        <button onClick={() => exitPage()}> Sair </button>
                        <button onClick={() => restartGame()}> Reiniciar </button>
                    </div>
                </section>
            </section>
        </>
    );
}