import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { detectDevice, Header } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { useAssistant } from '../hooks/useAssistant'

const StyledHeader = styled(Header)`
    ${detectDevice() === 'mobile' ? '' : `
        margin-top: 0.5rem;
    `};
`

export const AppHeader: React.FC<Props> = ({title, back, onBackCallback, minimizeCallback, minimize}) => {
    const assistant = useAssistant()
    const closeApp = () => {
        assistant.close()
    }
    return (
        //@ts-ignore
        <StyledHeader
            title={title}
            back={(back && !isSberBoxLike()) || undefined}
            onBackClick={onBackCallback}
            logo='./img/balda_logo_round.png'
            minimize={minimize ? true : undefined}
            onMinimizeClick={closeApp}
        />
    )
}

type Props = {
    title: string
    back: boolean
    onBackCallback?: () => void
    minimize?: boolean
    minimizeCallback?: () => void
}