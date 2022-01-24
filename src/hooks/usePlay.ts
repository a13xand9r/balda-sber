import { isSberBoxLike } from '@sberdevices/plasma-temple';
import { useWebSocket } from './useWebSocket';
import { actions } from './../store/store';
import { checkWordAlreadyUsed } from './../utils';
import { checkWord } from './../api/checkWord';
import React, { createRef } from 'react'
import { CellType, SmartAppData } from '../types/types'
import { usePushScreen } from './usePushScreen'
import { useStore } from './useStore'
import { useAssistant } from './useAssistant';

export const usePlay = () => {
    const [{playGroundSize, startWord, currentPlayerNumber, player1, player2, ...state}, dispatch] = useStore()
    const pushScreen = usePushScreen()
    const [cells, setCells] = React.useState<CellType[]>(() => new Array(playGroundSize ** 2).fill({
        colored: false,
        letter: null,
        isAvailableToPutLetter: false,
        isInput: false
    }))
    const [isLetterPut, setLetterPut] = React.useState(false)
    const [lastColored, setLastColored] = React.useState<null | number>(null)
    const [wordInProgress, setWordInProgress] = React.useState<string>('')
    const [isDoneDisabled, setDoneDisabled] = React.useState<boolean>(true)
    const [isWrongWord, setWrongWord] = React.useState<boolean>(false)
    const [isWordAlreadyUsed, setWordAlreadyUsed] = React.useState<boolean>(false)
    const [timer, setTimer] = React.useState<number>(state.timerLimit)

    const playAudio = (src: string, volume = 1) => {
        let audio = new Audio(src)
        audio.volume = volume
        audio.play()
    }

    const nextMove = (isWordDone: boolean, newCells?: CellType[]) => {
        if (newCells) {
            setCells(newCells)
        } else {
            setCells(prev => prev.map(item => {
                return {
                    ...item,
                    letter: (isWordDone && item.tempLetter) ? item.tempLetter : item.letter,
                    tempLetter: null,
                    colored: false
                }
            }))
            isWordDone && dispatch(actions.incrementPlayerScore(currentPlayerNumber, wordInProgress.length))
            isWordDone && dispatch(actions.addPlayerWord(currentPlayerNumber, wordInProgress))
            setDoneDisabled(true)
            setLastColored(null)
            setLetterPut(false)
            setWordInProgress('')
        }
        setTimer(120)
        dispatch(actions.changeCurrentPlayer())
        if (isWordDone){
            playAudio('./sounds/good.mp3')
        } else playAudio('./sounds/bad.mp3')
    }

    const {
        onWordDone,
        onFinishGame,
        onTimerDone
    } = useWebSocket(
        { playGroundSize, startWord, currentPlayerNumber, player1, player2, ...state },
        dispatch,
        pushScreen,
        nextMove
    )

    const interval = React.useRef<NodeJS.Timeout>()

    React.useEffect(() => {
        interval.current = setInterval(() => {
            setTimer(prev => prev - 1)
        }, 1000)
        return () => {
            clearInterval(interval.current as NodeJS.Timeout)
        }
    }, [currentPlayerNumber])

    React.useEffect(() => {
        if (timer === 0) {
            if (state.isMultiplayer){
                if (currentPlayerNumber === 1){
                    onTimerDone()
                }
            } else {
                nextMove(false)
            }
        }
    }, [timer])

    React.useEffect(() => {
        const centerRaw = Math.ceil(playGroundSize / 2)
        const wordStartCell = playGroundSize * (centerRaw - 1)
        const cellLetters: (string | null)[] = new Array(playGroundSize ** 2).fill(null)
        startWord.split('').forEach((item, i) => {
            cellLetters[wordStartCell + i] = item
        })
        setCells(cellLetters.map((item, i, arr) => {
            let isAvailableToPutLetter = false
            if (
                !item &&
                (arr[i - playGroundSize] || arr[i + playGroundSize] || (arr[i - 1] && i % playGroundSize !== 0) || (arr[i + 1] && i % playGroundSize !== playGroundSize - 1))
            ) {
                isAvailableToPutLetter = true
            }
            const cell = {colored: false, letter: item, isAvailableToPutLetter, isInput: false, tempLetter: null}
            return cell
        }))
        window.scrollTo({top: 0, behavior: 'smooth'})
    }, [])

    React.useEffect(() => {
        setCells(prev => prev.map(item => item.letter).map((item, i, arr) => {
            let isAvailableToPutLetter = false
            if (
                !item &&
                (arr[i - playGroundSize] || arr[i + playGroundSize] || (arr[i - 1] && i % playGroundSize !== 0) || (arr[i + 1] && i % playGroundSize !== playGroundSize - 1))
            ) {
                isAvailableToPutLetter = true
            }
            const cell = {colored: false, letter: item, isAvailableToPutLetter, isInput: false, tempLetter: null}
            return cell
        }))
    }, [currentPlayerNumber])

    React.useEffect(() => {
        if (cells.every(item => !!item.letter)) {
            onFinishGame()
            pushScreen('victory')
        }
    }, [currentPlayerNumber])

    React.useEffect(() => {
        console.log('player1.words useEffect')
        player1.words.length && onWordDone(cells, wordInProgress)
    }, [player1.words])

    const onCellClick = (index: number) => {
        if (!state.isMultiplayer || currentPlayerNumber === 1) {
            if (!isLetterPut && cells[index].isAvailableToPutLetter) {
                setCells(prev => {
                    const newCells = prev.map(item => ({ ...item, isInput: false }))//[...prev]
                    newCells[index] = { ...newCells[index], isInput: true }
                    return newCells
                })
            }
            if (
                isLetterPut && (cells[index].letter || cells[index].tempLetter) &&
                (!cells.some(item => item.colored) ||
                    (index - playGroundSize === lastColored || index + playGroundSize === lastColored || (index - 1 === lastColored && index % playGroundSize !== 0) || (index + 1 === lastColored && index % playGroundSize !== playGroundSize - 1))
                )
            ) {
                console.log('color cell', index)
                setLastColored(index)
                setWordInProgress(prev => prev + (cells[index].tempLetter || cells[index].letter))
                setCells(prev => {
                    const newColored = [...prev]
                    newColored[index] = { ...newColored[index], colored: true }
                    return newColored
                })
            }
        }
    }
    React.useEffect(() => {
        if (cells.some(item => item.colored && item.tempLetter)){
            setDoneDisabled(false)
        }
    }, [cells])
    React.useEffect(() => {
        setTimeout(() => {
            setWrongWord(false)
        }, 2000)
    }, [isWrongWord])
    React.useEffect(() => {
        setTimeout(() => {
            setWordAlreadyUsed(false)
        }, 2000)
    }, [isWordAlreadyUsed])
    const onTapLetter = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
        if (e.target.value.match(/[А-Яа-яЁё]/) && e.target.value.length === 1) {
            setCells(prev => {
                const newColored = [...prev]
                newColored[index] = { ...newColored[index], isInput: false, tempLetter: e.target.value }
                return newColored
            })
            setLetterPut(true)
        }
    }
    const onCancel = () => {
        setCells(prev => prev.map(item => ({...item, tempLetter: null, colored: false, isInput: false})))
        setLetterPut(false)
        setDoneDisabled(true)
        setWordInProgress('')
        playAudio('./sounds/cancel.mp3', 0.5)
        window.scrollTo({top: 0, behavior: 'smooth'})
    }
    const onDone = async () => {
        const isWordExist = await checkWord(wordInProgress)
        const isAlreadyUsed = checkWordAlreadyUsed([...player1.words, ...player2.words, startWord], wordInProgress)
        if (isWordExist && !isAlreadyUsed){
            nextMove(true)
        } else {
            if (isAlreadyUsed){
                setWordAlreadyUsed(true)
            } else{
                setWrongWord(true)
            }
            playAudio('./sounds/bad.mp3')
        }
        window.scrollTo({top: 0, behavior: 'smooth'})
    }

    const cellRefs = React.useRef([])

    cellRefs.current = cells.map((_, i) => cellRefs.current[i] ?? createRef())

    const isFocusedRef = React.useRef(false)
    React.useEffect(() => {
        const indexWithTempLetter = cells.findIndex(cell => cell.tempLetter)
        if (indexWithTempLetter !== -1 && !isFocusedRef.current){
            isFocusedRef.current = true
            //@ts-ignore
            cellRefs.current[indexWithTempLetter].current.focus()
        }
        if (indexWithTempLetter === -1 && isFocusedRef.current){
            isFocusedRef.current = false
        }
    }, [cells])

    const assistant = useAssistant()
    React.useEffect(() => {
        if (assistant){
            assistant.on('data', ({ smart_app_data }: any) => {
                const smartAppData = smart_app_data as SmartAppData
                if (smartAppData) {
                    switch (smartAppData.type) {
                        case 'RESET_WORD':
                            onCancel()
                            break
                        default:
                    }
                }
            })
        }
    }, [assistant])

    const goToMain = () => pushScreen('')

    return {
        onCancel,
        onTapLetter,
        onCellClick,
        cells,
        isLetterPut,
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
        timerLimit: state.timerLimit,
        character: state.character,
        goToMain
    }
}