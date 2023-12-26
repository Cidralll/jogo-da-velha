'use client';
import { useEffect, useState } from "react";
import _shuffle from 'lodash/shuffle';
import styles from './page.module.scss';
import validationName from "@/services/validations/name";

export default function Page() {
    const [name01, setName01] = useState<string>('');
    const [name02, setName02] = useState<string>('');
    const [player01, setPlayer01] = useState<string>('');
    const [player02, setPlayer02] = useState<string>('');
    const [spanError01, setSpanError01] = useState<string>('');
    const [spanError02, setSpanError02] = useState<string>('');

    useEffect(() => {
        localStorage.clear();
    },[]);

    const savingNameData = () => {
        // Verificando se o nome esta certo e se nao estiver mostra erro na tela | se nao tiver erro remove o span
        const resultName01 = validationName(name01);
        if (!resultName01) {setSpanError01('Informe seu primeiro nome válido'); return}
        setSpanError01(''); 
        const resultName02 = validationName(name02);
        if (!resultName02) {setSpanError02('Informe seu primeiro nome válido'); return}
        setSpanError02('');

        // Deixa apenas a inicial do nome maiuscula
        setName01(name01.charAt(0).toUpperCase() + name01.slice(1).toLowerCase());
        setName02(name02.charAt(0).toUpperCase() + name02.slice(1).toLowerCase());

        // Define de forma aleatoria quem é o jogador 01 e quem é o 02 e salva no localSotrage quem é quem
        const namesArray = [(name01.charAt(0).toUpperCase() + name01.slice(1).toLowerCase()),(name02.charAt(0).toUpperCase() + name02.slice(1).toLowerCase())];
        const shuffledNames = _shuffle(namesArray);
        let auxPlayer01 = shuffledNames[0];
        let auxPlayer02 = shuffledNames[1];
        setPlayer01(auxPlayer01);
        setPlayer02(auxPlayer02);
        localStorage.setItem('Player01',auxPlayer01);
        localStorage.setItem('Player02',auxPlayer02);

        // Direciona para pagina do jogo 
        window.location.href ='/game/start';
    }

        return (
            <>
                <section className={styles.sectionPage}>
                    <div className={styles.divInfo}>
                        <p>P 01 informe o seu nome:</p>
                        <input onChange={(event) => setName01(event.target.value)} ></input>
                        <div>
                            <span>{ spanError01 }</span>
                        </div>
                        <p>P 02 informe o seu nome:</p>
                        <input onChange={(event) => setName02(event.target.value)}></input>
                        <div>
                            <span>{ spanError02 }</span>
                        </div>
                    </div>
                    <button 
                        className={styles.buttonStart} 
                        onClick={() => savingNameData()}
                    >
                        Iniciar
                    </button>
                </section>
            </>
        );
    

}