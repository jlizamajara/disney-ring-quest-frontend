import './MainPage.css'
import cenicienta from '../../../public/images/cenicienta-profile-avatar.jpg'
import hercules from '../../../public/images/hercules-profile-avatar.webp'
import rapuzel from '../../../public/images/rapunzel-profile-avatar.png'
import {Link} from 'react-router-dom'


function MainPage(){
    return (
        <div className='main-container'>
            <div className='about-game'>
                <h1 className='title'>
                ¿De qué trata Disney Ring Quest?
                </h1> 
                <p>El mundo de Disney se encuentra patas arriba.</p>
                <p>Los <span className='evil-name'>villanos</span>  de las películas han tomado posesión de los <span className='ring-name'>anillos mágicos</span> y 
                    desean conquistarlo todo.</p>
                <p>Para poder recuperarlos, deberás recorrer un largo camino, 
                    en el que te enfrentarás a estos malvados entes.</p>
                <p>El ganar depende de tu inteligencia, agilidad y fuerza.</p>
                <p className='final-question'>¿Serás el primero en salvar a todos de este terrible destino?</p>
            </div>
            <Link to="/matches">
                    <button id='go-to-game'>
                        JUGAR
                    </button> 
                </Link>
            <div className="players-container">
                <h1>Top Players</h1>
                <p>Los tres mejores jugadores de Disney Ring Quest. ¡Echa un vistazo!</p>
                <ol className="top-players">
                    <li>
                    <span className="player-position">1</span>
                    <img className="player-avatar" src={cenicienta}/>
                    <div className="player-info">
                        <p className="player-username">Trini</p>
                        <p className="player-victories">999 victorias</p>
                    </div>
                    </li>
                    <li>
                    <span className="player-position">2</span>
                    <img className="player-avatar" src={hercules}/>
                    <div className="player-info">
                        <p className="player-username">Jose</p>
                        <p classNamer="player-victories">777 victorias</p>
                    </div>
                    </li>
                    <li>
                    <span class="player-position">3</span>
                    <img class="player-avatar" src={rapuzel}/>
                    <div class="player-info">
                        <p class="player-username">Ossa</p>
                        <p class="player-victories">88 victorias</p>
                    </div>
                    </li>
                </ol>
                </div>
    

        </div>
    )
}

export default MainPage;