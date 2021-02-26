import { useContext } from "react";
import { ChallengeContext } from "../contexts/ChallengesContext";
import styles from "../styles/components/ExperienceBar.module.css";

export function ExperienceBar() {
    const { currenteExperience, experienceToNextLevel } = useContext(ChallengeContext);

    const percentNextLevel = Math.floor(currenteExperience * 100) / experienceToNextLevel;

    return (
        <header className={styles.experienceBar}>
            <span>0 xp</span>
            <div>
                <div style={{ width: `${percentNextLevel}%`}}/>

                <span className={styles.currentExperience} style={{ left: `${percentNextLevel}%`}}>
                    {currenteExperience} xp
                </span>
            </div>
            <span>{experienceToNextLevel} xp</span>
        </header>
    )
}