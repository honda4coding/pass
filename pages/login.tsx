import Head from 'next/head';
import LogInForm from '../components/LogInForm';

export default function Login() {
    return (
        <>
            <Head>
                <title>Log In for pass.io</title>
                <meta name="description" content="Generated by create next app" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <LogInForm />
            </main>
        </>
    )
}

