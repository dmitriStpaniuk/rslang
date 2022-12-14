import { axiosApiInstance, __baseUrl__ } from "./components/constant";
import { Headers } from "./components/Headers.tsx";
import { useUser } from "./components/UserProvider";

function App() {
  const [user] = useUser();
  const getStatistic = async () => {
    if (user)
      await axiosApiInstance
        .get(__baseUrl__ + `users/${user?.id}/statistics`)
        .catch(() =>
          axiosApiInstance.put(__baseUrl__ + `users/${user?.id}/statistics`, {
            learnedWords: 0,
            optional: {
              sprint: {
                winnerWords: [],
              },
              audio: {
                winnerWords: [],
              },
              winrateHistory: {
                data: [],
              },
            },
          })
        );
  };
  getStatistic();
  
  return <Headers />;
}

export default App;
