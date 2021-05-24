import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  excuses: [] as object[],
  excusesDisplay: false,
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  excuses: (state) => state.excuses,
  excusesDisplay: (state) => state.excusesDisplay,
  excusesLength: (state) => state.excuses.length,
});

export const mutations = mutationTree(state, {
  setExcusesInfo(state, excuses: object[]) {
    state.excuses = excuses;
  },
  toggleExcuseDisplay(state) {
    if (state.excusesDisplay === true) {
      state.excusesDisplay = false;
    } else {
      state.excusesDisplay = true;
    }
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    setExcuses(ctx) {
      const excusesData: firebase.firestore.DocumentData[] = [];
      firebase
        .firestore()
        .collection('excuses')
        .get()
        .then(async (snapshot) => {
          await snapshot.forEach((doc) => {
            const excuse = doc.data();
            excusesData.push(excuse);
          });
          excusesData.sort((a, b) => {
            return a.excuse_id - b.excuse_id;
          });
          ctx.commit('setExcusesInfo', excusesData);
        });
    },
    pushExcuse(ctx, userExcuse: string) {
      firebase
        .firestore()
        .collection('excuses')
        .add({
          excuse: userExcuse,
          excuse_id: ctx.getters.excusesLength + 1,
        })
        .then(() => {
          ctx.dispatch('setExcuses');
        });
    },
    deleteExcuse(ctx, id: number) {
      firebase
        .firestore()
        .collection('excuses')
        .where('excuse_id', '==', id)
        .get()
        .then(async (snapshot) => {
          await snapshot.forEach((doc) => {
            doc.ref
              .delete()
              .then(() => {
                firebase
                  .firestore()
                  .collection('excuses')
                  .get()
                  .then(async (snapshot) => {
                    const excuses: firebase.firestore.DocumentData[] = [];
                    await snapshot.forEach((doc) => {
                      if (doc.exists) {
                        const excuse = doc.data();
                        excuses.push(excuse);
                        let index = 0;
                        if (excuse.excuse_id > id) {
                          index = excuse.excuse_id - 1;
                        } else {
                          index = excuse.excuse_id;
                        }
                        doc.ref
                          .update({
                            excuse_id: index,
                          })
                          .catch((error) => console.log(error));
                      }
                    });
                    excuses.forEach((excuse) => {
                      if (excuse.excuse_id > id) {
                        excuse.excuse_id -= 1;
                      }
                    });
                    excuses.sort((a, b) => {
                      return a.excuse_id - b.excuse_id;
                    });
                    ctx.commit('setExcusesInfo', excuses);
                  });
              })
              .catch((error) => console.log(error));
          });
        })
        .catch((error) => {
          console.log(error);
        });
    },
  }
);
