import { useUser } from "./UserProvider";

type WithAuthParams<T> = (props: T) => JSX.Element;


const withAuth = <PropsType,>(Component: WithAuthParams<PropsType>) => {

  return (props: PropsType) => {
    const [user] = useUser();
    if (!user) return null;
    return <Component {...props} />
  };
};

export default withAuth;
