import { PageStateType, StateType, ActionsType, SendMessage, GetMessage, CellType } from './../types/types';
import React, { Dispatch } from 'react'
import { actions } from '../store/store';


export const useWebSocket = (
    state: StateType,
    dispatch: Dispatch<ActionsType>,
    pushScreen: (to: keyof PageStateType | '' | -1) => void,
    // setCells?: (cells: CellType[]) => void
    nextMove?: (cells?: CellType[]) => void
) => {

    const [wsConnect, setWsConnect] = React.useState({})

    const socket = React.useRef<WebSocket>()
    React.useEffect(() => {
        const wsConnect = () => {
            // socket.current = new WebSocket('ws://ws-typescript-test.herokuapp.com/')
            socket.current = new WebSocket(
                process.env.NODE_ENV === 'development' ?
                    `ws://localhost:5000/?token=${state.userId}` :
                    'wss://balda-scenario-sber.herokuapp.com/'
            )

            socket.current.onopen = () => {
                console.log('socket started')
                setWsConnect({})
                socket.current?.send(JSON.stringify({
                    type: 'RANDOM',
                    payload: {
                        userId: state.userId,
                        name: state.name
                    }
                } as SendMessage))
            }
            socket.current.onclose = () => {
                console.log('socket closed')
                console.log('reconnecting...')
                wsConnect()
            }
        }
        state.isMultiplayer && wsConnect()
        return () => {
            if (socket.current) {
                socket.current.onclose = () => {
                    console.log('socket closed')
                }
                socket.current?.close()
            }
        }
    }, [])

    React.useEffect(() => {
        console.log('useEffect WSMessage, socket.current =', socket.current)
        if (socket.current) socket.current.onmessage = (event) => {
            const message = JSON.parse(event.data) as GetMessage
            console.log('WS message', message)
            switch (message.type) {
                case 'FOUND':
                    dispatch(actions.setOpponent({
                        name: message.payload.opponentName,
                        userId: message.payload.opponentId,
                        roomId: Number(message.payload.roomId)
                    }))
                    break
                case 'START':
                    pushScreen('play')
                    break
                case 'START_WORD':
                    dispatch(actions.setStartWord(message.payload.startWord))
                    break
                case 'CHANGE_PLAYGROUND_SIZE':
                    dispatch(actions.setPlayGroundSize(message.payload.size))
                    break
                case 'WORD_DONE':
                    console.log('currentPlayerNumber', state.currentPlayerNumber)
                    dispatch(actions.addPlayerWord(state.currentPlayerNumber, message.payload.newWord))
                    console.log('INCREMENT SCORE')
                    dispatch(actions.incrementPlayerScore(state.currentPlayerNumber, message.payload.newWord.length))
                    nextMove && nextMove(message.payload.cells)
                    break
                case 'SET_CURRENT_PLAYER':
                    dispatch(actions.setCurrentPlayer(message.payload.currentPlayer))
                    break
                case 'OPPONENT_DISCONNECTED':
                    dispatch(actions.setOpponentOnline(false))
                    break
                default:
                    break
            }
        }
    }, [state.currentPlayerNumber, wsConnect])

    React.useEffect(() => {
        if (state.isOpponentOnline === false){
            pushScreen('opponentDisconnected')
        }
    }, [state.isOpponentOnline])

    const onReady = () => {
        const sendMessage: SendMessage = {
            type: 'READY',
            payload: {
                opponentId: state.onlineOpponent?.userId as string
            }
        }
        socket.current?.send(JSON.stringify(sendMessage))
    }
    const onWordDone = (cells: CellType[], newWord: string) => {
        console.log('send cells', cells)
        const sendMessage: SendMessage = {
            type: 'WORD_DONE',
            payload: {
                cells,
                opponentId: state.onlineOpponent?.userId as string,
                newWord
            }
        }
        socket.current?.send(JSON.stringify(sendMessage))
    }
    const onFinishGame = () => {
        const sendMessage: SendMessage = {
            type: 'FINISH_GAME'
        }
        socket.current?.send(JSON.stringify(sendMessage))
    }

    return {
        socket: socket.current,
        onReady,
        onWordDone,
        onFinishGame
    }
}