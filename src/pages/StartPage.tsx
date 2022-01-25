import { Button, Container } from '@sberdevices/plasma-ui'
import React from 'react'
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

export const StyledButton = styled(Button)`
    margin: 1rem auto;
    width: 100%;
`

export const StartPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const assistant = useAssistant()
    React.useEffect(() => {
        dispatch(actions.resetGame())
        getWord(state.playGroundSize).then(res => dispatch(actions.setStartWord(res)))
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
            </PageContainer>
        </Container>
    )
}
