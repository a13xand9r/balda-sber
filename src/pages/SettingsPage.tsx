import { Container } from '@sberdevices/plasma-ui'
import React from 'react'
import { getWord } from '../api/getWord'
import { AppHeader } from '../components/AppHeader'
import { PageContainer, SettingsContent } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'

export const SettingsPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const [isSubmitDisable, setIsSubmitDisable] = React.useState(false)
    const onFormSubmit = (name1?: string, name2?: string) => {
        dispatch(actions.setName1(name1?.trim() as string))
        dispatch(actions.setName2(name2?.trim() as string))
        if (state.isMultiplayer) {
            pushScreen('random')
        } else {
            pushScreen('play')
        }
    }

    React.useEffect(() => {
        setIsSubmitDisable(true)
        getWord(state.playGroundSize).then(res => {
            dispatch(actions.setStartWord(res))
            setIsSubmitDisable(false)
        })
    }, [state.playGroundSize])
    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Настройки'
            />
            <PageContainer>
                <SettingsContent
                    pushScreen={pushScreen}
                    state={state}
                    disabled={isSubmitDisable}
                    dispatch={dispatch}
                    onFormSubmit={onFormSubmit}
                />
            </PageContainer>
        </Container>
    )
}
