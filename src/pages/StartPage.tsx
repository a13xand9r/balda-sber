import { accent, secondary } from '@sberdevices/plasma-tokens'
import { Button, Container, TextField } from '@sberdevices/plasma-ui'
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

const LetterInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    outline: none;
    border-radius: 15px;
    border: none;
    background-color: #76808a90;
    caret-color: ${accent};
    line-height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
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
            <LetterInput autoFocus />
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
                    view='secondary'
                >
                    Правила
                </StyledButton>
            </PageContainer>
        </Container>
    )
}
