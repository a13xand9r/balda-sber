import { PageStateType, StateType, ActionsType, SendMessage, GetMessage } from './../types/types';
import React, { Dispatch } from 'react'
import { actions } from '../store/store';


export const useWebSocket = (
    state: StateType,
    dispatch: Dispatch<ActionsType>,
    pushScreen: (to: keyof PageStateType | '' | -1) => void,
) => {

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
            socket.current.onmessage = (event) => {
                console.log('message', event)
                const message = JSON.parse(event.data) as GetMessage
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
                    default:
                        break
                }
            }
        }
        wsConnect()
        return () => {
            if (socket.current) {
                socket.current.onclose = () => {
                    console.log('socket closed')
                }
                socket.current?.close()
            }
        }
    }, [])

    const onReady = () => {
        const sendMessage: SendMessage = {
            type: 'READY',
            payload: {
                opponentId: state.onlineOpponent?.userId as string
            }
        }
        socket.current?.send(JSON.stringify(sendMessage))
    }

    return {
        socket: socket.current,
        onReady
    }
}