import { Container, Headline3 } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { Loader } from '../components/Loader'
import { PageContainer } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { useWebSocket } from '../hooks/useWebSocket'

const StyledHeadline = styled(Headline3)`
    width: 90%;
    display: inline-block;
    border-radius: 10px;
    background-color: #0000009e;
    padding: 20px;
    position: fixed;
    top: 42%;
    left: 0;
    right: 0;
    margin: auto;
    text-align: center;
`

export const Random = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()

    useWebSocket(
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
            <PageContainer>
                {
                    !state.onlineOpponent ?
                        <Loader /> :
                        <StyledHeadline>Соперник найден: {state.onlineOpponent.name}</StyledHeadline>
                }
            </PageContainer>
        </Container>
    )
}
