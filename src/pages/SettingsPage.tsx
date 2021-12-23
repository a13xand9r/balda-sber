import { Button, Container, TextField } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useStore } from '../hooks/useStore'
import { actions } from '../store/store'

export const SettingsPage = () => {
    const pushScreen = usePushScreen()
    const [state, dispatch] = useStore()
    const [name, setName] = React.useState('')
    const onButtonClick = () => {
        dispatch(actions.setName(name))
        pushScreen('random')
    }
    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Имя'
            />
            <TextField
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <Button onClick={onButtonClick}>Далее</Button>
        </Container>
    )
}
