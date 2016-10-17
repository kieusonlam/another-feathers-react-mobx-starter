import { observable, action, autorun, transaction } from 'mobx'
import { app } from '../../app'

export default class Messages {

  @observable messages = []

  constructor(messagesStore) {
    Object.assign(this, messagesStore);
  }

  @action getMessages = () => {
    app.service('api/messages').find({
              query: {
                $sort: { createdAt: -1 },
                $limit: 10
              }}).then(page => {
                this.messages = page.data.reverse()
              })
  }
}
