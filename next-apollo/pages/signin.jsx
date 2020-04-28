import apolloClient from "../apollo/apolloClient";
import SignIn from "../components/Signin";

const SignInPage = () => {
  return <SignIn></SignIn>;
};

export default apolloClient(SignInPage);
