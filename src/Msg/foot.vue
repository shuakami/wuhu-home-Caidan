<!--
Foot-聊天组件底部选择器
重构日期：2024-1-14 封装版本：16.1 注释版本1.0

Copyright (C) 2023-2024 sdjz.wiki. All rights reserved.
Unauthorized copying, distribution, or modification of this code is strictly prohibited.
This code is licensed under the MIT License.
See LICENSE file for details.
MIT License
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPY
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
