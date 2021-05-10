<template>
  <div class="box">
    <h1 class="has-text-weight-bold">タスクリスト</h1>
    <table class="table">
      <thead>
        <tr>
          <th class="nowrap">ID</th>
          <th class="nowrap">名前</th>
          <th class="nowrap">進捗状況</th>
          <th class="nowrap">締め切り</th>
          <th class="nowrap">アラート</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in $accessor.todos.todos" :key="index">
          <td>{{ todo.todo_id }}</td>
          <td>{{ todo.todo_name }}</td>
          <td>{{ todo.status }}</td>
          <td>{{ todo.deadline }}</td>
          <td>{{ todo.alert_function }}</td>
          <td>
            <button
              class="button is-primary is-small has-text-weight-bold"
              @click="changeModal(todo.todo_id)"
            >
              詳細
            </button>
          </td>
          <td>
            <button
              class="button is-primary is-small is-light has-text-weight-bold"
            >
              編集
            </button>
          </td>
          <div :class="todo.display">
            <div
              class="modal-background"
              @click="changeModal(todo.todo_id)"
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
              @click="changeModal(todo.todo_id)"
            ></button>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      enable_alert_function: '有効',
      disable_alert_function: '無効',
    };
  },
  methods: {
    changeModal(id: number) {
      this.$accessor.todos.displayModal(id);
    },
  },
});
</script>

<style scoped>
.nowrap {
  white-space: nowrap;
}
</style>
