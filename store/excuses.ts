import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  excuses: [
    {
      excuse_id: 0,
      excuse: '上のボタンを押すとみんなの言い訳が見れるよ',
    },
  ] as object[],
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  excuses: (state) => state.excuses,
});

export const mutations = mutationTree(state, {
  setExcusesInfo(state, excuses: object[]) {
    state.excuses = excuses;
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    setExcuses(ctx) {
      const excusesData: object[] = [];
      firebase
        .firestore()
        .collection('excuses')
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const excuse = doc.data();
            excusesData.push(excuse);
          });
          ctx.commit('setExcusesInfo', excusesData);
        });
    },
  }
);
