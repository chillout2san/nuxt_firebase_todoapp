import { getters } from '../store/users';

export default function ({ route, redirect }) {
  if (route.path === '/message') {
    const string = getters.is_email_verified;
    if (!string) {
      redirect('/');
    }
  }
  if (route.path === '/taskwindow') {
    const boolean = getters.is_email_verified;
    if (boolean !== true) {
      console.log(boolean);
      console.log('if');
      redirect('/');
    } else {
      console.log('else');
    }
  }
}
