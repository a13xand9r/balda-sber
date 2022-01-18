import { IconCross, IconDone, IconEdit } from '@sberdevices/plasma-icons'
import { Button, Card, Headline1, Headline3, TextBox } from '@sberdevices/plasma-ui'
import styled from 'styled-components'
import { usePlay } from '../hooks/usePlay'
import { CSSTransition } from 'react-transition-group'
import '../transition.css'
import { accent } from '@sberdevices/plasma-tokens'
import { getTimerPercentage } from '../utils'
import { PlayersWords } from '../components/playerWords/PlayersWords'
import { PageContainer } from '../components/SettingsContent'
import { isSberBoxLike } from '@sberdevices/plasma-temple'

const PlayGround = styled.div<{ playSize: number }>`
    margin: 1.5rem auto;
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
    /* border-radius: 15px; */
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
    /* justify-content: center; */
    justify-content: space-around;
    background: linear-gradient(45deg, rgb(153, 0, 189) 1%, rgb(0, 107, 137) 100%);
    box-shadow: 4px 0px 29px 4px rgba(34, 60, 80, 0.842);
    border-radius: 20px;
    padding: 10px;
    padding-left: 33px;
    padding-right: 33px;
`
const PlayerName = styled(Headline3)`
    position: relative;
    /* margin-left: 1.5rem;
    margin-right: 1.5rem; */
`
const Notification = styled(Card)`
    position: absolute;
    background-color: #808080e1;
    top: 75%;
    left: 0;
    right: 0;
    width: 60%;
    margin: auto;
    text-align: center;
    padding: 0.3rem;
`
const LeftIconEdit = styled(IconEdit)`
    position: absolute;
    left: -30px;
`
const RightIconEdit = styled(IconEdit)`
    position: absolute;
    right: -30px;
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
    background: #0059ff96;
    background: linear-gradient(to right, ${accent} ${props => props.timerPercentage}%, #ffffff18 ${props => props.timerPercentage}%);
    box-shadow: 4px 0px 29px 4px rgba(34, 60, 80, 0.842);
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
    const seconds = timer - 60*minutes

    const minutesText = `0${minutes}`
    const secondsText = `${seconds < 10 ? '0' : ''}${seconds}`


    const playCells = cells.map((item, i) => (
        item.isInput ?
            <LetterInput lang='ru' autoFocus autoCapitalize='none' onChange={(e) => onTapLetter(e, i)} /> :
            <PlayCell
                tabIndex={(item.isAvailableToPutLetter || item.letter) ? 2 : undefined}
                ref={cellRefs.current[i]}
                isAvailable={item.isAvailableToPutLetter}
                isSelected={item.colored}
                draggable={true}
                onClick={() => onCellClick(i)}
                key={i}
            >
                <Headline1>{cells[i].tempLetter || cells[i].letter}</Headline1>
            </PlayCell>
    ))
    return (
        <PageContainer>
            <Timer timerPercentage={getTimerPercentage(timer, timerLimit)}>{minutesText}:{secondsText}</Timer>
            <PlayersContainer>
                <PlayerName>{player1.name}{currentPlayerNumber === 1 && <LeftIconEdit />}</PlayerName>
                <PlayerName>{player1.score} : {player2.score}</PlayerName>
                <PlayerName>{currentPlayerNumber === 2 && <RightIconEdit />}{player2.name}</PlayerName>
            </PlayersContainer>
            <PlayGround playSize={playGroundSize}>
                {playCells}
            </PlayGround>
            <ButtonsContainer>
                <Button
                    style={{marginRight: '1rem'}}
                    onClick={onDone}
                    disabled={isDoneDisabled}
                    view='primary'
                >
                    <IconDone />
                </Button>
                <Button
                    style={{marginLeft: '1rem'}}
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
            <StyledPlayersWords />
        </PageContainer>
    )
}
