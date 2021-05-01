import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  mail_address: '' as string | null,
  user_id: '' as string,
  user_name: '' as string | null,
  admin: false as boolean,
  is_email_verified: false as boolean,
  register_message: '',
  login_message: '',
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  register_message: (state) => state.register_message,
  login_message: (state) => state.login_message,
});

export const mutations = mutationTree(state, {
  setUserInfo(state, currentUser: firebase.User): void {
    state.mail_address = currentUser.email;
    state.user_name = currentUser.displayName;
    state.is_email_verified = currentUser.emailVerified;
  },
  setRegisterMessage(state, message: string) {
    state.register_message = message;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    signUp(ctx, [name, mail, password]: string[]): void {
      firebase
        .auth()
        .createUserWithEmailAndPassword(mail, password)
        .then(() => {
          ctx.commit('setRegisterMessage', '');
          this.$router.push('/message');
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
        })
        .catch(() => {
          ctx.commit(
            'setRegisterMessage',
            '既に会員登録済でないか、入力内容に誤りはないか確認してください'
          );
        });
    },
  }
);
