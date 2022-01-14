import { Body1, Headline4 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { useStore } from '../../hooks/useStore'


const FlexContainer = styled.div`
    width: 100%;
    display: flex;
    justify-content: space-around;
    margin: 1rem auto;
`

export const PlayersWords = () => {
    const [{player1, player2}] = useStore()
    return (
        <FlexContainer>
            <div>
                <Headline4>{player1.name} - {player1.score}</Headline4>
                <br />
                {
                    player1.words.map(word => (
                        <Body1>{word}</Body1>
                    ))
                }
            </div>
            <div>
                <Headline4>{player2.name} - {player2.score}</Headline4>
                <br />
                {
                    player2.words.map(word => (
                        <Body1>{word}</Body1>
                    ))
                }
            </div>
        </FlexContainer>
    )
}
