<template>
  <div>
    <!-- タイトル部分 -->
    <header class="box">
      <div class="is-size-1 has-text-weight-bold">
        <strong>T</strong>a-Su-Ku
      </div>
      <div class="pb-2">
        <button
          class="button is-primary is-small has-text-weight-bold"
          @click="displayAbout"
        >
          つかいかた
        </button>
        <button
          v-if="user"
          class="button is-primary is-small has-text-weight-bold"
          @click="signOut"
        >
          ログアウト
        </button>
      </div>
      <p v-if="$accessor.users.is_email_verified">
        <span class="has-text-weight-bold">{{ $accessor.users.user_name }}</span
        >さん、今日もがんばりましょう！
      </p>
    </header>
    <!-- aboutボタン押下時のモーダルウィンドウ -->
    <div :class="display">
      <div class="modal-background" @click="displayAbout"></div>
      <div class="modal-content">
        <div class="box">
          <div class="message is-primary">
            <div class="message-header is-size-5">
              <p>Ta-Su-Kuについて</p>
            </div>
            <div class="message-body">
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  Ta-Su-Kuって？
                </h1>
                <p class="has-text-left">
                  2sanが運営している直感的に操作ができるタスク管理アプリです。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  「新しいタスクを追加」ウィンドウについて
                </h1>
                <p class="has-text-left pb-2">
                  ①タスクの名前や詳細等を入力して、登録ボタンを押せばタスクを追加できます。
                </p>
                <p class="has-text-left">
                  ②アラートを有効にすると、期限切れのタスクが赤く表示されるようになります。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  「タスクリスト」ウィンドウについて
                </h1>
                <p class="has-text-left pb-2">
                  ①各進捗状況に応じて、追加したタスクを閲覧することができます。
                </p>
                <p class="has-text-left pb-2">
                  ②詳細ボタンからタスクの詳細を閲覧することができます。
                </p>
                <p class="has-text-left pb-2">
                  ③編集ボタンからタスクの内容を編集することができます。「今日のタスクリストに表示」ボタンを押すと、「今日のタスクリスト」ウィンドウに表示させることができます。
                </p>
                <p class="has-text-left">
                  ④削除ボタンからタスクを削除することができます。元に戻せないので注意してください。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  「今日のタスクリスト」ウィンドウについて
                </h1>
                <p class="has-text-left pb-2">
                  ①タスクの中でも今日やりたいタスクに絞って閲覧することができます。名前は「今日の」と付けてありますが、さまざまな利用方法が考えられます。
                </p>
                <p class="has-text-left pb-2">
                  ②詳細ボタンからタスクの詳細を閲覧することができます。こちらでは編集はできません。
                </p>
                <p class="has-text-left">
                  ③非表示ボタンから「今日のタスクリスト」ウィンドウから削除します。「タスクリスト」ウィンドウからは削除されていないことに注意してください。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  「新しい言い訳を追加」ウィンドウについて
                </h1>
                <p class="has-text-left pb-2">
                  ①言い訳をするボタンから言い訳を追加することができます。ユーザーは言い訳を削除することはできません。
                </p>
                <p class="has-text-left">
                  ②言い訳を心にしまうボタンから入力した言い訳をクリアすることができます。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  「言い訳リスト」ウィンドウについて
                </h1>
                <p class="has-text-left">
                  みんなの言い訳を見るボタンから言い訳を見ることができます。各言い訳はユーザーとは結びついていないので、全ての言い訳が閲覧できます。
                </p>
              </div>
              <div class="box">
                <h1 class="has-text-left has-text-weight-bold pb-3 under-line">
                  ご意見はこちらまで
                </h1>
                <div class="has-text-left">
                  <a href="https://twitter.com/CoO2san">
                    <figure class="image is-32x32 is-inline-block">
                      <img
                        src="../../static/Twitter social icons - circle - blue.png"
                      />
                    </figure>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <button class="modal-close is-large" @click="displayAbout"></button>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      display: 'modal',
    };
  },
  computed: {
    user() {
      if (this.$accessor.users.mail_address) {
        return true;
      } else {
        return false;
      }
    },
  },
  methods: {
    displayAbout() {
      if (this.display === 'modal') {
        this.display = 'modal is-active';
      } else {
        this.display = 'modal';
      }
    },
    signOut() {
      this.$accessor.users.signOut();
    },
  },
});
</script>

<style scoped>
.box {
  text-align: center;
}

strong {
  color: rgb(95, 206, 179);
}

.under-line {
  text-decoration: underline;
}
</style>
