import Head from "next/head";
// import Image from "next/image";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/pages/manageInterviews.module.scss"
import Card from '@/components/explore/Card/Card'

import axios, { AxiosError } from "axios";
import { API_URL } from "@/lib/utils/urls";

import {
    InferGetServerSidePropsType,
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";



// import IUser from '@/lib/types/IUser';
import SearchBox from "@/components/explore/SearchBox/SearchBox";
import IUserBack from "@/lib/types/IUserBack";
import GenericError from "@/components/common/GenericError/GenericError";
import useAuthStore from '@/lib/zustand/stores/useAuthStore';
import useHasMounted from '@/lib/hooks/useHasMounted';
import InterviewsBoard from "@/components/myInterviews/InterviewsBoard/InterviewsBoard";

// type Props = {
//     usersData?: IUserBack[] | null
//     errorMsg: string
// };
// interface IParams extends ParsedUrlQuery {
//     username: string;
// }


export default function ManageInterviews() {
    const router = useRouter();
    // console.log('router here', router);
    // console.log('props here', props);

    const hasMounted= useHasMounted();
    const username = useAuthStore(state => state.user.username);

    if(!hasMounted)return null;

    return (
        <>
            <Head>
                <title>Manage Interviews</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <Navbar />
            <div className={styles.bgWrapper}>
                <main className={`container ${styles.block}`}>
                    <InterviewsBoard/>
                </main>
            </div>
        </>
    );
}

// export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
//     console.log("ctx.query", ctx.query);
//     let usersData;
//     let errorMsg: string | null = null;

//     // console.log(`${API_URL}/users/search${ctx.query.fullTextSearch ? '?fullTextSearch=' + ctx.query.fullTextSearch : ''}${ctx.query.skills ? '&info.skills=' + ctx.query.skills : ''}`)
//     try {
//         const response = await axios.get(
//             `${API_URL}/users/search?${ctx.query.fullTextSearch ? 'fullTextSearch=' + ctx.query.fullTextSearch : ''}${ctx.query.skills && !ctx.query.fullTextSearch ? 'info.skills=' + ctx.query.skills : (ctx.query.skills) ? '&info.skills=' + ctx.query.skills : ''}`
//         );
//         // console.log(JSON.stringify(response?.data));
//         // userData = omit(['password'], response?.data);
//         usersData = response.data as IUserBack[];
//         // console.log("usersData", usersData);
//     } catch (err) {
//         const e = err as AxiosError;
//         console.log(e);
//         //@ts-ignore
//         errorMsg = e.response?.data?.message;
//     }
//     return {
//         props: {
//             usersData: usersData || null,
//             errorMsg: errorMsg || 'Server is down'
//         },
//     };
// };
