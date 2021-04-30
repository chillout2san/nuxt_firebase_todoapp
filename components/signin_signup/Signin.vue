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
          type="email"
          placeholder="パスワードを入力してください"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <!-- nuxt-linkのパスをログイン後の箇所に変更すること -->
        <nuxt-link to="/relogin">
          <button class="button is-primary" @click="signIn">ログイン</button>
        </nuxt-link>
      </div>
      <div class="control">
        <button class="button is-light is-primary" @click="clearForm">
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
    signIn() {
      // ログインする処理を書く
      //   this.$accessor.users.signUp([this.name, this.mail, this.password]);
    },
    clearForm() {
      this.mail = '';
      this.password = '';
    },
  },
});
</script>
