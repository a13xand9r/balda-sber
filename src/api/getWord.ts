import axios from 'axios'

export const getWord = async (lettersCount: number) => {
    const { data } = await axios.get<string>(
        // process.env.NODE_ENV === 'development' ?
        //     `http://localhost:5000/word?lettersCount=${lettersCount}` :
            `https://balda-scenario-sber.herokuapp.com/word?lettersCount=${lettersCount}`
    )
    console.log('word', data)
    return data
}