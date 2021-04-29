import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  mail_address: '' as string | null,
  user_id: '' as string,
  user_name: '' as string | null,
  admin: false as boolean,
  is_email_verified: false as boolean,
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  mail_address: (state) => state.mail_address,
});

export const mutations = mutationTree(state, {
  setUserInfo(state, currentUser: firebase.User): void {
    state.mail_address = currentUser.email;
    state.user_name = currentUser.displayName;
    state.is_email_verified = currentUser.emailVerified;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    signUp(_ctx, [name, mail, password]) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
          const currentUser = firebase.auth().currentUser;
          currentUser!.updateProfile({
            displayName: name,
          });
          firebase.firestore().collection('users').doc(mail).set({
            mail_address: mail,
            user_id: currentUser?.uid,
            user_name: name,
            admin: false,
            is_email_verified: false,
          });
          currentUser!.sendEmailVerification();
        });
    },
  }
);
