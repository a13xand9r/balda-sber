import { Card, CardBody, CardContent, CardHeadline1, Col, Row, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { UserScore } from '../types/types'


const StyledCard = styled(Card)`
    position: relative;
    min-width: 9rem;
    margin: 0.5rem;
    text-align: center;
`
const StyledHeadline = styled(CardHeadline1)`
    display: flex;
    margin: 0 auto;
    position: relative;
`
const StyledImg = styled.img`
    position: absolute;
    /* top: -1rem; */
    left: -2.3rem;
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
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <StyledHeadline>
                            <StyledImg src='./img/victory.png' alt="" />
                            {victoryCount}
                        </StyledHeadline>
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
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <StyledHeadline>
                            <StyledImg src='./img/defeat.png' alt="" />
                            {defeatCount}
                        </StyledHeadline>
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
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <StyledHeadline>
                            <StyledImg src='./img/draw.png' alt="" />
                            {drawCount}
                        </StyledHeadline>
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
                    <CardContent style={{ height: '100%' }} cover={false}>
                        <StyledHeadline>
                            <StyledImg src='./img/score.png' alt="" />
                            1000
                        </StyledHeadline>
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
