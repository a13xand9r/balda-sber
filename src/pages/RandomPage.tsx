import { Body1, Button, Container, TextField } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { Loader } from '../components/Loader'
import { usePushScreen } from '../hooks/usePushScreen'
import { GetMessage, SendMessage } from '../types/types'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'

export const Random = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const socket = React.useRef<WebSocket>()
    React.useEffect(() => {
        const wsConnect = () => {
            // socket.current = new WebSocket('ws://ws-typescript-test.herokuapp.com/')
            socket.current = new WebSocket(
                // process.env.NODE_ENV === 'development' ?
                //     `ws://localhost:5000/?token=${state.userId}` :
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
                const data = JSON.parse(event.data) as GetMessage
                dispatch(actions.setOpponent({
                    name: data.payload.opponentName,
                    userId: data.payload.opponentId,
                    roomId: Number(data.payload.roomId)
                }))
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
    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Ищем игрока...'
            />
            {
                !state.onlineOpponent ?
                <Loader /> :
                <Body1>Соперник найден: {state.onlineOpponent.name}</Body1>
            }
        </Container>
    )
}
