import { getterTree, mutationTree, actionTree } from 'typed-vuex';
// import firebase from '../plugins/firebase';

export const state = () => ({
  todos: [] as object[],
  numberOfTodos: 0 as number,
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {});

export const mutations = mutationTree(state, {
  setTodosInfo(state, todos: object[]) {
    state.todos = todos;
    state.numberOfTodos = todos.length;
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
