<!--
FlieMsg-文件消息样式
重构日期：2024-1-14 封装版本：3.1 注释版本1.0

Copyright (C) 2023-2024 ByteFreezeLab×Sdjz.Wiki. All rights reserved.
严禁任何形式的未经许可的商业使用和倒卖行为。
This project is open-sourced on Github, accessible at: https://github.com/shuakami/wuhu-home-Caidan, and adopts the CC BY-NC-SA 4.0 DEED open-source license agreement. Unauthorized commercial exploitation and reselling are strictly prohibited.
Below are highlighted aspects of the CC BY-NC-SA 4.0 DEED license agreement (for complete terms, please refer to: https://creativecommons.org/licenses/by-nc-sa/4.0/):
Under the Attribution-NonCommercial-ShareAlike 4.0 International Public License, authors grant you the right to reproduce, distribute, and adapt their work under certain conditions. Any individual or entity using this project must retain the original author's attribution and may not use the project for commercial purposes. Distribution, adaptation, or creation of new works based on this project shall be released under the same license as this project.
-->
<template>
  <div class="file-message">
    <div class="file-info" @click="handleClick">
      <p>{{ fileName }}</p>
    </div>
    <button class="open-file-btn" @click="openFile">{{ buttonLabel }}</button>
  </div>
</template>

<script>
export default {
  props: {
    fileName: String,
    fileContents: String
  },
  data() {
    return {
      buttonLabel: '打开文件'
    };
  },
  methods: {
    handleClick() {
      // 触发一个事件，但不打开文件
      this.$emit('file-click', this.fileName, this.fileContents);
    },
    openFile() {
      // 阻止与 file-message 的点击事件冒泡
      event.stopPropagation();
      // 触发一个事件以打开文件
      this.$emit('file-dblclick', this.fileName, this.fileContents);
    }
  }
}
</script>

<style>
.file-message {
  border: 1px solid #ffa39e; /* 边框颜色 */
  background-color: #fff1f0; /* 背景颜色 */
  border-radius: 5px; /* 圆角 */
  padding: 12px 16px; /* 内部填充 */
  margin-bottom: 20px; /* 底部外边距 */
  display: flex; /* 使用 flex 布局 */
  justify-content: space-between; /* 分散对齐 */
  align-items: center; /* 垂直居中 */
  cursor: default; /* 默认鼠标指针 */
}

.file-info p {
  margin: 0; /* 移除默认边距 */
  color: #d4380d; /* 文字颜色 */
  font-size: 14px; /* 字体大小 */
}

/* 打开文件的按钮样式 */
.open-file-btn {
  color: #fff; /* 字体颜色 */
  background-color: #ff4d4f; /* 背景颜色 */
  border: none; /* 无边框 */
  border-radius: 5px; /* 圆角 */
  padding: 6px 15px; /* 内部填充 */
  font-size: 14px; /* 字体大小 */
  cursor: pointer; /* 鼠标手型指示可点击 */
  outline: none; /* 移除焦点轮廓 */
  box-shadow: none; /* 移除阴影 */
  transition: background-color 0.3s; /* 背景色变化过渡 */
}

.open-file-btn:hover {
  background-color: #d4380d; /* 按钮悬停颜色变化 */
}

/* 添加媒体查询以处理小屏幕 */
@media (max-width: 600px) {
  .file-message {
    flex-direction: column; /* 在小屏幕上堆叠 */
    align-items: flex-start; /* 左对齐 */
  }

  .open-file-btn {
    margin-top: 10px; /* 在小屏幕上添加顶部边距 */
    align-self: center; /* 按钮居中 */
  }
}
</style>
