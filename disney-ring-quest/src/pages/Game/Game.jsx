import './Game.css'
import axios, { all } from "axios";
import { useEffect, useState} from 'react';
import { useParams } from 'react-router-dom';

function Game() {
    const url = import.meta.env.VITE_BACKEND_URL;
    const { matchId, playerId } = useParams()
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const [currentMatch, setCurrentMatch] = useState(null);
    const [board, setBoard] = useState([]);
    const [allPlayers, setAllPlayers] = useState([]);
    const [play, setPlay] = useState(null);
    const [diceUrl, setDiceUrl] = useState(null);
    const [finishedMatch, setFinishedMatch] = useState(false);

    const getCharacter = async () => {
        await axios
            .get(`${url}/characters/player/${playerId}`)
            .then((response) => {
                setCurrentCharacter(response.data[0]);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const getMatch = async () => {
        await axios
            .get(`${url}/matches/partida/${matchId}`)
            .then((response) => {
                setCurrentMatch(response.data);
                setAllPlayers(response.data.players);
            })
            .catch((error) => {
                alert(error);
            });
    };

    const getBoard = async () => {
        let allCases = [];
        try {
            const response = await axios.get(`${url}/boards/match/${matchId}`);
            if (response.data && Object.keys(response.data).length > 0) {
                allCases = Object.values(response.data[0].cases);
                setBoard(allCases);
            }
        } catch (error) {
            alert(`error: ${error}`);
        }
    };

    useEffect(() => {
        getBoard();
        getCharacter();
        getMatch();
    }, [matchId, playerId, url]);

    const updateBoard = async () => {
        try {
          const response = await axios.get(`${url}/boards/match/${matchId}`);
          if (response.data && Object.keys(response.data).length > 0) {
            const allCases = Object.values(response.data[0].cases);
            setBoard(allCases);
          }
        } catch (error) {
          alert(`error: ${error}`);
        }
    };

    const calculateActualTurn = () => {
        const actualTurn = currentMatch.actualTurn;
        const actualPlayer = allPlayers[actualTurn];
        return (
            <div>
                <div className='turn'>TURNO DE</div>
                <div className='turn'>{actualPlayer.name}</div>
            </div>
        );
    };

    const canPlay = () => {
        console.log(currentMatch.actualTurn);
        const actualTurn = currentMatch.actualTurn;
        const actualPlayer = allPlayers[actualTurn];
        console.log(`actual player: ${actualPlayer.id}`);
        console.log(`player id: ${playerId}`);
        if (actualPlayer.id == playerId) {
            return true;
        }
        return false;
    };

    const handleThrowDice = () => {
        playMove();
    };

    const playMove = async () => {
        axios
          .get(`${url}/matches/partida/${matchId}/${playerId}`)
          .then((response) => {
            setPlay(response.data);
            setDiceUrl(`../../../public/images/number-${response.data.diceNumber}.png`);
          })
          .catch((error) => {
            alert(error);
          });
        await updateBoard();
      };

    const characterType = () => {
        if (play.typeCharacter === "villain") {
            return <div className='character-info'>Villano: {play.characterName}</div>
        } else if (play.typeCharacter === "helper") {
            return <div className='character-info'>Ayudante: {play.characterName}</div>
        } return <div className='character-info'></div>
    }

    const minimumRequired = () => {
        if (play.typeCharacter === "villain") {
            return <div className='minimum-hability'>Si tu {chosenHability()} es mayor a {play.minimumHability}, puedes vencerlo</div>
        } else if (play.typeCharacter === "helper") {
            return <div className='minimum-hability'> Si tu {chosenHability()} es menor a {play.minimumHability}, puedes mejorar esta habilidad</div>
        } return <div className='minimum-hability'>No hay ningún evento</div>
    }

    const chosenHability = () => {
        if (play.chosenHability == "intelligence") {
            return "inteligencia";
        } else if (play.chosenHability == "strength") {
            return "fuerza";
        } else if (play.chosenHability == "agility") {
            return "agilidad";
        }
    }

    const continuePlay = () => {
        if (play.typeCharacter === "villain" && play.winResult === true) {
            return <button className='button-continue' onClick={() => {showPlay()}}>Pelear</button>
        } else if (play.typeCharacter === "helper" && play.winResult === true) {
            return <button className='button-continue' onClick={() => {showPlay()}}>Mejorar habilidad</button>
        } else {
            return <button className='button-continue' onClick={() => {finishPlay()}}>Terminar jugada</button>
        }
    }

    const showPlay = () => {
        const actualTurn = currentMatch.actualTurn;
        const actualPlayer = allPlayers[actualTurn];
        if (play.winResult === true) {
            alert(`Venciste! Y avanzaste a la casilla ${play.newPosition}`);
            window.location.href = `hhttps://disney-ring-quest.netlify.app/game/${matchId}/${playerId}`
        } else if (play.winResult === false) {
            alert(`Perdiste :( Quedas en la casilla ${play.newPosition}`);
            window.location.href = `https://disney-ring-quest.netlify.app/game/${matchId}/${playerId}`
        }
    }

    const finishPlay = async () => {
        const actualTurn = currentMatch.actualTurn;
        const actualPlayer = allPlayers[actualTurn];
        alert(`${actualPlayer.name}: quedaste en la casilla ${play.newPosition}`)
        const bodyFinishPlay = {
            newPosition: play.newPosition,
        }
        await axios
            .post(`${url}/matches/finishPlay/${matchId}`, bodyFinishPlay)
            .then((response) => {
                if (response.data.playerWins === true) {
                    alert(`Partida finalizada, ${actualPlayer.name} gana!`)
                    redirect();
                } else { 
                    window.location.href = `https://disney-ring-quest.netlify.app/game/${matchId}/${playerId}`
                }
            })
            .catch((error) => {
                alert(error)
            })
    }

    function redirect() {
        deleteMatch();
        window.location.href = `https://disney-ring-quest.netlify.app`
    };

    useEffect(() => {
        if (!finishedMatch) {
            const interval = setInterval(() => {
                getBoard();
                getMatch();
    
              }, 7000);
          
              return () => {
                clearInterval(interval);
              };
        } else {
            window.location.href = `https://disney-ring-quest.netlify.app`;
        }
    }, []);

    const deleteMatch = async () => {
        await axios
            .delete(`${url}/matches/delete/${matchId}`)
            .then((response) => {
                setFinishedMatch(true);
                alert(response);
            })
            .catch((error) => {
                alert(error);
            })
    }

    const showDice = () => {
        if (play) {
            return (
                <div className='diceImage'>
                  <img className='dice-image' src={diceUrl}></img>
                </div>
            );
        } else {
          return <div></div>;
        }
    }

    return <div className='game-page'>
        <div className='container'>
            <div className='my-grilla'>
                <div className='item-a'>
                    <div className='my-grilla-2'>
                        {board.map(allCase => (
                            <div className={allCase.id}>
                                {allPlayers.map(player => (
                                    player.position + 1 == allCase.number ? (
                                        <img key={player.id} className='image-player-character' src={player?.character?.imageUrl} />
                                    ) : (
                                        <img key={player.id}></img>
                                    )
                                ))}
                            </div>))}
                    </div>
                </div>
                <div className='item-b'>
                    {play !== null ? (
                        <div className='working'>
                            <div className='box-sides'>
                                <div className='event-character-image' style={{ backgroundImage: `url(${play.characterImageUrl})` }}></div>
                                <div className='character-event-info'>
                                    {characterType()}
                                    {minimumRequired()}
                                </div>
                                <div className='button-continue-container'>
                                    {continuePlay()}
                                </div>
                            </div>
                        </div> 
                    ) : (
                        <div className='not-plays-yet'>
                            AUN NO HAY JUGADAS
                        </div>
                    )}
                </div>
                <div className='item-c'>
                    {currentMatch ? (calculateActualTurn()) : null}
                    {currentMatch ? (canPlay() ? (
                        <div>
                            <div className='dice'>
                                <button className='throw-dice' onClick={() => { handleThrowDice() }}>Tirar Dado</button>
                            </div>
                            <div className='dice-frame'>
                                {play !== null ? (
                                    showDice()
                                ) : (
                                    null
                                )}
                            </div>
                        </div>
                    ) : (
                        <div className='dice'>
                            <button className='throw-dice-disabled'>Espera tu turno</button>
                        </div>
                    )) : (null)}
                </div>
                <div className='item-d'>
                    <div className='sub-item-d'>
                        <div className='title-character'>
                            {currentCharacter?.name}
                        </div>
                        <div className='my-character-info'>
                            <div className='inteligence'>Inteligencia: {currentCharacter?.intelligence}</div>
                            <div className='strength'>Fuerza: {currentCharacter?.strength}</div>
                            <div className='agility'>Agilidad: {currentCharacter?.agility}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
}

export default Game;