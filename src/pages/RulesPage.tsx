import { Card, CardBody, CardContent, Container, TextBox } from '@sberdevices/plasma-ui'
import { AppHeader } from '../components/AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { useAssistant } from '../hooks/useAssistant'
import { StyledButton } from './StartPage'
import React from 'react'
import { SmartAppData } from '../types/types'
import styled from 'styled-components'

const StyledTextBox = styled(TextBox)`
    margin-top: 0.3rem;
    margin-bottom: 0.3rem;
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
    margin-bottom: 8rem;
    text-align: center;
    /* width: 45rem; */
    width: 90%;
    @media (max-width: 700px){
        width: 90vw;
    }
`

export const RulesPage = () => {
    const pushScreen = usePushScreen()
    const assistant = useAssistant()

    React.useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                const smartAppData = smart_app_data as SmartAppData
                if (smartAppData) {
                    switch (smartAppData.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break;
                        case 'UNDERSTAND':
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
                <Card style={{marginTop: '-1rem'}}>
                    <CardBody style={{ height: '100%', alignItems: 'center' }}>
                        <CardContent style={{ height: '100%', textAlign: 'start' }} cover={false}>
                            <StyledTextBox>
                                «Балда» — лингвистическая настольная игра для 2 игроков, в которой необходимо составлять слова с помощью букв, добавляемых определённым образом на квадратное игровое поле
                            </StyledTextBox>
                            <StyledTextBox>
                                Правила игры: необходимо составлять слова, дописывая по одной букве в пустом поле. Побеждает тот, кто наберет как можно больше очков. Чем длиннее слово, тем больше очков получает игрок. Разрешается использовать только существительные слова в именительном падеже (единственное число)
                            </StyledTextBox>
                            <StyledTextBox>
                                Порядок следующий:
                                <ol style={{marginLeft: '1.5rem', marginTop: '0.5rem'}}>
                                    <li>Ставим букву в доступную ячейку</li>
                                    <li>Составляем слово с использованием новой буквы</li>
                                    <li>Подтверждаем, и если такое слово есть в словаре, ждём хода соперника</li>
                                    <li>Если 2 игрока не смогли придумать слово в пределах одного хода, игра заканчивается</li>
                                </ol>
                            </StyledTextBox>
                        </CardContent>
                    </CardBody>
                </Card>
                <StyledButton view='primary' onClick={() => pushScreen(-1)}>Понятно!</StyledButton>
            </PageContainer>
        </Container>
    )
}
