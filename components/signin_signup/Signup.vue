<template>
  <form class="box">
    <p class="is-size-5 has-text-weight-bold">
      メールアドレスとパスワードで新規登録
    </p>
    <div class="field">
      <label class="label">ユーザー名</label>
      <div class="control">
        <input
          v-model="name"
          class="input is-success"
          type="text"
          placeholder="ユーザー名を入力してください"
        />
      </div>
    </div>

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

    <p class="pb-2 has-text-danger is-size-6">{{ $accessor.users.register_message }}</p>

    <div class="field is-grouped">
      <div class="control">
        <button
          class="button is-primary"
          @click.prevent="signUp(name, mail, password)"
        >
          会員登録
        </button>
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
    signUp(name: string, mail: string, password: string) {
      this.$accessor.users.signUp([name, mail, password]);
    },
    clearForm() {
      this.name = '';
      this.mail = '';
      this.password = '';
    },
  },
});
</script>
