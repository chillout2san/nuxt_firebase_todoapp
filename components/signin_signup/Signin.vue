<template>
  <form class="box">
    <p class="is-size-5 has-text-weight-bold">
      メールアドレスとパスワードでログイン
    </p>
    <div class="field">
      <label class="label">メールアドレス</label>
      <div class="control">
        <input
          v-model="mail"
          class="input is-success"
          type="email"
          placeholder="メールアドレスを入力してください"
        />
      </div>
    </div>

    <div class="field">
      <label class="label">パスワード</label>
      <div class="control">
        <input
          v-model="password"
          class="input is-success"
          type="password"
          placeholder="パスワードを入力してください"
        />
      </div>
    </div>

    <p class="pb-2 has-text-danger is-size-6">
      {{ $accessor.users.error_message }}
    </p>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-primary">ログイン</button>
      </div>
      <div class="control">
        <button class="button is-light is-primary" @click.prevent="clearForm">
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
      mail: '' as string,
      password: '' as string,
    };
  },
  methods: {
    clearForm() {
      this.name = '';
      this.mail = '';
      this.password = '';
    },
  },
});
</script>
