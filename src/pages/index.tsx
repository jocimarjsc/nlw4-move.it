import { CompletedChallengs } from "../components/CompletedChallenges";
import { ChallengeBox } from "../components/ChallengeBox";
import { CountDown } from "../components/CountDown";
import { ExperienceBar } from "../components/ExperienceBar";
import { Profile } from "../components/Profile";
import Head from "next/head";
import { GetServerSideProps } from "next";

import styles from "../styles/pages/Home.module.css";
import { CountdownProvider } from "../contexts/CountdownContext";
import { ChallengeProvider } from "../contexts/ChallengesContext";

interface HomeProps {
  level: number;
  currenteExperience: number;
  challengeCompleted: number

}

export default function Home( props: HomeProps ) {
  return (
    <ChallengeProvider
      level={props.level}
      currenteExperience={props.currenteExperience}
      challengeCompleted={props.challengeCompleted}
    >
      <div className={styles.container}>
        <Head>
          <title>Início | Move.it</title>
        </Head>
        <ExperienceBar />

        <CountdownProvider>
          <section>
            <div>
              <Profile />
              <CompletedChallengs />
              <CountDown />
            </div>

            <div>
              <ChallengeBox />
            </div>
          </section>
        </CountdownProvider>
      </div>
    </ChallengeProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { level, currenteExperience, challengeCompleted } = ctx.req.cookies;
  return {
    props: {
      level: Number(level),
      currenteExperience: Number(currenteExperience),
      challengeCompleted: Number(challengeCompleted)
    }
  }
}