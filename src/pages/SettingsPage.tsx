import React from 'react'
import { getWord } from '../api/getWord'
import { SettingsContent } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'

export const SettingsPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const onFormSubmit = (name1: string, name2: string) => {
        dispatch(actions.setName1(name1))
        dispatch(actions.setName2(name2))
        if (state.isMultiplayer) {
            pushScreen('random')
        } else {
            pushScreen('play')
        }
    }

    React.useEffect(() => {
        getWord(state.playGroundSize).then(res => dispatch(actions.setStartWord(res)))
    }, [state.playGroundSize])
    return (
        <SettingsContent
            state={state}
            dispatch={dispatch}
            onFormSubmit={onFormSubmit}
        />
    )
}
