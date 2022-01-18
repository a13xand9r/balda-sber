import { secondary } from '@sberdevices/plasma-tokens'
import { Body1, Card, CardBody, CardContent, Footnote1, Headline4 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { useStore } from '../../hooks/useStore'


const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 1rem auto;
`
const ColoredFootnote1 = styled(Footnote1)`
    color: ${secondary};
`

export const PlayersWords = () => {
    const [{ player1, player2 }] = useStore()
    return (
        <Card style={{width: '100%'}}>
            <CardBody>
                <CardContent style={{ height: '100%' }} cover={false}>
                    <FlexContainer>
                        <div>
                            <Headline4>{player1.name} - {player1.score}</Headline4>
                            <br />
                            {
                                player1.words.length === 0
                                ? <ColoredFootnote1 color='secondary'>Нет слов</ColoredFootnote1>
                                : player1.words.map(word => (
                                    <Body1>{word}</Body1>
                                ))
                            }
                        </div>
                        <div>
                            <Headline4>{player2.name} - {player2.score}</Headline4>
                            <br />
                            {
                                player2.words.length === 0
                                ? <ColoredFootnote1 color='secondary'>Нет слов</ColoredFootnote1>
                                : player2.words.map(word => (
                                    <Body1>{word}</Body1>
                                ))
                            }
                        </div>
                    </FlexContainer>
                </CardContent>
            </CardBody>
        </Card>
    )
}
