import { createContext, ReactNode, useEffect, useState } from "react";
import Cookies from "js-cookie";
import challenges from "../../challenges.json";
import { LevelUpModal } from "../components/LevelUpModal";

interface ChallengeProviderProps {
    children: ReactNode;
    level: number;
    currenteExperience: number;
    challengeCompleted: number
}

interface Challenge {
    type: "body" | "eye";
    description: string;
    amount: number;
}

interface ChallengesContextData {
    level: number;
    currenteExperience: number;
    challengeCompleted: number;
    activeChallenge: Challenge;
    experienceToNextLevel: number;
    levelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
    closeLevelUpModal: () => void;
}

export const ChallengeContext = createContext({} as ChallengesContextData);

export function ChallengeProvider({ children, ...rest }: ChallengeProviderProps) {
    const [level, setLevel] = useState(rest.level ?? 1);
    const [currenteExperience, setCurrentExperience] = useState(rest.currenteExperience ?? 0);
    const [challengeCompleted, setChallengeCompleted] = useState(rest.challengeCompleted ?? 0);

    const [activeChallenge, setActiveChallenge] = useState(null);
    const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2);

    useEffect(() => {
        Notification.requestPermission();
    }, []);

    useEffect(() => {
        Cookies.set("level", String(level));
        Cookies.set("currenteExperience", String(currenteExperience));
        Cookies.set("challengeCompleted", String(challengeCompleted));
    }, [level, currenteExperience, challengeCompleted])

    function levelUp() {
        setLevel(level + 1);
        setIsLevelUpModalOpen(true)
        new Audio("/congractulation.mp3").play();
    }

    function closeLevelUpModal() {
        setIsLevelUpModalOpen(false);
    }

    function startNewChallenge() {
        const randomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randomChallengeIndex];
        setActiveChallenge(challenge);

        new Audio("/notification.mp3").play();

        if (Notification.permission === "granted") {
            new Notification("Novo desafio :D", {
                body: `Valendo ${challenge.amount}`
            })
        }
    }

    function resetChallenge() {
        setActiveChallenge(null)
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;

        let finalExperience = currenteExperience + amount;

        if (finalExperience >= experienceToNextLevel) {
            finalExperience = finalExperience - experienceToNextLevel;
            levelUp();
        }
        setCurrentExperience(finalExperience);
        setActiveChallenge(null);
        setChallengeCompleted(challengeCompleted + 1);
    }

    return (
        <ChallengeContext.Provider
            value={{
                level,
                currenteExperience,
                challengeCompleted,
                experienceToNextLevel,
                levelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                completeChallenge,
                closeLevelUpModal
            }}>
            { children}
            {isLevelUpModalOpen && <LevelUpModal />}
        </ChallengeContext.Provider>
    )
}