import Header from "../components/home/Header";
import LandingPage from "../components/home/LandingPage";

interface indexProps {}

const Home = ({}: indexProps) => {
  return (
    <>
      <Header />
      <LandingPage />
    </>
  );
};

export default Home;
