import appStore from './appStore'
import messagesStore from './messagesStore'

export default (state) => ({
  app: new appStore(state.app),
  messagesStore: new messagesStore(state.messagesStore),
})
