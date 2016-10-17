import React, { Component } from 'react';
import { connect } from '../../utils/context'
import { app } from '../../app'

@connect
export default class Browse extends Component {
  static fetchData(store) {
    return store.messagesStore.getMessages()
  }

  componentDidMount() {
    app.service('api/messages').on('created', message => this.context.store.messagesStore.getMessages())
  }

  render() {
    const messages = this.context.store.messagesStore.messages.map(message => (
      <li key={message._id}>{message.text}</li>
    ))
    // console.log(this)
    return <section>
        <h1>Messages</h1>
        <p>This is delayed page example, executed on server and client alike</p>
        <ul>
          {messages}
        </ul>
    </section>
  }
}
