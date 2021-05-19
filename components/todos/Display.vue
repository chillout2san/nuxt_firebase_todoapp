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
              @click="setEditModal(todo.todo_id)"
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
                <div class="message is-primary is-size-5">
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
              <form class="box">
                <h1 class="pb-2 has-text-weight-bold">タスク内容を編集</h1>
                <div class="field">
                  <!-- タスクの名前 -->
                  <label class="label has-text-weight-normal">名前</label>
                  <div class="control">
                    <input
                      v-model="todo_name"
                      class="input is-primary is-small"
                      placeholder="例）買い物"
                    />
                  </div>

                  <!-- タスクの詳細 -->
                  <label class="label has-text-weight-normal">詳細</label>
                  <div class="control">
                    <textarea
                      v-model="todo_info"
                      class="textarea is-primary is-small"
                      placeholder="例）予算は千円"
                      rows="3"
                    ></textarea>
                  </div>

                  <!-- タスクの状況 -->
                  <label class="label has-text-weight-normal">進捗状況</label>
                  <div class="control">
                    <div class="select is-primary is-small">
                      <select v-model="todo_status">
                        <option>作業中</option>
                        <option>依頼中</option>
                        <option>完了</option>
                      </select>
                    </div>
                  </div>

                  <!-- タスクの締め切り -->
                  <label class="label has-text-weight-normal">締め切り</label>
                  <div class="control pb-2">
                    <div class="select is-primary is-small">
                      <select v-model="deadlineYear">
                        <option
                          v-for="(year, key) in years"
                          :key="key"
                          :value="year"
                        >
                          {{ year }}
                        </option>
                      </select>
                    </div>
                    年

                    <div class="select is-primary is-small">
                      <select v-model="deadlineMonth">
                        <option
                          v-for="(month, key) in monthes"
                          :key="key"
                          :value="month"
                        >
                          {{ month }}
                        </option>
                      </select>
                    </div>
                    月

                    <div class="select is-primary is-small">
                      <select v-model="deadlineDay">
                        <option
                          v-for="(day, key) in days"
                          :key="key"
                          :value="day"
                        >
                          {{ day }}
                        </option>
                      </select>
                    </div>
                    日
                  </div>

                  <!-- アラートを有効にするかどうか -->
                  <label class="label has-text-weight-normal">アラート</label>
                  <div class="control">
                    <label class="radio">
                      <input
                        type="radio"
                        name="answer"
                        @click="change_alert_function('有効')"
                      />
                      有効
                    </label>
                    <label class="radio">
                      <input
                        type="radio"
                        name="answer"
                        @click="change_alert_function('無効')"
                      />
                      無効
                    </label>
                  </div>
                </div>

                <div class="field is-grouped">
                  <div class="control">
                    <button
                      class="button is-primary is-small has-text-weight-bold"
                      @click.prevent="
                        changeTodo(
                          todo.todo_id,
                          todo_name,
                          todo_info,
                          todo_status,
                          deadline,
                          todo_alert_function
                        )
                      "
                    >
                      変更
                    </button>
                    <button
                      class="button is-primary is-light is-small has-text-weight-bold"
                      @click.prevent="enableWorking(todo.todo_id)"
                    >
                      今日のタスクリストに表示
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <!-- モーダルウィンドウを閉じるバツボタン -->
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
      deadlineYear: '',
      deadlineMonth: '',
      deadlineDay: '',
      todo_name: '',
      todo_info: '',
      todo_status: '',
      todo_alert_function: '',
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
    deadline(): string {
      if (
        this.deadlineYear === '' ||
        this.deadlineMonth === '' ||
        this.deadlineDay === ''
      ) {
        return '';
      } else {
        return (
          this.deadlineYear + '/' + this.deadlineMonth + '/' + this.deadlineDay
        );
      }
    },
    years(): string[] {
      let presentYear = new Date().getFullYear();
      const years = [];
      for (let i = 0; i < 5; i++) {
        years.push(presentYear.toString());
        presentYear++;
      }
      return years;
    },
    monthes(): string[] {
      const monthes = [];
      for (let i = 1; i < 13; i++) {
        monthes.push(i.toString());
      }
      return monthes;
    },
    days(): string[] {
      const days = [];
      for (let i = 1; i < 32; i++) {
        days.push(i.toString());
      }
      return days;
    },
  },
  methods: {
    changeDetailModal(id: number) {
      this.$accessor.todos.displayDetailModal(id);
    },
    changeEditModal(id: number) {
      this.$accessor.todos.displayEditModal(id);
    },
    setEditModal(id: number) {
      const editTodo = this.selectedTodos.filter((todo) => {
        return todo.todo_id === id;
      });
      this.todo_name = editTodo[0].todo_name;
      this.todo_info = editTodo[0].info;
      this.todo_status = editTodo[0].status;
      if (editTodo[0].deadline !== '') {
        const deadline = new Date(editTodo[0].deadline);
        this.deadlineYear = deadline.getFullYear().toString();
        this.deadlineMonth = (deadline.getMonth() + 1).toString();
        this.deadlineDay = deadline.getDate().toString();
      } else {
        this.deadlineYear = '';
        this.deadlineMonth = '';
        this.deadlineDay = '';
      }
      this.todo_alert_function = editTodo[0].alert_function;
      this.$accessor.todos.displayEditModal(id);
    },
    changeStatus(status: string): void {
      this.status = status;
    },
    change_alert_function(boolean: string) {
      this.todo_alert_function = boolean;
    },
    deleteTodo(id: number) {
      this.$accessor.todos.deleteTodo(id);
    },
    enableWorking(id: number) {
      this.$accessor.todos.enableWorkingDisplay(id);
    },
    changeTodo(
      id: number,
      name: string,
      info: string,
      status: string,
      deadline: string,
      alertFunction: string
    ) {
      this.$accessor.todos.changeTodo([
        id,
        name,
        info,
        status,
        deadline,
        alertFunction,
      ]);
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
