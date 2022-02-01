import { Button, Container, Headline3 } from '@sberdevices/plasma-ui'
import React from 'react'
import { CSSTransition } from 'react-transition-group'
import styled from 'styled-components'
import { getWord } from '../api/getWord'
import { AppHeader } from '../components/AppHeader'
import { Notification } from '../components/Notification'
import { Score } from '../components/Score'
import { PageContainer } from '../components/SettingsContent'
import { useAssistant } from '../hooks/useAssistant'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'
import { SmartAppData } from '../types/types'
import { StyledImg } from './VictoryPage'

export const StyledButton = styled(Button)`
    margin: 1rem auto;
    width: 100%;
`

export const StartPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const assistant = useAssistant()
    React.useEffect(() => {
        if (state.decrementScore !== null){
            const winner = (() => {
                if (state.player1.score > state.player2.score) return state.player1
                if (state.player2.score > state.player1.score) return state.player2
                return 'Ничья'
            })()
            const scoreDecrement = (() =>
                winner === 'Ничья'
                ? -Math.floor(state.player2.score / 4)
                : state.player1.score > state.player2.score
                    ? 0
                    : -Math.floor(state.player2.score / 2)
            )()
            dispatch(actions.setDecrementScore(scoreDecrement))
            setTimeout(() => {
                dispatch(actions.setDecrementScore(null))
                dispatch(actions.resetGame())
            }, 2500)
            assistant.sendAction({
                type: 'ONLINE_GAME_FINISH',
                payload: {
                    scoreIncrement: state.decrementScore,
                    gameStatus: 'Поражение',
                    opponent: {
                        name: state.player2.name,
                        scoreIncrement: scoreDecrement,
                        gameStatus: 'Поражение'
                    }
                }
            })
        } else {
            setTimeout(() => {
                dispatch(actions.resetGame())
            }, 2700)
        }
    }, [state.decrementScore])
    React.useEffect(() => {
        getWord(state.playGroundSize).then(res => dispatch(actions.setStartWord(res)))
    }, [])
    React.useEffect(() => {
        const closeApp = () => assistant.close()
        window.addEventListener('popstate', closeApp)
        return () => {
            window.removeEventListener('popstate', closeApp)
        }
    }, [])
    const onRulesClick = () => {
        pushScreen('rules')
    }
    const onPlayClick = () => {
        dispatch(actions.setMultiPlayer(false))
        pushScreen('settings')
    }
    const onOnlineClick = () => {
        dispatch(actions.setMultiPlayer(true))
        if (!state.name){
            pushScreen('settings')
        } else {
            pushScreen('random')
        }
    }
    React.useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                const smartAppData = smart_app_data as SmartAppData
                if (smartAppData) {
                    switch (smartAppData.type) {
                        case 'NAVIGATION_PLAY':
                            onPlayClick()
                            break;
                        case 'NAVIGATION_PLAY_ONLINE':
                            onOnlineClick()
                            break;
                        case 'NAVIGATION_RULES':
                            onRulesClick()
                            break;
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
                minimize={true}
                title='Балда онлайн'
            />
            <PageContainer>
                <StyledButton
                    onClick={onPlayClick}
                    view='primary'
                >
                    Играть вдвоем
                </StyledButton>
                <StyledButton
                    onClick={onOnlineClick}
                    view='primary'
                >
                    Поиск случайного соперника
                </StyledButton>
                <StyledButton
                    view='secondary'
                    onClick={onRulesClick}
                >
                    Правила
                </StyledButton>
                {
               state.userScore &&
               <Score
                    {...state.userScore}
               />
           }
            <CSSTransition
                in={state.decrementScore !== null}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <StyledImg src='./img/score.png' alt="" />
                        <Headline3> {state.decrementScore} очков</Headline3>
                    </div>
                </Notification>
            </CSSTransition>
            </PageContainer>
        </Container>
    )
}
