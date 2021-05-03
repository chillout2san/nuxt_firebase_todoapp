import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  todos: [] as firebase.firestore.DocumentData[],
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  todos: (state) => state.todos,
});

export const mutations = mutationTree(state, {
  setTodosInfo(state, todos: firebase.firestore.DocumentData[]) {
    state.todos = todos;
  },
  displayModal(state, modalId: number) {
    const appropriateTodo = state.todos.filter((obj) => {
      return obj.id === modalId;
    });
    console.log(appropriateTodo);
    if (appropriateTodo[0].display === 'modal is-active') {
      appropriateTodo[0].display = 'modal';
    } else {
      appropriateTodo[0].display = 'modal is-active';
    }
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    receiveTodos(ctx, todos: object[]) {
      ctx.commit('setTodosInfo', todos);
    },
  }
);
