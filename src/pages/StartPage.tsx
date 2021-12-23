import { Button, Container } from '@sberdevices/plasma-ui'
import axios from 'axios'
import React from 'react'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'

const link = 'https://dictionary.yandex.net/api/v1/dicservice.json/lookup?lang=ru-ru&text=идея&key=dict.1.1.20211222T132610Z.c5187e7ef30aff2e.f22ccc1a1ad50ba343d27c5dd978fb470e758ca2'
export const StartPage = () => {
    const pushScreen = usePushScreen()
    // React.useEffect(() => {
    //     axios.get(link).then(res => console.log(res.data))
    // }, [])
    return (
        <Container>
            <AppHeader
                back={false}
                title='Балда онлайн'
            />
            <Button onClick={() => pushScreen('play')}>Играть вдвоем</Button>
            <Button onClick={() => pushScreen('settings')}>Поиск случайного соперника</Button>
            <Button>Играть с другом онлайн</Button>
        </Container>
    )
}
