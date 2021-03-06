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
  // 引数に受け取ったtodo_idを持つタスクのモーダルの表示・非常時を切り替える
  displayDetailModal(state, modalId: number) {
    const appropriateTodo = state.todos.filter((obj) => {
      return obj.todo_id === modalId;
    });
    if (appropriateTodo[0].detail_display === 'modal is-active') {
      appropriateTodo[0].detail_display = 'modal';
    } else {
      appropriateTodo[0].detail_display = 'modal is-active';
    }
  },
  displayEditModal(state, modalId: number) {
    const appropriateTodo = state.todos.filter((obj) => {
      return obj.todo_id === modalId;
    });
    if (appropriateTodo[0].edit_display === 'modal is-active') {
      appropriateTodo[0].edit_display = 'modal';
    } else {
      appropriateTodo[0].edit_display = 'modal is-active';
    }
  },
});

export const actions = actionTree(
  { state, getters, mutations },
  {
    // usersのstoreで実行している。firestoreのタスクを受け取る。
    receiveTodos(ctx, todos: object[]) {
      ctx.commit('setTodosInfo', todos);
    },
    // 新しくタスクを追加する。working（WorkingDisplayに表示するかどうか）だけはデフォルトでfalseで登録。
    pushTodo(ctx, [name, information, todoStatus, deadLine, alertFunction]) {
      const mail = this.app.$accessor.users.mail_address;
      const todoId = ctx.getters.todosLength + 1;
      if (mail) {
        // firestoreにタスクを登録
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .add({
            todo_id: todoId,
            todo_name: name,
            info: information,
            status: todoStatus,
            deadline: deadLine,
            alert_function: alertFunction,
            working: false,
          })
          .then(() => {
            // 再びfirestoreからタスクを取得し、各タスクのmodalを非表示にする
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
                ctx.commit('setTodosInfo', todos);
              });
          });
      }
    },
    // 引数で受け取ったtodo_idを持つタスクをfirestoreから削除する
    deleteTodo(ctx, deleteId: number) {
      const mail = this.app.$accessor.users.mail_address;
      if (mail) {
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .where('todo_id', '==', deleteId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref.delete().then(() => {
                firebase
                  .firestore()
                  .collection('users')
                  .doc(mail)
                  .collection('todos')
                  .get()
                  .then((snapshot) => {
                    const todos: firebase.firestore.DocumentData[] = [];
                    snapshot.forEach((doc) => {
                      if (doc.exists) {
                        const todo = doc.data();
                        todo.detail_display = 'modal';
                        todo.edit_display = 'modal';
                        todos.push(todo);
                        let index;
                        if (todo.todo_id > deleteId) {
                          index = todo.todo_id - 1;
                        } else {
                          index = todo.todo_id;
                        }
                        doc.ref
                          .update({
                            todo_id: index,
                          })
                          .catch((error) => console.log(error));
                      }
                    });
                    todos.forEach((todo) => {
                      if (todo.todo_id > deleteId) {
                        todo.todo_id -= 1;
                      }
                    });
                    todos.sort((a, b) => {
                      return a.todo_id - b.todo_id;
                    });
                    ctx.commit('setTodosInfo', todos);
                  });
              });
            });
          });
      }
    },
    // 引数で受け取ったtodo_idを持つタスクを本日のタスクリストに表示
    enableWorkingDisplay(ctx, workingId: number) {
      const mail = this.app.$accessor.users.mail_address;
      if (mail) {
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .where('todo_id', '==', workingId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref
                .update({
                  working: true,
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
                        if (doc.exists) {
                          const todo = doc.data();
                          todo.detail_display = 'modal';
                          todo.edit_display = 'modal';
                          todos.push(todo);
                        }
                        todos.sort((a, b) => {
                          return a.todo_id - b.todo_id;
                        });
                      });
                      ctx.commit('setTodosInfo', todos);
                    });
                });
            });
          });
      }
    },
    // 引数で受け取ったtodo_idを持つタスクを本日のタスクリストの表示から外す
    disableWorkingDisplay(ctx, workingId: number) {
      const mail = this.app.$accessor.users.mail_address;
      if (mail) {
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .where('todo_id', '==', workingId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref
                .update({
                  working: false,
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
                        if (doc.exists) {
                          const todo = doc.data();
                          todo.detail_display = 'modal';
                          todo.edit_display = 'modal';
                          todos.push(todo);
                        }
                        todos.sort((a, b) => {
                          return a.todo_id - b.todo_id;
                        });
                      });
                      ctx.commit('setTodosInfo', todos);
                    });
                });
            });
          });
      }
    },
    changeTodo(
      ctx,
      [editId, name, todoInfo, todoStatus, deadLine, alertFunction]
    ) {
      const mail = this.app.$accessor.users.mail_address;
      if (mail) {
        firebase
          .firestore()
          .collection('users')
          .doc(mail)
          .collection('todos')
          .where('todo_id', '==', editId)
          .get()
          .then((snapshot) => {
            snapshot.forEach((doc) => {
              doc.ref
                .update({
                  todo_name: name,
                  info: todoInfo,
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
                        if (doc.exists) {
                          const todo = doc.data();
                          todo.detail_display = 'modal';
                          todo.edit_display = 'modal';
                          todos.push(todo);
                        }
                        todos.sort((a, b) => {
                          return a.todo_id - b.todo_id;
                        });
                      });
                      ctx.commit('setTodosInfo', todos);
                    });
                });
            });
          });
      }
    },
  }
);
