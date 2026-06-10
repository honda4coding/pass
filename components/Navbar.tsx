import Link from "next/link";
import Image from "next/image";
import styles from "./navbar.module.scss"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faBars,
    faXmark
} from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";
import useAuthStore from "@/lib/zustand/stores/useAuthStore";
import useUserStore from '@/lib/zustand/stores/useUserStore';
import useHasMounted from "@/lib/hooks/useHasMounted";
import { useRouter } from 'next/router';
import useTrackStore from '@/lib/zustand/stores/useTrackStore';

const Navbar = () => {
    const hasMounted = useHasMounted();
    const router = useRouter();
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const accessToken: string | undefined = useAuthStore((state) => state.accessToken);
    const username = useAuthStore(state => state.user.username);
    const isAuth = (accessToken && accessToken !== '') ? true : false;

    const clearAuth = useAuthStore(state => state.clearAuth)
    const clearInfo = useUserStore(state => state.clearInfo)
    const [setVisitedHomeAfterLogin] = useTrackStore(state => [state.setVisitedHomeAfterLogin])

    if (!hasMounted) return null;

    function deleteCookie(name: string) {
        document.cookie = name + "=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    }

    const logout = () => {
        clearAuth();
        clearInfo();
        setVisitedHomeAfterLogin(false);
        deleteCookie('username')
        deleteCookie('info')
        deleteCookie('skills')
        router.push('/login');
    }

    return (
        <>
            <nav className={`${styles.nav} container`}>
                <Link href="/" className={styles.navBrand}>
                    <Image
                        className={styles.navBrand}
                        src="/assets/passLogo.svg"
                        alt=""
                        width={125}
                        height={57}
                    ></Image>
                </Link>
                <FontAwesomeIcon
                    icon={isOpen ? faXmark : faBars}
                    className={styles.navToggler}
                    onClick={(prev) => {
                        setIsOpen(prev => !prev)
                    }}
                />
                <ul className={`${styles.navList} ${styles.collapssibleContent} ${!isOpen ? styles.hidden : ''}`}>
                    <li className={styles.navItem}><Link href="/explore">Explore</Link></li>
                    <li className={styles.navItem}><Link href={isAuth ? '/manage-interviews' : '/login'}>My Interviews</Link></li>
                    <li className={styles.navItem}><Link href={isAuth ? `/users/${username}` : '/login'}>Profile</Link></li>
                    <li className={styles.navItem}><Link href={isAuth ? '/users/settings' : '/login'}>Settings</Link></li>

                    {!isAuth && <li className={styles.navItem}><Link href="/login" className={styles.logIn}>Log in</Link></li>}
                    {isAuth && <li className={styles.navItem}><button className={styles.logIn} onClick={logout}>Log out</button></li>}
                </ul>
            </nav>
        </>
    )
}

export default Navbar;