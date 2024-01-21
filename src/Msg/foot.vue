<!--
Foot-聊天组件底部选择器
重构日期：2024-1-14 封装版本：16.1 注释版本1.0

Copyright (C) 2023-2024 ByteFreezeLab×Sdjz.Wiki. All rights reserved.
严禁任何形式的未经许可的商业使用和倒卖行为。
This project is open-sourced on Github, accessible at: https://github.com/shuakami/wuhu-home-Caidan, and adopts the CC BY-NC-SA 4.0 DEED open-source license agreement. Unauthorized commercial exploitation and reselling are strictly prohibited.
Below are highlighted aspects of the CC BY-NC-SA 4.0 DEED license agreement (for complete terms, please refer to: https://creativecommons.org/licenses/by-nc-sa/4.0/):
Under the Attribution-NonCommercial-ShareAlike 4.0 International Public License, authors grant you the right to reproduce, distribute, and adapt their work under certain conditions. Any individual or entity using this project must retain the original author's attribution and may not use the project for commercial purposes. Distribution, adaptation, or creation of new works based on this project shall be released under the same license as this project.
-->
<template>
  <transition name="chat-foot-fade">
    <footer class="chat-footer" v-if="userChoice">
    <div class="button-container">
      <button class="custom-button" v-if="userChoice" @click="sendUserSelectedChoice" @mousemove="handleMouseMove" @mouseleave="handleMouseLeave">
        <div class="button-icons">
          <i class="fas fa-hashtag icon"></i>
        </div>

        <span class="selected-text">{{ userChoice }}</span>
        <div ref="shineOverlay" class="shine-overlay"></div>
      </button>
    </div>
  </footer>
  </transition>
</template>

<script>
export default {
  name: 'ChatFoot',
  props: {
    userChoice: {
      type: String,
      default: null,
    },
  },
  methods: {
    sendUserSelectedChoice() {
      this.$emit('user-selects-choice', this.userChoice);
    },
    handleMouseMove(event) {
      const shine = this.$refs.shineOverlay;
      const rect = event.target.getBoundingClientRect();
      // 计算渐变的大小为按钮对角线的长度，确保渐变覆盖整个按钮
      const gradientSize = Math.sqrt(rect.width * rect.width + rect.height * rect.height);
      // 计算鼠标相对于按钮的位置
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      // 设置径向渐变的中心点为鼠标位置，大小足够覆盖整个按钮
      shine.style.backgroundImage = `radial-gradient(circle ${gradientSize}px at ${x}px ${y}px, rgba(255, 255, 255, 0.5), transparent)`;
      shine.style.opacity = 1;
    },
    handleMouseLeave() {
      this.$refs.shineOverlay.style.opacity = 0;
    },
  },
};
</script>

<style scoped>

.chat-foot-fade-enter-active,
.chat-foot-fade-leave-active {
  transition: opacity 0.3s ease;
}

.chat-foot-fade-enter,
.chat-foot-fade-leave-to {
  opacity: 0;
}

.chat-footer {
  padding: 10px;
  background-color: #2C2F33;
  display: flex;
  justify-content: center;
}
.selected-text {
  margin: 0 10px;
  font-size: 16px;
  color: #FFFFFF;
  flex-grow: 1;
  text-align: center;
}
.button-container {
  width: 100%;
}

.custom-button {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background: #23272A;
  color: #FFFFFF;
  font-size: 16px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}

.button-icons {
  display: flex;
  gap: 8px;
}

.icon {
  margin: 0 5px;
  font-size: 20px;
}

.shine-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(circle at center, rgba(255, 255, 255, 0.5), transparent);
  transition: opacity 0.3s, background-position 0.2s;
  pointer-events: none;
  opacity: 0;
}

</style>
