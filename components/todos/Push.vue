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

      <label class="label has-text-weight-normal">締め切り</label>
      <div class="control">
        <input v-model="deadline" class="input is-success is-small" />
      </div>

      <label class="label has-text-weight-normal">締め切りアラート</label>
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
          @click.prevent="pushTask(name, info, deadline, alert_function)"
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
      deadline: 0 as number,
      alert_function: true as boolean,
    };
  },
  methods: {
    change_alert_function(boolean: boolean) {
      this.alert_function = boolean;
    },
    clearForm() {
      this.name = '';
      this.info = '';
      this.deadline = 0;
      this.alert_function = true;
    },
    pushTask(
      name: string,
      info: string,
      deadline: number,
      alertFunction: boolean
    ) {
      this.$accessor.todos.pushTask([name, info, deadline, alertFunction]);
    },
  },
});
</script>
