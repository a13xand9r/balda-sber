
export const checkWordAlreadyUsed = (usedWords: string[], currentWord: string) => {
    const word = usedWords.find(item => item.toLocaleLowerCase().trim() === currentWord.toLocaleLowerCase().trim())
    return word ? true : false
}

export const getTimerPercentage = (timer: number, limit: number) => {
    return (timer / limit) * 100
}

export const badWords = [
    'лох',
    'хуй',
    'пидор',
    'ебал',
    'ебат',
    'ебан',
    'еблан',
    'уебищ',
    'долбаеб',
    'блять',
    'еблан',
    'рукоблуд',
    'ссанина',
    'очко',
    'блядун',
    'вагина',
    'сука',
    'ебланище',
    'влагалище',
    'пердун',
    'дрочила',
    'пидр',
    'пизда',
    'малафья',
    'мудила',
]

export const badWordsValidation = (name: string) => {
    return !!badWords.find(word => name.toLocaleLowerCase().includes(word))
}
