"use client";
import IconArrowRightSquare from '@/icons/IconArrowRightSquare'
import styles from './page.module.scss'

export default function Home() {
  const redirect = () => {
    window.location.href = '/game';
  }

  return (
    <main className={styles.main}>
      <h1>Hello, coder!</h1>
      <IconArrowRightSquare onClick={() => redirect()} width='75px' height='75px' style={{cursor: 'pointer'}} />
    </main>
  )
}
