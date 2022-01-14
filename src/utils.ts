
export const checkWordAlreadyUsed = (usedWords: string[], currentWord: string) => {
    const word = usedWords.find(item => item === currentWord)
    return word ? true : false
}

export const getTimerPercentage = (timer: number, limit: number) => {
    return (timer / limit) * 100
}