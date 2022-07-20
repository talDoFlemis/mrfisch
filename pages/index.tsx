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

const Home = ({ data }: indexProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [section, setSection] = useState("");
  const handleScroll = () => {
    const position = window.pageYOffset;
    if (position !== 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <main className="h-max w-full">
      <Header section={section} scrolled={isScrolled} />
      <InView
        onChange={(inView) => {
          if (inView) {
            setSection("");
          }
        }}
        threshold={0.5}
      >
        <LandingPage />
      </InView>
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
