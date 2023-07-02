import './ChooseMatch.css';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Game from '../Game/Game'
import { AuthContext } from "../../auth/authContext";

export default function ChooseMatch() {
    const url = import.meta.env.VITE_BACKEND_URL;
    const [currentMatch, setCurrentMatch] = useState('');
    const [allMatches, setAllMatches] = useState([]);
    const [form, setForm] = useState(false);
    const [playersNewMatch, setPlayersNewMatch] = useState(0);
    const [playerId, setPlayerId] = useState(null);
    const [newMatchId, setNewMatchId] = useState(null);
    const {token, setToken} = useContext(AuthContext);
    const [userId, setUserId] = useState(null);
    const [board, setBoard] = useState(null);
    const [currentCharacter, setCurrentCharacter] = useState(null);
    const [currentUser, setCurrentUser] = useState(null); 

    useEffect(() => {
        getMatches();
        getUser();
        if (userId !== null) {
            findUser();
        }
        console.log(`userId: ${userId}`)
    }, [newMatchId, userId]);

    const getMatches = () => {
        axios.get(`${url}/matches/all`)
            .then((response) => {
                const matches = response.data;
                setAllMatches(matches);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const getUser = async () => {
        await axios.get(`${url}/users/currentUser`, {
            headers: {
                Authorization: `Bearer ${token}`
            }})
            .then((response) => {
                setUserId(response.data.userId)
              })
            .catch((error) => {
                console.log(error);
            });
    }

    const findUser = async () => {
        await axios.get(`${url}/users/user/${userId}`)
            .then((response) => {
                setCurrentUser(response.data);
            })
            .catch((error) => {
                console.log(error);
            });
    }

    const newMatch = async (nPlayers) => {
        const newMatchBody = {
            playersQty: nPlayers,
            actualTurn: 0,
            joinable: true
        }
        await axios.post(`${url}/matches`, newMatchBody)
            .then((response) => {
                console.log(response.data);
                console.log(newMatchId);
                setNewMatchId(response.data.id);
                console.log("creando partida");
                newBoard(response.data.id);
                alert(`Partida creada`);
            })
            .catch((error) => {
                alert(error);
            })

    }

    const newBoard = async (matchId) => {
        const boardBody = {
            "cases": {
                "0": { "id": "case", "number": "1" }, "1": { "id": "empty", "number": "0" }, "2": { "id": "case", "number": "13" },
                "3": { "id": "case", "number": "14" }, "4": { "id": "case", "number": "15" }, "5": { "id": "empty", "number": "0" },
                "6": { "id": "case", "number": "27" }, "7": { "id": "case", "number": "28" }, "8": { "id": "case", "number": "29" },
                "9": { "id": "empty", "number": "0" }, "10": { "id": "case", "number": "2" }, "11": { "id": "empty", "number": "0" },
                "12": { "id": "case", "number": "12" }, "13": { "id": "empty", "number": "0" }, "14": { "id": "case", "number": "16" },
                "15": { "id": "empty", "number": "0" }, "16": { "id": "case", "number": "26" }, "17": { "id": "empty", "number": "0" },
                "18": { "id": "case", "number": "30" }, "19": { "id": "empty", "number": "0" }, "20": { "id": "case", "number": "3" },
                "21": { "id": "empty", "number": "0" }, "22": { "id": "case", "number": "11" }, "23": { "id": "empty", "number": "0" },
                "24": { "id": "case", "number": "17" }, "25": { "id": "empty", "number": "0" }, "26": { "id": "case", "number": "25" },
                "27": { "id": "empty", "number": "0" }, "28": { "id": "case", "number": "31" }, "29": { "id": "empty", "number": "0" },
                "30": { "id": "case", "number": "4" }, "31": { "id": "empty", "number": "0" }, "32": { "id": "case", "number": "10" },
                "33": { "id": "empty", "number": "0" }, "34": { "id": "case", "number": "18" }, "35": { "id": "empty", "number": "0" },
                "36": { "id": "case", "number": "24" }, "37": { "id": "empty", "number": "0" }, "38": { "id": "case", "number": "32" },
                "39": { "id": "empty", "number": "0" }, "40": { "id": "case", "number": "5" }, "41": { "id": "empty", "number": "0" },
                "42": { "id": "case", "number": "9" }, "43": { "id": "empty", "number": "0" }, "44": { "id": "case", "number": "19" },
                "45": { "id": "empty", "number": "0" }, "46": { "id": "case", "number": "23" }, "47": { "id": "empty", "number": "0" },
                "48": { "id": "case", "number": "33" }, "49": { "id": "empty", "number": "0" }, "50": { "id": "case", "number": "6" },
                "51": { "id": "case", "number": "7" }, "52": { "id": "case", "number": "8" }, "53": { "id": "empty", "number": "0" },
                "54": { "id": "case", "number": "20" }, "55": { "id": "case", "number": "21" }, "56": { "id": "case", "number": "22" },
                "57": { "id": "empty", "number": "0" }, "58": { "id": "case", "number": "34" }, "59": { "id": "case", "number": "35" }
            },
            "casesQty": 60,
            "matchId": matchId
        }
        axios.post(`${url}/boards`, boardBody)
            .then((response) => {
                setBoard(response.data);
                alert(`Tablero asignado a la partida ${matchId}`);
            })
            .catch((error) => {
                alert(error);
            })
    }

    const showFormNewMatch = () => {
        return <div className='form-new-match'>
            <form onSubmit={handleSubmitMatch}>
                <label>
                    Máximo de jugadores:
                    <input
                        className="input-players" type="number" min="3" max="5"
                        onChange={(e) => { setPlayersNewMatch(Number(e.target.value)) }} />
                </label>
                <button className="join-match-button" type="submit">Aceptar</button>
            </form>
        </div>
    }

    const handleSubmitMatch = async (event) => {
        event.preventDefault();
        newMatch(playersNewMatch); 
    }

    const enterMatchNewPlayer = async () => {
        const playerBody = {
            name: currentUser.username,
            userId: userId,
            matchId: currentMatch,
            position: 0
        }
        if (userId != null) {
            try {
                const playerResponse = await axios.post(`${url}/players`, playerBody)
                console.log(playerResponse.data);
                setPlayerId(playerResponse.data.id);
                console.log(`data id: ${playerResponse.data.id}`);
            } catch (error) {
                alert("Debes iniciar sesión para poder ingresar a una partida");
            }
        }
    }

    const enterMatchCurrentPlayer = (currentMatchId, currentPlayerId) => {
        setCurrentMatch(currentMatchId);
        setPlayerId(currentPlayerId);
    }

    useEffect(() => {
        if (playerId !== null) {
            redirect(playerId);
        }
    }, [playerId]);

    const redirect = async () => {
        try {
          console.log("entra a redirect");
          console.log(playerId);
          const character = await getCharacter(playerId);
          console.log(`current character: ${character}`);
          if (character) {
            window.location.href = `https://disney-ring-quest.netlify.app/game/${currentMatch}/${playerId}`;
          } else {
            window.location.href = `https://disney-ring-quest.netlify.app/lobby/${currentMatch}/${playerId}`;
          }
        } catch (error) {
          alert(error);
        }
      };

      const getCharacter = async (pId) => {
        try {
          const response = await axios.get(`${url}/characters/player/${pId}`);
          const character = response.data[0];
          setCurrentCharacter(character);
          return character;
        } catch (error) {
          throw new Error(error);
        }
      };

    return <div className='choose-match-page'>
        <div className='container-matches'>
            <div className='title'>Elige una partida</div>
            <div className='box-sides'>
                {allMatches.map(match => (
                    <div className="match">
                        <div className='match-name'>{match.players.length}/{match.playersQty}</div>
                        <div>{match.players.length >= 1 ? "Jugadores conectados:" : ""}</div>
                        {match.players.map(player => (
                            <div className='player'>
                                {player.name}<br></br>
                            </div>
                        ))
                        }
                        <div className='chosen'>{match.id === currentMatch ? "\nPartida elegida" : ""}</div>
                        <div className='join-button'>
                            {match.players.some(player => player.userId === userId) ? (
                                <div className='has-current-user'>
                                    {match.players.map(player => {
                                        if (player.userId === userId) {
                                            return (
                                                <button
                                                    key={player.id}
                                                    className='enter-match-button'
                                                    onClick={() => enterMatchCurrentPlayer(match.id, player.id)}
                                                >
                                                    Entrar
                                                </button>
                                            );
                                        } return null;
                                    })}
                                </div>
                            ) : (
                                <div className='has-current-user'>
                                    {match.joinable ? (
                                        <button className='join-match-button' onClick={() => setCurrentMatch(match.id)}>
                                            Unirme
                                        </button>
                                    ) : (
                                        <button className='join-match-button-disabled'>
                                            Partida llena
                                        </button>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                ))}
                <div className='create-match'>
                    <button className='create-match-button' onClick={() => setForm(true)}>
                        Crear Nueva Partida
                    </button>
                    {form ? showFormNewMatch() : null}
                </div>
            </div>
            {currentMatch != "" && <div className='play'>
                <button class="lobby-button" onClick={() => enterMatchNewPlayer()}>Ir a Lobby</button>
            </div>}
        </div>
    </div>
}