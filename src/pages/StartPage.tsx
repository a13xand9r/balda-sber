import { Button, Container } from '@sberdevices/plasma-ui'
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

export const StartPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    React.useEffect(() => {
        dispatch(actions.resetGame())
        getWord(state.playGroundSize).then(res => dispatch(actions.setStartWord(res)))
    }, [])
    const [value, setValue] = React.useState(0)
    const onChange = (value: number) => {
        console.log('change')
        setValue(value)
    }
    const onPlayClick = () => {
        dispatch(actions.setMultiPlayer(false))
        pushScreen('settings')
    }
    const onRandomClick = () => {
        dispatch(actions.setMultiPlayer(true))
        if (!state.name){
            pushScreen('settings')
        } else {
            pushScreen('random')
        }
    }
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
                    onClick={onRandomClick}
                    view='primary'
                >
                    Поиск случайного соперника
                </StyledButton>
                <StyledButton
                    view='primary'
                >
                    Играть с другом онлайн
                </StyledButton>
            </PageContainer>
        </Container>
    )
}
