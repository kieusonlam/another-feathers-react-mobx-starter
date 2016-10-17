import React from 'react'

export default class About extends React.Component {
    render() {
        return <section>
            <h1>About</h1>
            <p><img src='/avatar.jpg' /></p>
            <p>Created by Lam Kieu, inspired by nightwolfz's mobx-starter</p>
            <p>
                <a href="https://github.com/Xerios/mobx-isomorphic-starter" target="_blank">
                    https://github.com/Xerios/mobx-isomorphic-starter
                </a>
            </p>
        </section>
    }
}
