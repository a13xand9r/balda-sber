import { Player } from './../types/types';
import { ActionsType, CharacterType, OnlineOpponent, StateType } from '../types/types'
import {v4} from 'uuid'


export const initialState = {
    character: 'sber' as CharacterType,
    name: '',
    onlineOpponent: null as null | OnlineOpponent,
    userId: v4(),
    playGroundSize: 5,
    startWord: '',
    player1: {
        name: '',
        words: [],
        score: 0
    } as Player,
    player2: {
        name: '',
        words: [],
        score: 0
    } as Player,
    currentPlayerNumber: 1 as 1 | 2,
    isMultiplayer: false
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case 'SET_CHARACTER':
            return { ...state, character: action.characterId }
        case 'SET_NAME_1':
            return { ...state, name: action.name, player1: {...state.player1, name: action.name} }
        case 'SET_NAME_2':
            return { ...state, player2: {...state.player2, name: action.name} }
        case 'SET_OPPONENT':
            return {
                ...state,
                onlineOpponent: action.opponent,
                player2: { ...state.player2, name: action.opponent.name }
            }
        case 'SET_START_WORD':
            return { ...state, startWord: action.word }
        case 'SET_PLAYER_NAME':
            const newState = {...state}
            // if (action.playerNumber === 1)
            newState[`player${action.playerNumber}`].name = action.name
            return newState
        case 'INCREMENT_PLAYER_SCORE':
            const newStateScore = {...state}
            newStateScore[`player${action.playerNumber}`].score = newStateScore[`player${action.playerNumber}`].score + action.increment
            return newStateScore
        case 'ADD_PLAYER_WORD':
            const newStateWord = {...state}
            newStateWord[`player${action.playerNumber}`].words = [...newStateWord[`player${action.playerNumber}`].words, action.word]
            return newStateWord
        case 'CHANGE_CURRENT_PLAYER':
            return {...state, currentPlayerNumber: state.currentPlayerNumber === 1 ? 2 : 1}
        case 'SET_MULTIPLAYER':
            return {...state, isMultiplayer: action.isMultiplayer}
        case 'SET_PLAYGROUND_SIZE':
            return {...state, playGroundSize: action.size}
        default: return state
    }
}

export const actions = {
    setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
    setName1: (name: string) => ({ type: 'SET_NAME_1', name } as const),
    setName2: (name: string) => ({ type: 'SET_NAME_2', name } as const),
    setOpponent: (opponent: OnlineOpponent) => ({ type: 'SET_OPPONENT', opponent } as const),
    setStartWord: (word: string) => ({ type: 'SET_START_WORD', word } as const),
    setPlayerName: (playerNumber: 1 | 2, name: string) => ({ type: 'SET_PLAYER_NAME', playerNumber, name } as const),
    incrementPlayerScore: (playerNumber: 1 | 2, increment: number) => ({ type: 'INCREMENT_PLAYER_SCORE', playerNumber, increment } as const),
    addPlayerWord: (playerNumber: 1 | 2, word: string) => ({ type: 'ADD_PLAYER_WORD', playerNumber, word } as const),
    changeCurrentPlayer: () => ({ type: 'CHANGE_CURRENT_PLAYER' } as const),
    setMultiPlayer: (isMultiplayer: boolean) => ({ type: 'SET_MULTIPLAYER', isMultiplayer } as const),
    setPlayGroundSize: (size: number) => ({ type: 'SET_PLAYGROUND_SIZE', size } as const),
}