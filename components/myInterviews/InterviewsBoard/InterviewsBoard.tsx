import styles from "./interviewsBoard.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import useAuthStore from "@/lib/zustand/stores/useAuthStore";
import useUserStore from '@/lib/zustand/stores/useUserStore';
import useHasMounted from "@/lib/hooks/useHasMounted";
import { API_URL } from "@/lib/utils/urls";
import axios, { AxiosError } from 'axios';
import InterviewCard from '../InterviewCard/InterviewCard';

import IInterview from "@/lib/types/Interviews/IInterview";

const InterviewsBoard = () => {
    // const hasMounted = useHasMounted();
    const accessToken = useAuthStore((state) => state.accessToken);
    const [switchRole, setSwitchRole] = useState<boolean>(false);
    const [switchStatus, setSwitchStatus] = useState<string>('pending');

    const [interviews, setInterviews] = useState<IInterview[]>();
    const [loading, setLoading] = useState<boolean>(false);
    // if (!hasMounted) return null;

    const [role] = useAuthStore(state => [state.user.role])

    const filterAnInterview=(_id:string)=>{
        const filtered=interviews?.filter(interview=>interview._id!==_id)
        setInterviews(filtered);
    }
    const fetchInterviews = async () => {
        const role = switchRole ? "had" : "made";
        console.log('fetchedQueries', role + "  " + switchStatus)
        try {
            setLoading(true);
            const response = await axios.get(`${API_URL}/interviews?type=${role}&&status=${switchStatus}`,
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
            // const error = err as AxiosError;
            // console.log(error)
            // setErrorCount((prev) => prev + 1);
            // //@ts-ignore
            // setError(error.response?.data?.message || "Something went wrong");
            // // if (error?.response) {
            // //     //@ts-ignore
            // //     setErrMsg(error.response?.data?.message);
            // // }
            // // else {
            // //     setErrMsg('Log in failed');
            // // }
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
                    className={styles.buttonStatus+' '+styles.yellow}
                    onClick={() => setSwitchStatus("pending")}
                    disabled={loading}
                >
                    {loading ? 'loading...' : 'pending'}
                </button>
                <button
                    className={styles.buttonStatus+' '+styles.green}
                    onClick={() => setSwitchStatus("confirmed")}
                    disabled={loading}

                >
                    {loading ? 'loading...' : 'confirmed'}
                </button >
                <button
                    className={styles.buttonStatus +" "+ styles.red}
                    onClick={() => setSwitchStatus("rejected")}
                    disabled={loading}

                >
                    {loading ? 'loading...' : 'rejected'}
                </button>
                <button
                    className={styles.buttonStatus+' '+styles.blue}
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
            filterAnInterview={filterAnInterview}/>)}
            </div>
        </>
    );
};

export default InterviewsBoard;