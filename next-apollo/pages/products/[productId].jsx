import { useRouter } from "next/router";

const product = () => {
  const route = useRouter();
  console.log(route);

  return <div>product</div>;
};

export default product;
