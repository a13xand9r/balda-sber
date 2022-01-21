import { Card, CardBody, CardContent, TextBox } from '@sberdevices/plasma-ui'
import { ReactNode } from 'react'
import styled from 'styled-components'


const StyledCard = styled(Card)`
    position: absolute;
    background-color: #222222f0;
    box-shadow: 0px 0px 31px -3px rgba(34, 60, 80, 0.2);
    top: 45%;
    left: 0;
    right: 0;
    width: 60%;
    margin: auto;
    text-align: center;
    padding: 0.3rem;
`

export const Notification = ({children}: {children: ReactNode}) => {
    return (
        <StyledCard>
            <CardBody>
                <CardContent style={{ height: '100%' }} cover={false}>
                    <TextBox>
                        {children}
                    </TextBox>
                </CardContent>
            </CardBody>
        </StyledCard>
    )
}
