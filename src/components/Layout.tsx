import React, {ReactNode} from 'react'
import Header from './Header'
import styles from '@/components/Layout.module.css'

type Props = {
    children: ReactNode
}

const Layout: React.FC<Props> = (props) => (
    <div>
        <Header/>
        <div className="layout">{props.children}</div>

        <style jsx>{`
          .layout {
            padding: 0 2rem;
          }
        `}</style>
    </div>
)

export default Layout
