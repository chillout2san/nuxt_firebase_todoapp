<template>
  <form class="box">
    <h1 class="is-size-5 has-text-weight-bold">
      メールアドレスとパスワードでログイン
    </h1>
    <div class="field">
      <label class="label">メールアドレス</label>
      <div class="control">
        <input
          v-model="mail"
          class="input is-primary"
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
          class="input is-primary"
          type="password"
          placeholder="パスワードを入力してください"
        />
      </div>
    </div>

    <p class="pb-2 has-text-danger is-size-6">
      {{ $accessor.users.login_message }}
    </p>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-primary"
          @click.prevent="signIn(mail, password)"
        >
          ログイン
        </button>
      </div>
      <div class="control">
        <button class="button is-primary is-light" @click.prevent="clearForm">
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
      mail: '' as string,
      password: '' as string,
    };
  },
  methods: {
    signIn(mail: string, password: string) {
      this.$accessor.users.signIn([mail, password]);
    },
    clearForm() {
      this.mail = '';
      this.password = '';
    },
  },
});
</script>
