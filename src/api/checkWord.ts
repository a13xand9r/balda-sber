import axios from 'axios'
import { CheckWordResponse } from '../types/types'


export const checkWord = async (word: string) => {
    // const { data } = await axios.get<CheckWordResponse>(
    //     `https://dictionary.yandex.net/api/v1/dicservice.json/lookup?lang=ru-ru&text=${word}&key=${process.env.REACT_APP_DICTIONARY_API_KEY}`
    // )
    // if (data.def.length > 0 && data.def[0].pos === 'noun'){
    //     return true
    // } else return false
    return true
}