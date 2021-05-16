<template>
  <div class="box">
    <h1 class="has-text-weight-bold">タスクリスト</h1>
    <div class="control">
      <label class="radio" @click="changeStatus('全て')">
        <input type="radio" name="answer" checked />
        全て
      </label>
      <label class="radio" @click="changeStatus('作業中')">
        <input type="radio" name="answer" />
        作業中
      </label>
      <label class="radio" @click="changeStatus('依頼中')">
        <input type="radio" name="answer" />
        依頼中
      </label>
      <label class="radio" @click="changeStatus('完了')">
        <input type="radio" name="answer" />
        完了
      </label>
    </div>
    <table class="table is-hoverable">
      <thead>
        <tr>
          <th class="nowrap">ID</th>
          <th class="nowrap">名前</th>
          <th class="nowrap">進捗状況</th>
          <th class="nowrap">締め切り</th>
          <th class="nowrap">アラート</th>
          <th></th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in selectedTodos" :key="index">
          <td>{{ todo.todo_id }}</td>
          <td>{{ todo.todo_name }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.deadline }}</td>
          <td>{{ todo.alert_function }}</td>
          <!-- 詳細ボタンを表示する -->
          <td>
            <button
              class="button is-primary is-small has-text-weight-bold"
              @click="changeDetailModal(todo.todo_id)"
            >
              詳細
            </button>
          </td>
          <!-- 編集ボタンを表示する -->
          <td>
            <button
              class="button is-primary is-small is-light has-text-weight-bold"
              @click="changeEditModal(todo.todo_id)"
            >
              編集
            </button>
          </td>
          <!-- 削除ボタンを表示する -->
          <td>
            <button
              class="button is-small is-light has-text-weight-bold"
              @click="deleteTodo(todo.todo_id)"
            >
              削除
            </button>
          </td>
          <!-- 詳細ボタンを押下した時のモーダルウィンドウ -->
          <div :class="todo.detail_display">
            <div
              class="modal-background"
              @click="changeDetailModal(todo.todo_id)"
            ></div>
            <div class="modal-content">
              <div class="box">
                <div class="message is-primary">
                  <div class="message-header">
                    <p>{{ todo.todo_name }}</p>
                  </div>
                  <div class="message-body">
                    {{ todo.info }}
                  </div>
                </div>
              </div>
            </div>
            <button
              class="modal-close is-large"
              @click="changeDetailModal(todo.todo_id)"
            ></button>
          </div>
          <!-- 編集ボタンを押下した際のモーダルウィンドウ -->
          <div :class="todo.edit_display">
            <div
              class="modal-background"
              @click="changeEditModal(todo.todo_id)"
            ></div>
            <div class="modal-content">
              <div class="box">
                <div class="message is-primary">
                  <div class="message-header">
                    <p>{{ todo.todo_name }}</p>
                  </div>
                  <div class="message-body">
                    {{ todo.info }}
                    <button
                      class="button is-primary is-small has-text-weight-bold"
                      @click="enableWorking(todo.todo_id)"
                    >
                      今日のタスクリストに表示
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <button
              class="modal-close is-large"
              @click="changeEditModal(todo.todo_id)"
            ></button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import firebase from 'plugins/firebase';

export default Vue.extend({
  data() {
    return {
      status: '全て',
    };
  },
  computed: {
    selectedTodos(): firebase.firestore.DocumentData[] {
      const selectedStatus = this.status;
      if (selectedStatus === '全て') {
        return this.$accessor.todos.todos;
      } else {
        return this.$accessor.todos.todos.filter((todo) => {
          return todo.status === selectedStatus;
        });
      }
    },
  },
  methods: {
    changeDetailModal(id: number) {
      this.$accessor.todos.displayDetailModal(id);
    },
    changeEditModal(id: number) {
      this.$accessor.todos.displayEditModal(id);
    },
    changeStatus(status: string): void {
      this.status = status;
    },
    deleteTodo(id: number) {
      this.$accessor.todos.deleteTodo(id);
    },
    enableWorking(id: number) {
      this.$accessor.todos.enableWorkingDisplay(id);
    },
  },
});
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}

.box {
  overflow: scroll;
}
</style>
