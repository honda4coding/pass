import Head from "next/head";
import Navbar from "@/components/Navbar";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "@/styles/pages/pleaseConfirmEmail.module.scss";

import axios, { AxiosError } from "axios";
import { API_URL } from "@/lib/utils/urls";
import useAuthStore from '@/lib/zustand/stores/useAuthStore'
import useUserStore from '@/lib/zustand/stores/useUserStore'

import {
    InferGetServerSidePropsType,
    GetServerSideProps,
    GetServerSidePropsContext,
} from "next";
import { ParsedUrlQuery } from "querystring";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSquareCheck,
    faSquareXmark,
} from "@fortawesome/free-solid-svg-icons";

import {fireError,fireSuccess}from '@/lib/utils/toasts'
import useHasMounted from '@/lib/hooks/useHasMounted'

type Props = {
    merchantId: any;
};
// interface IParams extends ParsedUrlQuery {
//     EmailConfirmationToken: string;
// }

export default function OnBoardingFinished(
    props: InferGetServerSidePropsType<typeof getServerSideProps>
) {
    const hasMounted=useHasMounted();
    const router = useRouter();
    const [msg, setMsg] = useState<string>("");
    const [success, setSuccess] = useState<boolean>(false);
    // console.log('router here', router);
    // console.log('context here', props.first);

    const accessToken=useAuthStore(state=>state.accessToken);
    const setMerchantId=useUserStore(state=>state.setMerchantId)

    useEffect(
        () => {

            const isConfirmed = async() => {
                try {
                    const response = await axios.put(`${API_URL}/payments/onboard/finish`,
                        {
                            'merchantId': props.merchantId,
                        }
                    ,{
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        }
                    });
                    console.log('response',JSON.stringify(response?.data));
                    setSuccess(true);
                    console.log(response?.data.info.merchantId)
                    setMerchantId(response?.data.info.merchantId)
                    setMsg('onboarding is done successfully, now you can set the price you want from settings and start earning.')
                } catch(err) {
                    console.log(err)
                    setSuccess(false);
                    setMsg('something wrong happened')
                }
            }

            isConfirmed();
        }, [])

    // console.log(props.isEmailConfirmed);

            if(!hasMounted)
                return null;

    return (
        <>
            <Head>
                <title>Pass</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Navbar />
                <section className={styles.block}>
                    <div className={`container ${styles.center}`}>
                        <FontAwesomeIcon
                            icon={success ? faSquareCheck : faSquareXmark}
                            style={{
                                color: `${success ? "limegreen" : "red"}`,
                                fontSize: "12rem",
                            }}
                        />
                        <p className={styles.text}>
                            {
                                msg
                            }
                        </p>
                    </div>
                </section>
            </main>
        </>
    );
}

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
    // const { emailConfirmationToken } = ctx.params as IParams;
    console.log('paypalQuery',ctx.query.merchantIdInPayPal)
    let merchantId:any = ctx.query.merchantIdInPayPal;


    return {
        props: {
            merchantId: merchantId,
        },
    };
};