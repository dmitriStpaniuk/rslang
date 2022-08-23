import axios from "axios"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { __baseUrl__ } from "../constant"


export const Timer = () => (
    <CountdownCircleTimer
        isPlaying
        duration={60}
        colors={['#058c92c', '#dbb1239', '#1976d2', '#e14e30f0']}
        colorsTime={[60, 40, 20, 0]}
        size={50}
        strokeWidth={5}
    >
        {({ remainingTime }) => remainingTime}
    </CountdownCircleTimer>
)

export const randomPage = () => {
    return Math.ceil(Math.random() * 30)
}

export const getArrayWords = async ( group: string | undefined) => {
    return await axios.get(__baseUrl__ + `words?page=${randomPage()}&group=${group}`)
}

export const newArrayWords = async ( group: string | undefined) => {
    return await axios.get(__baseUrl__ + `words?page=${randomPage()}&group=${group}`)
}