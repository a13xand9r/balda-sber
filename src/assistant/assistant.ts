import { createSmartappDebugger, createAssistant } from '@sberdevices/assistant-client'
import { Dispatch } from 'react'
import { actions } from '../store/store'
import { StateType } from '../types/types'

export const initializeAssistant = (getState: () => any) => {
    console.log('state', getState())
    if (process.env.NODE_ENV === 'development') {
        return createSmartappDebugger({
            token: process.env.REACT_APP_ASSISTANT_TOKEN ?? '',
            initPhrase: 'Запусти балда онлайн',
            getState
        })
    }
    return createAssistant({ getState })
}

export const initAssistant = (
    dispatch: Dispatch<any>,
    getState: () => StateType | {}
) => {
    const assistant = initializeAssistant(getState)
    assistant.on('data', ({ smart_app_data, type, character }: any) => {
        console.log('receive data')
        if (smart_app_data) {
            console.log(smart_app_data)
            dispatch(smart_app_data)
        }
        if (type === 'character'){
            dispatch(actions.setCharacter(character.id))
        }
    })
    return assistant
}