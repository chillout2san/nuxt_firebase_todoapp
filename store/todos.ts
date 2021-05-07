import { getterTree, mutationTree, actionTree } from 'typed-vuex';
import firebase from '../plugins/firebase';

export const state = () => ({
  todos: [] as firebase.firestore.DocumentData[],
});

export type RootState = ReturnType<typeof state>;

export const getters = getterTree(state, {
  todos: (state) => state.todos,
  todosLength: (state) => state.todos.length,
});

export const mutations = mutationTree(state, {
  setTodosInfo(state, todos: firebase.firestore.DocumentData[]) {
    state.todos = todos;
  },
  displayModal(state, modalId: number) {
    const appropriateTodo = state.todos.filter((obj) => {
      return obj.todo_id === modalId;
    });
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
    pushTask(ctx, [name, information, todoStatus, deadLine, alertFunction]) {
      const mail = this.app.$accessor.users.mail_address;
      const todoId = ctx.getters.todosLength + 1;
      if (mail) {
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .doc(todoId.toString())
          .set({
            todo_id: todoId,
            todo_name: name,
            info: information,
            status: todoStatus,
            deadline: deadLine,
            alert_function: alertFunction,
          })
          .then(() => {
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
                  todo.display = 'modal';
                  todos.push(todo);
                });
                ctx.commit('setTodosInfo', todos);
              });
          });
      }
    },
  }
);
