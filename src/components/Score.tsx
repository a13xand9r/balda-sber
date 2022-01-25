import { Card, CardBody, CardContent, CardHeadline1, Col, Row, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { UserScore } from '../types/types'


const StyledCard = styled(Card)`
    position: relative;
    min-width: 8.5rem;
    margin: 0.5rem;
    text-align: center;
`
const StyledImg = styled.img`
    position: absolute;
    top: 1rem;
    left: 1rem;
    width: 1.8rem;
    height: 1.8rem;
    /* width: 30px;
    height: 30px; */
`

export const Score: React.FC<Props> = ({ defeatCount, drawCount, victoryCount, score }) => {
    return (
        <Row style={{ margin: '0 auto' }}>
            {/* <Col size={2}> */}
            <StyledCard>
                <CardBody>
                    <StyledImg src='./img/victory.png' alt="" />
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <CardHeadline1>{victoryCount}</CardHeadline1>
                        <TextBox>
                            Побед
                        </TextBox>
                    </CardContent>
                </CardBody>
            </StyledCard>
            {/* </Col> */}
            {/* <Col size={2}> */}
            <StyledCard>
                <CardBody>
                    <StyledImg src='./img/defeat.png' alt="" />
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <CardHeadline1>{defeatCount}</CardHeadline1>
                        <TextBox>
                            Поражений
                        </TextBox>
                    </CardContent>
                </CardBody>
            </StyledCard>
            {/* </Col> */}
            {/* <Col size={2}> */}
            <StyledCard>
                <CardBody>
                    <StyledImg src='./img/draw.png' alt="" />
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <CardHeadline1>{drawCount}</CardHeadline1>
                        <TextBox>
                            Ничьи
                        </TextBox>
                    </CardContent>
                </CardBody>
            </StyledCard>
            {/* </Col> */}
            {/* <Col size={2}> */}
            <StyledCard>
                <CardBody>
                    <StyledImg src='./img/score.png' alt="" />
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <CardHeadline1>{score}</CardHeadline1>
                        <TextBox>
                            Общий счёт
                        </TextBox>
                    </CardContent>
                </CardBody>
            </StyledCard>
            {/* </Col> */}
        </Row>
    )
}

type Props = UserScore
