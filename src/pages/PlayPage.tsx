import { IconCross, IconDone, IconEdit } from '@sberdevices/plasma-icons'
import { Button, Card, Container, Headline1, Headline3, TextBox, TextField } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePlay } from '../hooks/usePlay'
import { CSSTransition } from 'react-transition-group'
import '../transition.css'
import { accent } from '@sberdevices/plasma-tokens'
import { getTimerPercentage } from '../utils'

const PlayGround = styled.div<{ playSize: number }>`
    margin: 3rem auto;
    display: grid;
    grid-template-columns: repeat(${props => props.playSize}, 1fr);
    grid-gap: 0.3rem;
`
const ButtonsContainer = styled.div`
    display: flex;
    width: 30%;
    margin: 0 auto;
    justify-content: space-around;
`
const PlayCell = styled.div<{ isSelected: boolean, isAvailable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    background-color: ${props => props.isSelected ? 'red' : props.isAvailable ? 'blue' : 'black'};
    border-radius: 8%;
    &:focus{
        outline: none;
        box-shadow: 0px 0px 32px 13px ${accent};
    }
`

const PlayContainer = styled(Container)`
    margin: 0;
    overflow: hidden;
`
const LetterInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    outline: none;
    border-radius: 15px;
    border: none;
    background-color: #76808a90;
    caret-color: ${accent};
    line-height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`

const PlayersContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 1rem auto;
    justify-content: space-around;
`
const NameContainer = styled(Headline3)`
    /* display: flex;
    justify-content: space-around;
    align-items: center; */
    position: relative;
`
const Notification = styled(Card)`
    width: 60%;
    margin: auto;
    text-align: center;
    padding: 0.3rem;
`
const StyledIconEdit = styled(IconEdit)`
    position: absolute;
    left: -2rem;
`
const Timer = styled.div<{ timerPercentage: number }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 6rem;
    padding: 0.3rem;
    position: relative;
    border-radius: 1rem;
    margin-top: 0.8rem;
    background: linear-gradient(to right, #00e1ff97 ${props => props.timerPercentage}%, #ffffff18 ${props => props.timerPercentage}%);
`


export const PlayPage = () => {
    const {
        cells,
        isLetterPut,
        onCancel,
        onCellClick,
        onTapLetter,
        playGroundSize,
        onDone,
        wordInProgress,
        isDoneDisabled,
        isWrongWord,
        isWordAlreadyUsed,
        currentPlayerNumber,
        player1,
        player2,
        cellRefs,
        timer,
        timerLimit
    } = usePlay()


    const playCells = cells.map((item, i) => (
        item.isInput ?
            <LetterInput autoFocus autoCapitalize='none' onChange={(e) => onTapLetter(e, i)} /> :
            <PlayCell
                tabIndex={(item.isAvailableToPutLetter || item.letter) ? 2 : undefined}
                ref={cellRefs.current[i]}
                // tabIndex={0}
                isAvailable={item.isAvailableToPutLetter}
                isSelected={item.colored}
                // style={{color: coloredCells[i] ? 'red' : 'aqua'}}
                // onMouseOver={() => console.log('mouse',i)}
                // onTouchMove={() => console.log('touch',i)}
                // onClick={() => console.log('click', i)}
                // onPointerDown={() => console.log('down', i)}
                // onPointerMoveCapture={() => console.log('down', i)}
                // onPointerOverCapture={() => paintCell(i)}
                // onPointerMove={() => paintCell(i)}
                // onPointerDown={() => paintCell(i)}
                // onPointerOverCapture={() => paintCell(i)}
                // onTouchMoveCapture={() => paintCell(i)}
                draggable={true}
                onClick={() => onCellClick(i)}
                // onDragOver={() => paintCell(i)}
                // onTouchMove={() => paintCell(i)}
                // onPointerOver={() => console.log('over', i)}
                key={i}
            >
                <Headline1>{cells[i].tempLetter || cells[i].letter}</Headline1>
            </PlayCell>
    ))
    return (
        <PlayContainer>
            <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}>{timer}</Timer>
            <PlayersContainer>
                <NameContainer>{player1.name} - {player1.score}{currentPlayerNumber === 1 && <StyledIconEdit />}</NameContainer>
                <NameContainer>{player2.name} - {player2.score}{currentPlayerNumber === 2 && <StyledIconEdit />}</NameContainer>
            </PlayersContainer>
            <ButtonsContainer>
                <Button
                    onClick={onDone}
                    disabled={isDoneDisabled}
                    view='primary'
                >
                    <IconDone />
                </Button>
                <Button
                    onClick={onCancel}
                    view='warning'
                >
                    <IconCross />
                </Button>
            </ButtonsContainer>
            <PlayGround playSize={playGroundSize}>
                {playCells}
            </PlayGround>
            <Headline1 style={{textAlign: 'center'}}>{wordInProgress}</Headline1>
            <CSSTransition
                in={isWrongWord}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    <TextBox>
                        Такого слова нет в словаре
                    </TextBox>
                </Notification>
            </CSSTransition>
            <CSSTransition
                in={isWordAlreadyUsed}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    <TextBox>
                        Такое слово уже использовалось
                    </TextBox>
                </Notification>
            </CSSTransition>
        </PlayContainer>
    )
}
