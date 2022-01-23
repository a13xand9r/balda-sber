import { IconCross, IconDone, IconEdit } from '@sberdevices/plasma-icons'
import { Body1, Button, detectDevice, Headline1, Headline3 } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePlay } from '../hooks/usePlay'
import { CSSTransition } from 'react-transition-group'
import '../transition.css'
import { accent } from '@sberdevices/plasma-tokens'
import { getTimerPercentage } from '../utils'
import { PlayersWords } from '../components/playerWords/PlayersWords'
import { isSberBoxLike } from '@sberdevices/plasma-temple'
import { Notification } from '../components/Notification'
import { OnePlayerWords } from '../components/playerWords/OnePlayerWords'

export const PlayPageContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0.5rem auto;
    margin-bottom: ${isSberBoxLike() ? '0' : '8'}rem;
    text-align: center;
    width: 30rem;
    @media (max-width: 700px){
        width: 90vw;
    }
`

const PlayGround = styled.div<{ playSize: number }>`
    margin: ${detectDevice() === 'mobile' ? '1.5rem' : '0.5rem'} auto;
    display: grid;
    grid-template-columns: repeat(${props => props.playSize}, 1fr);
    grid-gap: 0.3rem;
`
const ButtonsContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: center;
`
const PlayCell = styled.div<{ isSelected: boolean, isAvailable: boolean }>`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 3rem;
    height: 3rem;
    /* background: #ce11fdf9; */
    background: ${props => props.isSelected ? accent : props.isAvailable ? 'linear-gradient(45deg, rgb(128, 0, 255), rgb(9, 144, 182))' : 'black'};
    border-radius: 8%;
    &:focus{
        outline: none;
        box-shadow: ${isSberBoxLike() ? `0px 0px 32px 13px ${accent}` : `0px 0px 16px -2px ${accent}`} ;
    }
`
const LetterInput = styled.input`
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 8%;
    width: 3rem;
    height: 3rem;
    padding-left: 1rem;
    outline: none;
    border: none;
    background-color: #76808a90;
    caret-color: ${accent};
    line-height: 100%;
    font-size: 1.5rem;
    font-weight: bold;
    color: white;
`

export const PlayersContainer = styled.div`
    display: flex;
    width: 100%;
    margin: 1rem auto;
    position: relative;
    justify-content: space-between;
    background: linear-gradient(45deg, rgb(153, 0, 189) 1%, rgb(0, 107, 137) 100%);
    box-shadow: 4px 0px 29px 4px rgba(34, 60, 80, 0.842);
    border-radius: 20px;
    padding: 10px;
    padding-left: ${isSberBoxLike() ? '3' : '2.2'}rem;
    padding-right: ${isSberBoxLike() ? '3' : '2.2'}rem;;
`
export const PlayerName = styled(Headline3)`
    position: relative;
`
export const Score = styled(Headline3)`
    position: absolute;
    left: 0;
    right: 0;
    margin: auto;
`
const LeftIconEdit = styled(IconEdit)`
    position: absolute;
    left: -1.7rem;
`
const RightIconEdit = styled(IconEdit)`
    position: absolute;
    right: -1.7rem;
`
const WordInProgress = styled(Headline3)`
    margin: 0.6rem;
    height: 1.3rem;
`
const StyledPlayersWords = styled(PlayersWords)`
    margin-bottom: 7rem;
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
    /* background: #0059ff96; */
    background: linear-gradient(to right, ${accent} ${props => props.timerPercentage}%, #ffffff18 ${props => props.timerPercentage}%);
    box-shadow: 4px 0px 29px 4px rgba(34, 60, 80, 0.842);
`

const PlayContainer = styled.div`
    width: 90vw;
    display: flex;
    justify-content: space-around;
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

    const minutes = Math.floor(timer / 60)
    const seconds = timer - 60 * minutes

    const minutesText = `0${minutes}`
    const secondsText = `${seconds < 10 ? '0' : ''}${seconds}`


    const playCells = cells.map((item, i) => (
        item.isInput
            ? <LetterInput
                value=''
                lang='ru'
                autoFocus
                key={i}
                autoCapitalize='none'
                onChange={(e) => onTapLetter(e, i)}
            />
            : <PlayCell
                tabIndex={(item.isAvailableToPutLetter || item.letter) ? 2 : undefined}
                ref={cellRefs.current[i]}
                isAvailable={item.isAvailableToPutLetter}
                isSelected={item.colored}
                onClick={() => onCellClick(i)}
                key={i}
            >
                <Headline1>{cells[i].tempLetter || cells[i].letter}</Headline1>
            </PlayCell>
    ))
    return (
        <PlayPageContainer>
            <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}><Body1>{minutesText}:{secondsText}</Body1></Timer>
            <PlayersContainer>
                <PlayerName>{player1.name}{currentPlayerNumber === 1 && <LeftIconEdit />}</PlayerName>
                <Score>{player1.score} : {player2.score}</Score>
                <PlayerName>{currentPlayerNumber === 2 && <RightIconEdit />}{player2.name}</PlayerName>
            </PlayersContainer>
            <PlayContainer>
                { isSberBoxLike() && <OnePlayerWords player={player1}></OnePlayerWords>}
                <PlayGround playSize={playGroundSize}>
                    {playCells}
                </PlayGround>
                { isSberBoxLike() && <OnePlayerWords player={player2}></OnePlayerWords>}
            </PlayContainer>
            <ButtonsContainer>
                <Button
                    style={{ marginRight: '1rem' }}
                    onClick={onDone}
                    disabled={isDoneDisabled}
                    view='primary'
                >
                    <IconDone />
                </Button>
                <Button
                    style={{ marginLeft: '1rem' }}
                    onClick={onCancel}
                    view='warning'
                >
                    <IconCross />
                </Button>
            </ButtonsContainer>
            <WordInProgress>{wordInProgress}</WordInProgress>
            <CSSTransition
                in={isWrongWord}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    Такого слова нет в словаре
                </Notification>
            </CSSTransition>
            <CSSTransition
                in={isWordAlreadyUsed}
                timeout={300}
                classNames='notification'
                unmountOnExit
            >
                <Notification>
                    Такое слово уже использовалось
                </Notification>
            </CSSTransition>
            {
                !isSberBoxLike() &&
                <StyledPlayersWords />
            }
        </PlayPageContainer>
    )
}
