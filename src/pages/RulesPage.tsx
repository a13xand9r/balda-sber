import { detectDevice } from '@sberdevices/plasma-ui'
import { Card, CardBody, CardContent, Container, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useAssistant } from '../hooks/useAssistant'
import { useEffect } from 'react'
import { PageContainer } from '../components/SettingsContent'
import { StyledButton } from './StartPage'

const StartTextBox = styled(TextBox)`
    text-align: start;
`

export const RulesPage = () => {
    const pushScreen = usePushScreen()
    const assistant = useAssistant()

    useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                if (smart_app_data) {
                    switch (smart_app_data.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break;
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <Container style={{marginBottom: '5rem'}}>
            <AppHeader title='Правила' back={true} onBackCallback={() => pushScreen(-1)} />
            <PageContainer>
                <Card>
                    <CardBody style={{ height: '100%', alignItems: 'center' }}>
                        <CardContent style={{ height: '100%', textAlign: 'start' }} cover={false}>
                            <TextBox>
                                «Балда» — лингвистическая настольная игра для 2 игроков, в которой необходимо составлять слова с помощью букв, добавляемых определённым образом на квадратное игровое поле
                            </TextBox>
                            <br />
                            <TextBox>
                                Правила игры: необходимо составлять слова, дописывая по одной букве в пустом поле. Побеждает тот, кто наберет как можно больше очков. Чем длиннее слово, тем больше очков вы получаете. Разрешается использовать только существительные слова в именительном падеже (единственное число)
                            </TextBox>
                            <br />
                            <TextBox>
                                Порядок следующий:
                                <ol style={{marginLeft: '1.5rem', marginTop: '0.5rem'}}>
                                    <li>Ставим букву в доступную ячейку</li>
                                    <li>Составляем слово с использованием новой буквы</li>
                                    <li>Подтверждаем, и если такое слово есть в словаре, ждём хода соперника</li>
                                </ol>
                            </TextBox>
                        </CardContent>
                    </CardBody>
                </Card>
                <StyledButton view='primary' onClick={() => pushScreen(-1)}>Понятно!</StyledButton>
            </PageContainer>
        </Container>
    )
}
