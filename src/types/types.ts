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
    multiPlayerSettings: null
    opponentDisconnected: null
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

export type OpponentFoundMessage = {
    type: 'FOUND',
    payload: {
        opponentName: string
        opponentId: string
        roomId: string
    }
}
export type StartGameMessage = {
    type: 'START',
}
export type ChangePlaygroundSizeMessage = {
    type: 'CHANGE_PLAYGROUND_SIZE',
    payload: {
        opponentId: string
        size: number
    }
}
export type ReadyMessage = {
    type: 'READY'
    payload: {
        opponentId: string
    }
}
export type StartWordMessage = {
    type: 'START_WORD'
    payload: {
        startWord: string
    }
}
export type WordDoneMessage = {
    type: 'WORD_DONE'
    payload: {
        opponentId: string
        cells: CellType[]
        newWord: string
    }
}
export type ChangeCurrentPlayerMessage = {
    type: 'SET_CURRENT_PLAYER'
    payload: {
        opponentId: string
        currentPlayer: 1 | 2
    }
}
export type FinishGameMessage = {
    type: 'FINISH_GAME'
}
export type OpponentDisconnectedMessage = {
    type: 'OPPONENT_DISCONNECTED'
}
export type TimerDoneMessage = {
    type: 'TIMER_DONE'
}

export type SendMessage =
    RandomPlayMessage |
    FriendPlayMessage |
    ChangePlaygroundSizeMessage |
    ReadyMessage |
    WordDoneMessage |
    ChangeCurrentPlayerMessage |
    FinishGameMessage |
    TimerDoneMessage

export type GetMessage =
    OpponentFoundMessage |
    StartGameMessage |
    ChangePlaygroundSizeMessage |
    StartWordMessage |
    WordDoneMessage |
    ChangeCurrentPlayerMessage |
    OpponentDisconnectedMessage |
    TimerDoneMessage

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