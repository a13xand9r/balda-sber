import { ActionsType, CharacterType, OnlineOpponent, StateType } from '../types/types'
import {v4} from 'uuid'


export const initialState = {
    character: 'sber' as CharacterType,
    name: '',
    onlineOpponent: null as null | OnlineOpponent,
    userId: v4()
}

export const reducer = (state: StateType, action: ActionsType): StateType => {
    switch (action.type) {
        case 'SET_CHARACTER':
            return { ...state, character: action.characterId }
        case 'SET_NAME':
            return { ...state, name: action.name }
        case 'SET_OPPONENT':
            return { ...state, onlineOpponent: action.opponent }
        default: return state
    }
}

export const actions = {
    setCharacter: (characterId: CharacterType) => ({ type: 'SET_CHARACTER', characterId } as const),
    setName: (name: string) => ({ type: 'SET_NAME', name } as const),
    setOpponent: (opponent: OnlineOpponent) => ({ type: 'SET_OPPONENT', opponent } as const),
}