
export const checkWordAlreadyUsed = (usedWords: string[], currentWord: string) => {
    const word = usedWords.find(item => item === currentWord)
    return word ? true : false
}