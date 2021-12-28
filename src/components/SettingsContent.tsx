import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { accent } from '@sberdevices/plasma-tokens'
import { Button, Container, Headline4, Radiobox, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch } from 'react'
import styled from 'styled-components'
import { AppHeader } from './AppHeader'
import { usePushScreen } from '../hooks/usePushScreen'
import { actions } from '../store/store'
import { ActionsType, StateType } from '../types/types'

const NameInput = styled(TextField)`
    margin: 0.5rem auto;
    /* width: 20rem;
    @media (max-width: 800px){
        width: 90%
    } */
    width: 100%;
`
const StyledButton = styled(Button)`
    margin: 0.5rem auto;
    /* width: 20rem;
    @media (max-width: 800px){
        width: 90%
    } */
    width: 100%;
`

const PlayGroundSizeContainer = styled.div`
    display: flex;
    width: 5rem;
    text-align: start;
    justify-content: flex-start;
    align-items: center;
    height: 2rem;
    padding: 10px;
    box-sizing: border-box;
  &:focus-visible {
    outline: none;
    border: ${accent} solid 2px;
    border-radius: 15px;
  }
  &:focus {
    border: ${accent} solid 2px;
    border-radius: 15px;
    outline: none;
  }
`

export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
    text-align: center;
    width: 30rem;
    @media (max-width: 700px){
        width: 90vw;
    }
`
type Props = {
    state: StateType,
    dispatch: Dispatch<ActionsType>,
    onButtonClick: (name1: string, name2: string) => void
    disabled?: boolean
}
export const SettingsContent: React.FC<Props> = ({state, dispatch, onButtonClick, disabled}) => {
    const pushScreen = usePushScreen()
    const [name1, setName1] = React.useState('')
    const [name2, setName2] = React.useState('')

    return (
        <Container>
            <AppHeader
                back={true}
                onBackCallback={() => pushScreen(-1)}
                title='Имя'
            />
            <PageContainer>
                {
                    (!state.isMultiplayer || !state.onlineOpponent) &&
                    <>
                    <NameInput
                        value={name1}
                        label={state.isMultiplayer ? 'Имя' : 'Имя первого игрока'}
                        onChange={(e) => setName1(e.target.value)}
                    />
                {
                    !state.isMultiplayer &&
                    <NameInput
                        label={'Имя второго игрока'}
                        value={name2}
                        onChange={(e) => setName2(e.target.value)}
                    />
                }
                </>
            }

                {
                    (!state.isMultiplayer || !!state.onlineOpponent) &&
                    <>
                        <Headline4 style={{ margin: '0.6rem' }}>Поле</Headline4>

                        <PlayGroundSizeContainer
                            onClick={() => {
                                if (isSberBoxLike()) dispatch(actions.setPlayGroundSize(4))
                            }}
                            tabIndex={isSberBoxLike() ? 1 : 0}
                        >
                            <Radiobox
                                value='low'
                                name='low'
                                tabIndex={-1}
                                label='4x4'
                                checked={state.playGroundSize === 4}
                                defaultChecked={state.playGroundSize === 4}
                                onChange={() => dispatch(actions.setPlayGroundSize(4))}
                            />
                        </PlayGroundSizeContainer>

                        <PlayGroundSizeContainer
                            onClick={() => {
                                if (isSberBoxLike()) dispatch(actions.setPlayGroundSize(5))
                            }}
                            tabIndex={isSberBoxLike() ? 1 : 0}
                        >
                            <Radiobox
                                value='low'
                                name='low'
                                tabIndex={-1}
                                label='5x5'
                                checked={state.playGroundSize === 5}
                                defaultChecked={state.playGroundSize === 5}
                                onChange={() => dispatch(actions.setPlayGroundSize(5))}
                            />
                        </PlayGroundSizeContainer>

                        <PlayGroundSizeContainer
                            onClick={() => {
                                if (isSberBoxLike()) dispatch(actions.setPlayGroundSize(6))
                            }}
                            tabIndex={isSberBoxLike() ? 1 : 0}
                        >
                            <Radiobox
                                value='low'
                                name='low'
                                tabIndex={-1}
                                label='6x6'
                                checked={state.playGroundSize === 6}
                                defaultChecked={state.playGroundSize === 6}
                                onChange={() => dispatch(actions.setPlayGroundSize(6))}
                            />
                        </PlayGroundSizeContainer>

                        <PlayGroundSizeContainer
                            onClick={() => {
                                if (isSberBoxLike()) dispatch(actions.setPlayGroundSize(7))
                            }}
                            tabIndex={isSberBoxLike() ? 1 : 0}
                        >
                            <Radiobox
                                value='low'
                                name='low'
                                tabIndex={-1}
                                label='7x7'
                                checked={state.playGroundSize === 7}
                                defaultChecked={state.playGroundSize === 7}
                                onChange={() => dispatch(actions.setPlayGroundSize(7))}
                            />
                        </PlayGroundSizeContainer>

                        <PlayGroundSizeContainer
                            onClick={() => {
                                if (isSberBoxLike()) dispatch(actions.setPlayGroundSize(8))
                            }}
                            tabIndex={isSberBoxLike() ? 1 : 0}
                        >
                            <Radiobox
                                value='low'
                                name='low'
                                tabIndex={-1}
                                label='8x8'
                                checked={state.playGroundSize === 8}
                                defaultChecked={state.playGroundSize === 8}
                                onChange={() => dispatch(actions.setPlayGroundSize(8))}
                            />
                        </PlayGroundSizeContainer>
                    </>
                }
                <StyledButton
                    view='primary'
                    onClick={() => onButtonClick(name1, name2)}
                    disabled={disabled ?? false}
                >
                    {
                        (state.isMultiplayer && state.onlineOpponent) ?
                        'Готов' :
                        'Далее'
                    }
                </StyledButton>
            </PageContainer>
        </Container>
    )
}
