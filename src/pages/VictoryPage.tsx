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

export const VictoryPage = () => {
    const pushScreen = usePushScreen()
    const [{player1, player2}, dispatch] = useStore()
    const onPlayClick = () => {
        dispatch(actions.setMultiPlayer(false))
        pushScreen('settings')
    }
    const onRandomClick = () => {
        dispatch(actions.setMultiPlayer(true))
        pushScreen('settings')
    }
    const winner = React.useMemo(() => {
        if (player1.score > player2.score) return player1
        if (player2.score > player1.score) return player2
        return 'Ничья'
    }, [player1, player2])
    return (
        <Container>
            <AppHeader
                back={false}
                title='Конец игры'
            />
            <PageContainer>
                <Headline2>{
                    winner === 'Ничья' ?
                    'Ничья' :
                    `Победитель - ${ winner.name }`
                }</Headline2>
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
                >
                    На главную
                </StyledButton>
            </PageContainer>
        </Container>
    )
}
