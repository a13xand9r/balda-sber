import { Body1, Button, Container, TextField } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { Loader } from '../components/Loader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { useWebSocket } from '../hooks/useWebSocket'

export const Random = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()

    const {
        socket
    } = useWebSocket(
        state,
        dispatch,
        pushScreen
    )

    React.useEffect(() => {
        if (state.onlineOpponent){
            setTimeout(() => {
                pushScreen('multiPlayerSettings')
            }, 2000)
        }
    }, [state.onlineOpponent])

    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Ищем соперника...'
            />
            {
                !state.onlineOpponent ?
                <Loader /> :
                <Body1>Соперник найден: {state.onlineOpponent.name}</Body1>
            }
        </Container>
    )
}
