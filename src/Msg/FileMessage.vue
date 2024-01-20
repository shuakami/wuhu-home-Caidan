<!--
FlieMsg-文件消息样式
重构日期：2024-1-14 封装版本：3.1 注释版本1.0

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
/* 文件消息样式，模仿警告框 */
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
