import apolloClient from "../apollo/apolloClient";
import Signup from "../components/Signup";

const signup = () => {
  return (
    <div>
      <Signup></Signup>
    </div>
  );
};

export default apolloClient(signup);
