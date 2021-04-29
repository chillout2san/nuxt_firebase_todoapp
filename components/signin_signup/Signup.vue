<template>
  <div>
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
          type="email"
          placeholder="パスワードを入力してください"
        />
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button class="button is-link" @click="signUp">送信</button>
      </div>
      <div class="control">
        <button class="button is-link is-light">キャンセル</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      name: '' as string,
      mail: '' as string,
      password: '' as string,
    }
  },
  methods: {
    signUp() {
      this.$accessor.users.signUp([this.name, this.mail, this.password])
    },
  },
})
</script>
