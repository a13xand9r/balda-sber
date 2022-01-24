import { Container } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { Notification } from '../components/Notification'
import { PageContainer, SettingsContent } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { useWebSocket } from '../hooks/useWebSocket'
import { SendMessage } from '../types/types'
import { PlayersContainer, PlayerName, Score } from './PlayPage'

export const MultiPlayerSettingsPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const [isDisabledButton, setDisabledButton] = React.useState(false)
    const {
        socket,
        onReady
    } = useWebSocket(state, dispatch, pushScreen)
    const onFormSubmit = () => {
        onReady()
        setDisabledButton(true)
    }

    React.useEffect(() => {
        setDisabledButton(false)
        const sendMessage: SendMessage = {
            type: 'CHANGE_PLAYGROUND_SIZE',
            payload: {
                opponentId: state.onlineOpponent?.userId as string,
                size: state.playGroundSize
            }
        }
        socket?.send(JSON.stringify(sendMessage))
    }, [state.playGroundSize])

    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Настройки'
            />
            <PageContainer>
                <PlayersContainer>
                    <PlayerName>{state.player1.name}</PlayerName>
                    <Score>:</Score>
                    <PlayerName>{state.player2.name}</PlayerName>
                </PlayersContainer>
                <SettingsContent
                    pushScreen={pushScreen}
                    state={state}
                    dispatch={dispatch}
                    onFormSubmit={onFormSubmit}
                    disabled={isDisabledButton}
                />
                {
                    isDisabledButton && <Notification>Ждём готовности соперника...</Notification>
                }
            </PageContainer>
        </Container>
    )
}
