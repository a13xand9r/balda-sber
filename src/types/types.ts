import { actions, initialState } from '../store/store'

export type StateType = typeof initialState

type InferActionType<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never
export type ActionsType = InferActionType<typeof actions>

export type CharacterType = 'sber' | 'joy' | 'eva'

export interface PageStateType {
    start: null
    random: null
    play: null
    wordsHistory: null
    settings: null
    rules: null
    finish: null
    victory: null
}

export type RandomPlayMessage = {
    type: 'RANDOM',
    payload: {
        name: string
        userId: string
    }
}
export type FriendPlayMessage = {
    type: 'FRIEND',
    payload: {
        userId: string
        name: string
        roomId: number
    }
}
export type StartGameMessage = {
    type: 'START',
    payload: {
        opponentName: string
        opponentId: string
        roomId: string
    }
}

export type SendMessage = RandomPlayMessage | FriendPlayMessage
export type GetMessage = StartGameMessage

export type OnlineOpponent = {
    name: string,
    userId: string,
    roomId: number
}

export type CellType = {
    colored: boolean
    letter: string | null
    isAvailableToPutLetter: boolean
    isInput: boolean
    tempLetter: string | null
}

type DefType = {
    text: string
    pos: string
}
export type CheckWordResponse = {
    def: DefType[]
}

export type Player = {
    name: string
    words: string[]
    score: number
}