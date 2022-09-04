import axios from "axios"
import { __baseUrl__ } from "../../constant"
import { CountdownCircleTimer } from "react-countdown-circle-timer"


export const getArrayWords = async (group: string | undefined, page:string) => {
    return await axios.get(__baseUrl__ + `words?page=${+page-1}&group=${group}`)
}

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

export const randomTranslate = (num: number) => {
    let x = Math.round(Math.random() * 4)
    return x > 2 ? Math.round(Math.random() * 19) : num
}
