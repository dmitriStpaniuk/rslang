import axios from "axios";
import audio from "./assets/img/audio.png"
import library from "./assets/img/library.png"
import sprint from "./assets/img/sprint.png"
// export const __baseUrl__ = 'https://react-learnwords-project.herokuapp.com/'

export const __baseUrl__ = 'http://localhost:3001/';

export const mainState = [
  {
    title: 'Library',
    img: library,
    discription: 'Описание о библиотеке',
    src: ''
  },
  {
    title: 'Audio',
    img: audio,
    discription: 'Описание о аудио',
    src: ''
  },
  {
    title: 'Sprint',
    img: sprint,
    discription: 'Описание о спринте',
    src: ''
  },
]
export type Difficulty = {
  level: string,
  title: string,
  titleDiscription1: string,
  discription1: string,
  colorTitle1: string,
  titleDiscription2: string,
  discription2: string,
  colorTitle2:string 
}
export const difficulty = [
  {
    level: '1',
    title: 'A1 Elementary',
    titleDiscription1: 'BEGINNER - Английский с нуля',
    discription1: 'Вы знаете несколько английских слов: hello, thank you, goodbye и некоторые международные слова. Однако Вы почти ничего не можете сказать по-английски и очень плохо понимаете английскую речь.',
    colorTitle1: '#F7B68E',
    titleDiscription2: 'STARTER - Английский для начинающих',
    discription2: 'Вы понимаете простые слова и фразы в повседневных ситуациях, но ответить не можете. Вы боитесь говорить. Вам трудно прочесть слова на английском языке.',
    colorTitle2: '#DECC37',
  },
  {
    level: '2',
    title: 'A2 Pre-Intermediate',
    titleDiscription1: 'ELEMENTARY - Базовый английский',
    discription1: 'Вы понимаете и используете простые слова и выражения на английском языке в повседневных ситуациях. Вам тяжело даётся грамматика, и Вы не понимаете, как применять правила на практике.',
    colorTitle1: '#253CA2',
    titleDiscription2: 'PRE-INTERMEDIATE - Начальный средний уровень',
    discription2: 'Вы умеете общаться на английском языке на базовом уровне, а также знаете много грамматических правил, но некоторые кажутся Вам слишком сложными. Вы неуверенно изъясняетесь на некоторые темы.',
    colorTitle2: '#8BBA28'
  },
  {
    level: '3',
    title: 'B1 Intermediate',
    titleDiscription1: 'INTERMEDIATE - Уверенный средний уровень',
    discription1: 'Вы уверенно общаетесь на английском языке на повседневные темы. Вы можете найти общий язык с носителями языка и иностранцами. Однако Ваш словарный запас небогат.',
    colorTitle1: '#C62D3E',
    titleDiscription2: '',
    discription2: '',
    colorTitle2: ''
  },
  {
    level: '4',
    title: 'B2 Upper-intermediate',
    titleDiscription1: 'UPPER-INTERMEDIATE - Английский выше среднего',
    discription1: 'Вы уверенно владеете языком для письменного и устного общения. Однако возможны частые ошибки в речи из-за того, что однажды вы что-то недоучили или не поняли.',
    colorTitle1: '#BF7E46',
    titleDiscription2: '',
    discription2: '',
    colorTitle2: ''
  },
  {
    level: '5',
    title: 'C1 Advanced',
    titleDiscription1: 'ADVANCED - Продвинутый английский',
    discription1: 'Вы отлично владеете английским языком для академических целей и для работы. Ваша речь отличается беглостью. Ваш словарный запас очень богат. Тем не менее, у Вас есть некоторые трудности в деловых беседах.',
    colorTitle1: '#39ABB8',
    titleDiscription2: '',
    discription2: '',
    colorTitle2: ''
  },
  {
    level: '6',
    title: 'C2 Proficiecy',
    titleDiscription1: 'PROFICIENCY - Профессиональный английский',
    discription1: 'Вы абсолютно свободно владеет английским языком и желает сдать самый сложный и «старый» кембриджский экзамен CPE. Успешная сдача CPE говорит о том, что кандидат владеет английским, как образованный англичанин. ',
    colorTitle1: '#7E368E',
    titleDiscription2: '',
    discription2: '',
    colorTitle2: ''
  },

]
const token = localStorage.getItem('tokenUser');
export const axiosApiInstance = axios.create();
axiosApiInstance.interceptors.request.use(
  async config => {
    if (token) {
      const keys = JSON.parse(token)
      config.headers = {
        'Authorization': `Bearer ${keys}`,
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }
    return config;
  },
  error => {
    Promise.reject(error);
  });

