import axios from "axios";
import { GetStaticProps } from "next";
import AboutSection from "@components/home/AboutSection";
import ShareSection from "@components/home/ShareSection";
import { useEffect, useState } from "react";
import Header from "../components/home/Header";
import LandingPage from "../components/home/LandingPage";
import { GithubInterface } from "typings";
import { InView } from "react-intersection-observer";
import CreateSection from "@components/home/CreateSection";

interface indexProps {
  data: GithubInterface;
}

//TODO: Add smooth scrolling and header getting small height and backdrop blur over scroll

const Home = ({ data }: indexProps) => {
  const handleScroll = () => {
    const position = window.pageYOffset;
    // console.log(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [section, setSection] = useState("");

  return (
    <main className="h-max w-full">
      <Header section={section} />
      <LandingPage />
      <InView
        onChange={(inView) => {
          if (inView) {
            setSection("create");
          }
        }}
        threshold={0.5}
      >
        <CreateSection />
      </InView>
      <InView
        onChange={(inView) => {
          if (inView) {
            setSection("share");
          }
        }}
        threshold={0.5}
      >
        <ShareSection />
      </InView>
      <InView
        onChange={(inView) => {
          if (inView) {
            setSection("about");
          }
        }}
        threshold={0.5}
      >
        <AboutSection profile={data} />
      </InView>
    </main>
  );
};

export default Home;

export const getStaticProps: GetStaticProps = async () => {
  const data = await axios
    .get("https://api.github.com/users/taldoflemis")
    .then((res) => res.data);

  return {
    props: { data },
  };
};
