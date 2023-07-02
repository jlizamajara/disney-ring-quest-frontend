import './Lobby.css';
import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from "axios";

export default function Lobby() {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { matchId, playerId } = useParams();
    const [currentCharacter, setCurrentCharacter] = useState("");
    const [allCharacters, setAllCharacters] = useState([]);
    const [charactersInUse, setCharactersInUse] = useState([]);
    const [currentPlayer, setCurrentPlayer] = useState(null);

    useEffect(() => {
        getPlayer();
        axios.get(`${url}/characters/allDefault`)
            .then((response) => {
                const characters = response.data;
                setAllCharacters(characters);
            })
            .catch((error) => {
                console.log(error);
            });
        usedCharacters();
    }, [matchId]);

    const getPlayer = async () => {
        await axios
            .get(`${url}/players/${playerId}`)
            .then((response) => {
                setCurrentPlayer(response.data);
            })
            .catch((error) => {
                alert(error);
            })
    }

    const newCharacter = async () => {
        await axios.post(`${url}/characters`, {
            name: currentCharacter.name,
            type: "player",
            intelligence: currentCharacter.intelligence,
            strength: currentCharacter.strength,
            agility: currentCharacter.agility,
            playerId: playerId,
            imageUrl: currentCharacter.imageUrl
        })
            .then((response) => {
                alert(`Personaje asignado a jugador ${playerId}`);
                redirect();
            })
            .catch((error) => {
                alert(error)
            })
    }

    const usedCharacters = async () => {
        await axios
            .get(`${url}/matches/partida/${matchId}`)
            .then((response) => {
                console.log("partida: ")
                console.log(response.data);
                const allPlayers = response.data.players;
                allPlayers.map((player) => (
                    player.character ? (charactersInUse.push(player.character)) : charactersInUse
                ))
            })
            .catch((error) => {
                alert(error);
            })
        console.log(charactersInUse);
    }

    function redirect() {
        window.location.href = `https://disney-ring-quest.netlify.app/game/${matchId}/${playerId}`
    };

    return <div className='lobby-page'>
        <div className='container-lobby'>
            {currentPlayer ? (
                <div className='title'>Hola, @{currentPlayer.name}! Elige tu personaje</div>
            ) : (
                <div className='title'>Hola! Elige tu personaje</div>
            )}
            <div className='box-sides'>
                {allCharacters.map(character => {
                    const isCharacterInUse = charactersInUse.some(c => c.name === character.name);
                    return (
                        <div className="character" key={character.name}>
                            <div className='character-image'>
                                <div id={character.name}></div>
                            </div>
                            <div></div>
                            <div className='character-info'>
                                <div className='character-inteligence'>Inteligencia: {character.intelligence}</div>
                                <div className='character-strength'>Fuerza: {character.strength}</div>
                                <div className='character-agility'>Agilidad: {character.agility}</div>
                            </div>
                            <div className='chosen-character'>{character === currentCharacter ? "\nPersonaje elegido" : ""}</div>
                            {isCharacterInUse ? (
                                <button className='choose-character-disabled'>
                                    No disponible
                                </button>
                            ) : (
                                <button className='choose-character' onClick={() => setCurrentCharacter(character)}>
                                    Elegir
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>

            {currentCharacter != "" && <div className='play'>
                <button class="play-button" onClick={() => { newCharacter() }}>¡JUGAR!</button>
            </div>}
        </div>
    </div>
}