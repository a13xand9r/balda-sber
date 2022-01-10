import { Body1, Button, Container, Headline1, Headline2, Headline4 } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { getWord } from '../api/getWord'
import { AppHeader } from '../components/AppHeader'
import { PageContainer } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'

const StyledButton = styled(Button)`
    margin: 0.5rem auto;
    width: 90%;
`

const FlexContainer = styled.div`
    display: flex;
    margin: 1rem auto;
`

export const OpponentDisconnected = () => {
    const pushScreen = usePushScreen()
    const [{player1, player2}] = useStore()
    return (
        <Container>
            <PageContainer>
                <Headline1>Соперник отключился</Headline1>
                <FlexContainer>
                    <div>
                        <Headline4>{player1.name} - {player1.score}</Headline4>
                        {
                            player1.words.map(word => (
                                <Body1>{word}</Body1>
                            ))
                        }
                    </div>
                    <div>
                        <Headline4>{player2.name} - {player2.score}</Headline4>
                        {
                            player2.words.map(word => (
                                <Body1>{word}</Body1>
                            ))
                        }
                    </div>
                </FlexContainer>
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
