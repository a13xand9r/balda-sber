import { secondary } from '@sberdevices/plasma-tokens'
import { Body1, Card, CardBody, CardContent, Footnote1 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { Player } from '../../types/types'

const ColoredFootnote1 = styled(Footnote1)`
    color: ${secondary};
`

type Props = {
    player: Player
}

export const OnePlayerWords: React.FC<Props> = ({player}) => {
    return (
        <Card style={{width: '13rem'}}>
            <CardBody>
                <CardContent style={{ height: '100%' }} cover={false}>
                        <div>
                            {
                                player.words.length === 0
                                ? <ColoredFootnote1 color='secondary'>Нет слов</ColoredFootnote1>
                                : player.words.map(word => (
                                    <Body1>{word}</Body1>
                                ))
                            }
                        </div>
                </CardContent>
            </CardBody>
        </Card>
    )
}
