import axios from "axios"
import { axiosApiInstance, __baseUrl__ } from "../../constant"
import { CountdownCircleTimer } from "react-countdown-circle-timer"
import { ResponseData } from "./SprintGame"

export const getArrayWords = async (group: string | undefined) => {
    return await axios.get(__baseUrl__ + `words?page=${randomPage()}&group=${group}`)
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
    let x = Math.round(Math.random() * 2)
    return x > 1 ? Math.round(Math.random() * 19) : num
}



// const idUser = localStorage.getItem('idUser');
// export const setResultByServer = async (card: ResponseData) => {
//     await axiosApiInstance.put(__baseUrl__ + `users/${idUser}/statistics`, {
//         "learnedWords": 0,
//         "optional": {
//             studied: false
//         }
//     })
// }