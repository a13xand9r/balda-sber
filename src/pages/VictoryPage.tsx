import { Container, Headline2 } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { PlayersWords } from '../components/playerWords/PlayersWords'
import { PageContainer } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { StyledButton } from './StartPage'

export const VictoryPage = () => {
    const pushScreen = usePushScreen()
    const [{player1, player2}] = useStore()
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
                <Headline2
                    style={{margin: '1.5rem'}}
                >{
                    winner === 'Ничья' ?
                    'Ничья' :
                    `Победитель - ${ winner.name }`
                }</Headline2>
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
