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
export const difficulty =[
  {
    level:'1',
    title:'A1 Elementary'
  },
  {
    level:'2',
    title:'A2 Pre-Intermediate'
  },
  {
    level:'3',
    title:'B1 Intermediate'
  },
  {
    level:'4',
    title:'B2 Upper-intermediate'
  },
  {
    level:'5',
    title:'C1 Advanced'
  },
  {
    level:'6',
    title:'C2 Proficiecy'
  },
  
]
const token = localStorage.getItem('tokenUser');
export const axiosApiInstance = axios.create({baseURL: __baseUrl__});
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

