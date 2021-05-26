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
  mail_address: (state) => state.mail_address,
  user_name: (state) => state.user_name,
  admin: (state) => state.admin,
  is_email_verified: (state) => state.is_email_verified,
  register_message: (state) => state.register_message,
  login_message: (state) => state.login_message,
});

export const mutations = mutationTree(state, {
  setUserInfo(state, currentUser: firebase.User): void {
    state.mail_address = currentUser.email;
    state.user_id = currentUser.uid;
    state.user_name = currentUser.displayName;
    state.is_email_verified = currentUser.emailVerified;
  },
  clearUserInfo(state) {
    state.mail_address = '';
    state.user_id = '';
    state.user_name = '';
    state.is_email_verified = false;
    state.admin = false;
  },
  setAdminInfo(state, admin: boolean) {
    state.admin = admin;
  },
  setRegisterMessage(state, message: string) {
    state.register_message = message;
  },
  setLoginMessage(state, message: string) {
    state.login_message = message;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    signIn(ctx, [mail, password]: string[]): void {
      // ログイン永続性はSESSION
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // メールアドレスとパスワードでログイン
          firebase
            .auth()
            .signInWithEmailAndPassword(mail, password)
            .then(() => {
              const currentUser = firebase.auth().currentUser!;
              // ユーザーのメールアドレスが認証されていれば画面遷移
              if (currentUser.emailVerified === true) {
                // 一度打ち間違えてログイン成功した場合を考えてLoginMessageを削除
                ctx.commit('setLoginMessage', '');
                // ユーザーが管理者権限を持っているか
                let adminBoolean = false;
                firebase
                  .firestore()
                  .collection('users')
                  .doc(mail)
                  .get()
                  .then((doc) => {
                    if (doc.exists) {
                      adminBoolean = doc.data()!.admin;
                    }
                  })
                  .then(() => {
                    ctx.commit('setAdminInfo', adminBoolean);
                  });
                // ユーザー情報をstateに格納
                ctx.commit('setUserInfo', currentUser);
                // メール認証して初回ログイン時にfirestore内での認証データをtrueに変更
                firebase.firestore().collection('users').doc(mail).update({
                  is_email_verified: true,
                });
                // firestoreからログインしたユーザーのタスクを取得。usersのstoreにタスクデータを渡す。
                firebase
                  .firestore()
                  .collection('users')
                  .doc(mail)
                  .collection('todos')
                  .get()
                  .then((snapshot) => {
                    const todos: firebase.firestore.DocumentData[] = [];
                    snapshot.forEach((doc) => {
                      const todo = doc.data();
                      todo.detail_display = 'modal';
                      todo.edit_display = 'modal';
                      todos.push(todo);
                    });
                    todos.sort((a, b) => {
                      return a.todo_id - b.todo_id;
                    });
                    this.$router.push('/todoswindow');
                    this.app.$accessor.todos.receiveTodos(todos);
                  });
              } else {
                // メール認証がされていない場合
                ctx.commit(
                  'setLoginMessage',
                  'メール認証がされていないアカウントです。'
                );
              }
            })
            // そもそもログイン自体に失敗した場合
            .catch(() => {
              ctx.commit(
                'setLoginMessage',
                'アカウントが登録されていないか、入力内容に誤りがあります。'
              );
            });
        });
    },
    signUp(ctx, [name, mail, password]: string[]): void {
      // ログイン永続性はSESSION
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.SESSION)
        .then(() => {
          // 入力したメールアドレスとパスワードで会員登録
          firebase
            .auth()
            .createUserWithEmailAndPassword(mail, password)
            .then(() => {
              // 一度打ち間違えてログイン成功した場合を考えてRegisterMessageを削除
              ctx.commit('setRegisterMessage', '');
              const currentUser = firebase.auth().currentUser!;
              // 入力した名前をfirebaseのdisplayNameに登録
              currentUser!.updateProfile({
                displayName: name,
              });
              // サインアップしたユーザーをstateに格納
              ctx.commit('setUserInfo', currentUser);
              this.$router.push('/message');
              // firestoreにユーザー情報を登録
              firebase.firestore().collection('users').doc(mail).set({
                mail_address: mail,
                user_id: currentUser?.uid,
                user_name: name,
                admin: false,
                is_email_verified: false,
              });
              // メールアドレスの認証メールを送信する
              currentUser!.sendEmailVerification();
            })
            .catch(() => {
              ctx.commit(
                'setRegisterMessage',
                '既に会員登録済でないか、入力内容に誤りがあります。'
              );
            });
        });
    },
    signOut(ctx) {
      firebase
        .auth()
        .signOut()
        .then(() => {
          ctx.commit('clearUserInfo');
          this.$router.push('/');
        });
    },
  }
);
