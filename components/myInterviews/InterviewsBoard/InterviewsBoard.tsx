import styles from "./interviewsBoard.module.scss"
import { useState, useEffect } from "react";
import useAuthStore from "@/lib/zustand/stores/useAuthStore";
import useUserStore from '@/lib/zustand/stores/useUserStore';
import useHasMounted from "@/lib/hooks/useHasMounted";
import { API_URL } from "@/lib/utils/urls";
import axios, { AxiosError } from 'axios';
import InterviewCard from '../InterviewCard/InterviewCard';

import IInterview from "@/lib/types/Interviews/IInterview";
import { fireError } from '@/lib/utils/toasts';

const InterviewsBoard = () => {
    // const hasMounted = useHasMounted();
    const accessToken = useAuthStore((state) => state.accessToken);
    const [switchRole, setSwitchRole] = useState<boolean>(false);
    const [switchStatus, setSwitchStatus] = useState<string>('pending');

    const [interviews, setInterviews] = useState<IInterview[]>();
    const [loading, setLoading] = useState<boolean>(false);
    // if (!hasMounted) return null;

    const [role] = useAuthStore(state => [state.user.role])

    const filterAnInterview = (_id: string) => {
        const filtered = interviews?.filter(interview => interview._id !== _id)
        setInterviews(filtered);
    }
    const fetchInterviews = async () => {
        let type = switchRole ? "had" : "made";
        if (role === 'interviewee') {
            type = 'had';
        }
        console.log('fetchedQueries', type + "  " + switchStatus)
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/interviews?type=${type}&&status=${switchStatus}`,
                {
                    headers: {
                        Authorization: `Bearer ${accessToken}`,
                    }
                }
            );
            console.log(JSON.stringify(response?.data));
            setInterviews(response?.data)
            setLoading(false);
        } catch (err) {
            setLoading(false);
            const error = err as AxiosError;
            console.log(error)
            //@ts-ignore
            if (error?.response) {
                //@ts-ignore
                fireError(error.response?.data?.message);
            }
            else {
                fireError('Something went wrong');
            }
        }
    }

    useEffect(() => {
        fetchInterviews();
    }, [switchStatus, switchRole])

    return (
        <>
            {role === 'interviewer' && <button
                className={styles.buttonRole}
                onClick={() => setSwitchRole(false)}

            >
                As Interviewer 🤵🏻
            </button>}
            <button
                className={styles.buttonRole}
                onClick={() => setSwitchRole(true)}
            >
                As Interviewee 👨‍💻
            </button>
            <div className={styles.statusContainer}>
                <button
                    className={styles.buttonStatus + ' ' + styles.yellow}
                    onClick={() => setSwitchStatus("pending")}
                    disabled={loading}
                >
                    {loading ? 'loading...' : 'pending'}
                </button>
                <button
                    className={styles.buttonStatus + ' ' + styles.green}
                    onClick={() => setSwitchStatus("confirmed")}
                    disabled={loading}

                >
                    {loading ? 'loading...' : 'confirmed'}
                </button >
                <button
                    className={styles.buttonStatus + " " + styles.red}
                    onClick={() => setSwitchStatus("rejected")}
                    disabled={loading}

                >
                    {loading ? 'loading...' : 'rejected'}
                </button>
                <button
                    className={styles.buttonStatus + ' ' + styles.blue}
                    onClick={() => setSwitchStatus("finished")}
                    disabled={loading}

                >
                    {loading ? 'loading...' : 'finished'}
                </button>
            </div>
            {interviews?.length === 0 && <p className={styles.caughtUp}>You are all caught up</p>}
            <div className={styles.cardsContainer}>
                {interviews?.map(interview =>
                    <InterviewCard
                        key={interview._id}
                        interview={interview}
                        accessToken={accessToken}
                        filterAnInterview={filterAnInterview} />)}
            </div>
        </>
    );
};

export default InterviewsBoard;