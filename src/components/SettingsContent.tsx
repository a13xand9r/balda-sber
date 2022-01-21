import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { accent } from '@sberdevices/plasma-tokens'
import { Button, Container, Headline4, Radiobox, TextField } from '@sberdevices/plasma-ui'
import React, { Dispatch, KeyboardEvent } from 'react'
import styled from 'styled-components'
import { actions } from '../store/store'
import { ActionsType, PageStateType, SmartAppData, StateType } from '../types/types'
import { IconPersone } from '@sberdevices/plasma-icons'
import { useAssistant } from '../hooks/useAssistant'

const NameInput = styled(TextField)`
    margin: 0.5rem auto;
    width: 100%;
`
const StyledButton = styled(Button)`
    margin: 0.5rem auto;
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
const StyledForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`
export const PageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
    margin-bottom: 8rem;
    text-align: center;
    width: 30rem;
    @media (max-width: 700px){
        width: 90vw;
    }
`
type Props = {
    state: StateType,
    dispatch: Dispatch<ActionsType>,
    onFormSubmit: (name1?: string, name2?: string) => void
    disabled?: boolean
    pushScreen: (to: "" | -1 | keyof PageStateType) => void
}
export const SettingsContent: React.FC<Props> = ({ state, dispatch, onFormSubmit, disabled, pushScreen }) => {
    const [name1, setName1] = React.useState(state.player1.name)
    const [name2, setName2] = React.useState(state.player2.name)

    const handleEnter = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key.toLowerCase() === "enter") {
            //@ts-ignore
            const form = event.target.form
            const index = [...form].indexOf(event.target)
            form.elements[index + 1].focus()
            event.preventDefault()
        }
    }

    const name1Ref = React.useRef<string>()
    const name2Ref = React.useRef<string>()

    name1Ref.current = name1
    name2Ref.current = name2

    const assistant = useAssistant()
    React.useEffect(() => {
        if (assistant) {
            assistant.on('data', ({ smart_app_data }: any) => {
                const smartAppData = smart_app_data as SmartAppData
                if (smartAppData) {
                    switch (smartAppData.type) {
                        case 'NAVIGATION_BACK':
                            pushScreen(-1)
                            break
                        case 'NAVIGATION_NEXT':
                            if (name1Ref.current && (name2Ref.current && !state.isMultiplayer || state.isMultiplayer))
                            onFormSubmit(name1Ref.current as string, name2Ref.current as string)
                            break
                        case 'READY':
                            onFormSubmit()
                            break
                        default:
                    }
                }
            })
        }
    }, [assistant])

    return (
        <Container>
            <StyledForm onSubmit={(e) => {
                e.preventDefault()
                onFormSubmit(name1, name2)
            }}>
                {
                    (!state.isMultiplayer || !state.onlineOpponent) &&
                    <>
                        <NameInput
                            lang='ru'
                            contentLeft={<IconPersone color="inherit" size="s" />}
                            onKeyDown={handleEnter}
                            value={name1}
                            required
                            helperText={state.isMultiplayer ? 'Имя' : 'Имя первого игрока'}
                            // label={state.isMultiplayer ? 'Имя' : 'Имя первого игрока'}
                            onChange={(e) => e.target.value.length < 9 && setName1(e.target.value)}
                        />
                        {
                            !state.isMultiplayer &&
                            <NameInput
                                lang='ru'
                                contentLeft={<IconPersone color="inherit" size="s" />}
                                onKeyDown={handleEnter}
                                required
                                // label={'Имя второго игрока'}
                                helperText={'Имя второго игрока'}
                                value={name2}
                                onChange={(e) => e.target.value.length < 9 && setName2(e.target.value)}
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
                                tabIndex={-1}
                                label='6x6'
                                checked={state.playGroundSize === 6}
                                defaultChecked={state.playGroundSize === 6}
                                onChange={() => dispatch(actions.setPlayGroundSize(6))}
                            />
                        </PlayGroundSizeContainer>
                    </>
                }
                <StyledButton
                    view='primary'
                    type='submit'
                    disabled={disabled ?? false}
                >
                    {
                        (state.isMultiplayer && state.onlineOpponent) ?
                            'Готов' :
                            'Далее'
                    }
                </StyledButton>
            </StyledForm>
        </Container>
    )
}
