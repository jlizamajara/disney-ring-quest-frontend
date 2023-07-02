import "./Rules.css"
import "../../components/ImagesSlider/ImagesSlider"
import ImagesSlider from "../../components/ImagesSlider/ImagesSlider"; 

export default function Rules() {
    const interval = 2000;
    const images_choose_character = [
        "../../../public/images/choose-character-1.png",
        "../../../public/images/choose-character-2.png"
    ];
    const images_play_dice = [
        "../../../public/images/turn-dice-1.png",
        "../../../public/images/turn-dice-2.png",
        "../../../public/images/turn-dice-3.png",
        "../../../public/images/turn-dice-4.png"
    ];
    return <div className="rules-page">
        <div className="container-rules">
            <div className="wrapper">
                <div className="title">
                    Reglas del Juego
                </div>
                <div className="container-columns">
                    <div className="left">
                        <h2 id="rules" >Objetivo</h2>
                        <p>Recorrer el mapa desafiando a las distintas criaturas
                            con los objetos especiales, para finalmente obtener el
                            anillo antes que los otros jugadores. </p>

                        <h2 id="rules" >Mapa</h2>
                        <p>El mapa consiste en un tablero serpenteante con celdas
                            cuadradas, en donde al pasar un turno, cada jugador se
                            moverá a una celda en específico. En esta celda descubrirá
                            si esta contiene algún objeto especial o alguna criatura
                            que combatir, el último caso es que esta esté exenta de
                            eventos especiales. En la última celda está el anillo con
                            el cual se gana.</p>
                        <h2 id="rules" >Personajes</h2>
                        <p>Los personajes que se pueden elegir corresponden a los de Disney.
                            Cada uno de ellos tiene distintas características que son diferentes
                            entre cada personaje (estas son fuerza, agilidad e inteligencia).</p>
                        <div className="box-sides">
                            <div className='character-image-r'>
                                <div id='cinderella-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='hercules-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='rapunzel-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='mowgli-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='ariel-image'></div>
                            </div>
                        </div>

                        <h2 id="rules">Villanos</h2>
                        <p>Dentro del juego hay muchos villanos que pueden aparecer, cada uno requerirá 
                            una habilidad distinta para combatirlo. Si tu personaje supera la habilidad, 
                            podrás quedarte en tu casilla actual, pero si no, te devolverás 3 casillas.
                        </p>
                        <div className="box-sides">
                        <div className='character-image-r'>
                                <div id='lucifer-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='hades-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='gothel-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='share-kan-image'></div>
                            </div>
                            <div className='character-image-r'>
                                <div id='ursula-image'></div>
                            </div>
                        </div>                    
                    </div>
                    <div className="right">

                        <h2 id="rules" >Ruta de Juego</h2>
                        <ul>
                            <li>Paso 1: ingresar a la sala de espera y elegir un personaje
                                de los que quedan disnponibles.
                                <ImagesSlider interval={interval} images={images_choose_character} />
                            </li>
                            <li>Paso 2: todos los jugadores tienen la misma casilla inicial, al
                                comienzo del tablero. El orden de jugadas está dada por el ingreso
                                a la sala de espera.
                                <div className="first-case"></div>
                            </li>
                            <li>Paso 3: si es tu turno, el botón del dado estará disponible para presionarlo,
                                si no deberás esperar a que jueguen los otros participantes. Cuando sea tu
                                turno podrás lanzar el dado y te mostrará cuántas casillas puedes avanzar.
                            </li>
                            <li>Paso 4: avanzar el número de casillas que indique el dado y esperar el evento 
                                aleatorio.
                            </li>
                            <li>Paso 4.1: recoger objeto especial que te ayudará para avanzar más casillas.</li>
                            <li>Paso 4.2: enfrentamiento con villano que te puede hacer retroceder o mantenerte 
                                en tu lugar.
                                <ImagesSlider interval={interval} images={images_play_dice} />
                            </li>
                            <li>Paso 4.3: parada libre, solo debes esperar, no hay ningún evento.</li>
                            <li>Paso 5: el primero en llegar a la última casilla, recoge el anillo y salvará a 
                                todos.</li>

                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
}