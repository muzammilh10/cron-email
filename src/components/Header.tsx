import React from 'react'
import Link from 'next/link'
import {useRouter} from 'next/router'

const Header: React.FC = () => {
    const router = useRouter()
    const isActive: (pathname: string) => boolean = (pathname) =>
        router.pathname === pathname

    return (
        <nav>
            <div className={"links"}>
                <Link href="/" legacyBehavior>
                    <a data-active={isActive('/')}>
                        Home
                    </a>
                </Link>
            </div>
            <div className={"logo"}>
                <h2>Weather Website</h2>
            </div>

            <style jsx>{`
              nav {
                display: flex;
                padding: 2rem;
                justify-content: space-between;
                align-items: center;
                height: 3rem;
                background-color: var(--foreground-color-accent);
              }

              nav a {
                text-decoration: none;
                color: var(--background-color);
                display: inline-block;
              }

              nav a + a {
                margin-left: 1rem;
              }

              nav a:hover {
                text-decoration: underline;
              }

              nav a[data-active="true"] {
                text-decoration: underline;
                color: var(--background-color-accent);
              }

              .logo {
                color: var(--background-color);
              }
            `}</style>
        </nav>
    )
}

export default Header
