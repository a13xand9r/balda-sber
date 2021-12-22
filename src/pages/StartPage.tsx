import { Button, Container } from '@sberdevices/plasma-ui'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'

export const StartPage = () => {
    const pushScreen = usePushScreen()
    return (
        <Container>
            <AppHeader
                back={false}
                title='Балда онлайн'
            />
            <Button>Играть вдвоем</Button>
            <Button onClick={() => pushScreen('names')}>Поиск случайного соперника</Button>
            <Button>Играть с другом онлайн</Button>
        </Container>
    )
}
