import React from 'react'
import { SettingsContent } from '../components/SettingsContent'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { useWebSocket } from '../hooks/useWebSocket'
import { SendMessage } from '../types/types'

export const MultiPlayerSettingsPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const [isDisabledButton, setDisabledButton] = React.useState(false)
    const {
        socket,
        onReady
    } = useWebSocket(state, dispatch, pushScreen)
    const onButtonClick = () => {
        onReady()
        setDisabledButton(true)
    }

    React.useEffect(() => {
        setDisabledButton(false)
        const sendMessage: SendMessage = {
            type: 'CHANGE_PLAYGROUND_SIZE',
            payload: {
                opponentId: state.onlineOpponent?.userId as string,
                size: state.playGroundSize
            }
        }
        socket?.send(JSON.stringify(sendMessage))
    }, [state.playGroundSize])

    return (
        <>
        <SettingsContent
            state={state}
            dispatch={dispatch}
            onButtonClick={onButtonClick}
            disabled={isDisabledButton}
        />
        {
            isDisabledButton && 'Ждём готовности соперника...'
        }
        </>
    )
}
