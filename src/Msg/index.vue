<template>
  <div class="chat-container">
    <ChatHeader v-if="showComponents" />
    <ChatMain v-if="showComponents" @fangyanhua="handleFangYanHua" />
    <Foot v-if="showComponents" />
    <!-- 内嵌 HTML 页面 -->
    <iframe v-if="showIframe" src="https://fwork.sdjz.wiki" frameborder="0" style="width: 100%; height: 100%;"></iframe>
  </div>
</template>

<script>
import ChatHeader from './header.vue';
import ChatMain from './main.vue';
import Foot from './foot.vue';

export default {
  name: 'ChatIndex',
  components: {
    ChatHeader,
    ChatMain,
    Foot
  },
  data() {
    return {
      showComponents: true, // 控制组件显示
      showIframe: false // 控制 iframe 显示
    };
  },
  methods: {
    handleFangYanHua() {
      this.showComponents = false;
      this.showIframe = true;
      this.$emit('musicguolai'); // 通知更顶级的 app.vue
    }
  }
};
</script>

<style scoped>
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
