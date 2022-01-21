import { Body1, Button, Container, Headline1, Headline4 } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { PlayersWords } from '../components/playerWords/PlayersWords'
import { PageContainer } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'

const StyledButton = styled(Button)`
    margin: 1.5rem auto;
    width: 100%;
`

export const OpponentDisconnected = () => {
    const pushScreen = usePushScreen()
    return (
        <Container>
            <PageContainer>
                <Headline1 style={{margin: '2rem'}}>Соперник отключился</Headline1>
                <PlayersWords />
                <StyledButton
                    view='primary'
                    onClick={() => pushScreen('')}
                >
                    На главную
                </StyledButton>
            </PageContainer>
        </Container>
    )
}
