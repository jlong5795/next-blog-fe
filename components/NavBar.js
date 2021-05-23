import Link from 'next/link'
import styles from '../styles/NavBar.module.css'

const NavBar = () => {
    return (
        <div className={styles.main}>
            <Link href='/'><a>Home</a></Link>
            <a target="_blank" href='https://twitter.com/jlong5795'>Twitter</a>
            <a target='_blank' href='https://www.linkedin.com/in/jasonlong1231/'>LinkedIn</a>
            <a target='_blank' href='https://github.com/jlong5795'>GitHub</a>
        </div>
    )
}

export default NavBar