<template>
  <form class="box">
    <h1 class="pb-2 has-text-weight-bold">新しいタスクを追加</h1>
    <div class="field">
      <label class="label has-text-weight-normal">名前</label>
      <div class="control">
        <input
          v-model="name"
          class="input is-success is-small"
          placeholder="例）買い物"
        />
      </div>

      <label class="label has-text-weight-normal">詳細</label>
      <div class="control">
        <textarea
          v-model="info"
          class="textarea is-success is-small"
          placeholder="例）予算は千円"
          rows="3"
        ></textarea>
      </div>

      <label class="label has-text-weight-normal">進捗状況</label>
      <div class="control">
        <div class="select is-success is-small">
          <select v-model="status">
            <option>作業中</option>
            <option>依頼中</option>
          </select>
        </div>
      </div>

      <label class="label has-text-weight-normal">締め切り</label>
      <div class="control pb-2">
        <div class="select is-success is-small">
          <select v-model="deadlineYear">
            <option v-for="(year, key) in years" :key="key" :value="year">
              {{ year }}
            </option>
          </select>
        </div>
        年

        <div class="select is-success is-small">
          <select v-model="deadlineMonth">
            <option v-for="(month, key) in monthes" :key="key" :value="month">
              {{ month }}
            </option>
          </select>
        </div>
        月

        <div class="select is-success is-small">
          <select v-model="deadlineDay">
            <option v-for="(day, key) in days" :key="key" :value="day">
              {{ day }}
            </option>
          </select>
        </div>
        日
      </div>

      <label class="label has-text-weight-normal">アラート</label>
      <div class="control">
        <label class="radio">
          <input
            type="radio"
            name="answer"
            checked
            @click="change_alert_function(true)"
          />
          有効
        </label>
        <label class="radio">
          <input
            type="radio"
            name="answer"
            @click="change_alert_function(false)"
          />
          無効
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-primary is-small"
          @click.prevent="
            pushTask(name, info, status, deadline, alert_function)
          "
        >
          登録
        </button>
      </div>
      <div class="control">
        <button
          class="button is-light is-primary is-small"
          @click.prevent="clearForm"
        >
          入力内容をクリア
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      name: '' as string,
      info: '' as string,
      status: '' as string,
      deadlineYear: '' as string,
      deadlineMonth: '' as string,
      deadlineDay: '' as string,
      alert_function: true as boolean,
    };
  },
  computed: {
    deadline(): string {
      const deadline =
        this.deadlineYear + '/' + this.deadlineMonth + '/' + this.deadlineDay;
      return deadline;
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
    change_alert_function(boolean: boolean) {
      this.alert_function = boolean;
    },
    clearForm() {
      this.name = '';
      this.info = '';
      this.deadline = '';
      this.alert_function = true;
    },
    pushTask(
      name: string,
      info: string,
      status: string,
      deadline: string,
      alertFunction: boolean
    ) {
      this.$accessor.todos.pushTask([
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
