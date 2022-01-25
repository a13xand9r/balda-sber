import { Container, Headline2, Headline3, Headline4 } from '@sberdevices/plasma-ui'
import React from 'react'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { PlayersWords } from '../components/playerWords/PlayersWords'
import { PageContainer } from '../components/SettingsContent'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { SmartAppData } from '../types/types'
import { StyledButton } from './StartPage'

const StyledImg = styled.img`
    display: block;
    margin-bottom: 0.5rem;
    width: 1.8rem;
    height: 1.8rem;
`

export const VictoryPage = () => {
    const pushScreen = usePushScreen()
    const [{player1, player2, ...state}] = useStore()
    const winner = React.useMemo(() => {
        if (player1.score > player2.score) return player1
        if (player2.score > player1.score) return player2
        return 'Ничья'
    }, [player1, player2])

    const scoreIncrement = React.useMemo(() =>
        winner === 'Ничья'
        ? Math.floor(player1.score / 2)
        : player1.score > player2.score
            ? player1.score
            : 0
    , [player1, player2])

    const assistant = useAssistant()
    React.useEffect(() => {
        if (assistant) {
            if (state.isMultiplayer && state.userId !== state.onlineOpponent?.userId) {
                const gameStatus = winner === 'Ничья'
                    ? 'Ничья'
                    : player1.score > player2.score
                        ? 'Победа'
                        : 'Поражение'
                assistant.sendAction({
                    type: 'ONLINE_GAME_FINISH',
                    payload: {
                        scoreIncrement,
                        gameStatus,
                        opponent: {
                            name: player2.name,
                            scoreIncrement,
                            gameStatus
                        }
                    }
                })
            }
            assistant.on('data', ({ smart_app_data }: any) => {
                const smartAppData = smart_app_data as SmartAppData
                if (smartAppData) {
                    switch (smartAppData.type) {
                        case 'NAVIGATION_GO_MAIN':
                            pushScreen('start')
                            break
                        default:
                    }
                }
            })
        }
    }, [assistant])
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
                <div style={{display: 'flex', alignItems: 'center'}}>
                    <StyledImg src='./img/score.png' alt="" />
                    <Headline3>+ {scoreIncrement} очков</Headline3>
                </div>
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
