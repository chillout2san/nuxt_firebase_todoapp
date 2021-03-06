import firebase from '../plugins/firebase';

export default function ({ route, redirect }: any) {
  if (route.path === '/todoswindow') {
    const user = firebase.auth().currentUser?.emailVerified;
    if (user === undefined) {
      redirect('/');
    } else if (user === false) {
      redirect('/');
    }
  }
}
