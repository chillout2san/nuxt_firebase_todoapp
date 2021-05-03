<template>
  <div class="box">
    <h1>ToDoリスト</h1>
    <table class="table">
      <thead>
        <tr>
          <th>ID</th>
          <th>名前</th>
          <th>締め切り</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(todo, index) in $accessor.todos.todos" :key="index">
          <td>{{ todo.id }}</td>
          <td>{{ todo.name }}</td>

          <td>{{ todo.deadline }}</td>

          <td>
            <button
              class="button is-primary is-small"
              @click="changeModal(todo.id)"
            >
              詳細
            </button>
          </td>
          <td>
            <div :class="todo.display">
              <div class="modal-background" @click="changeModal(todo.id)"></div>
              <div class="modal-content">
                <div class="box">
                  {{ todo.status }}
                  {{ todo.info }}
                  {{ todo.alert_function }}
                </div>
              </div>
              <button
                class="modal-close is-large"
                @click="changeModal(todo.id)"
              ></button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {};
  },
  methods: {
    changeModal(id: number) {
      this.$accessor.todos.displayModal(id);
    },
  },
});
</script>
