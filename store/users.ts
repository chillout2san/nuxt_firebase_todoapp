import { getterTree, mutationTree, actionTree } from 'typed-vuex'
import firebase from '../plugins/firebase'

export const state = () => ({
  mail_address: '' as string,
  user_id: 0 as number,
  user_name: '' as string,
  admin: false as boolean,
  is_email_verified: false as boolean,
})

export type RootState = ReturnType<typeof state>

export const getters = getterTree(state, {
  mail_address: (state) => state.mail_address,
})

export const mutations = mutationTree(state, {
  setMail(state, mail: string): void {
    state.mail_address = mail
  },
})

export const actions = actionTree(
  { state, getters, mutations },
  {
    getMail({ getters, commit }) {
      const currentMail = getters.mail_address
      commit('setMail', currentMail + 1)
    },
    signUp(ctx, [name, mail, password]) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
          console.log(ctx)
          const currentUser = firebase.auth().currentUser
          currentUser!.updateProfile({
            displayName: name,
          })
        })
        .catch((error) => console.log(error))
    },
  }
)