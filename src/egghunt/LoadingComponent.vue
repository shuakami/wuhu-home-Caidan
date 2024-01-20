<!--
Loading加载样式-暂时废除
重构日期：2024-1-14 封装版本：2.1 注释版本1.1

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
  <!-- 定义一个全屏加载组件 -->
  <div class="loading-container" :class="{ 'is-active': showLoading }">
    <!-- 图标和文本放在同一个容器中，以便一起居中 -->
    <div class="loading-content">
      <!-- 加载图标容器 -->
      <div class="loading-icon-container">
        <div class="loading_icon_styles la-dark">
          <div></div>
        </div>
      </div>

      <!-- 加载提示文本 -->
      <div class="loading-text-container">
        <div class="loading-text">Loading...</div>
      </div>
    </div>

    <!-- 页面底部中间的帮助文本 -->
    <div v-if="showHelpText" class="help-text" :class="{'fade-effect': true}">{{ helpText }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showLoading: true,
      helpTexts: [
        '项目最难写的不是代码，而是样式...',
        '冷知识：这张图我有著作权',
        '开发弄了15天，其实不算久',
        '其实我的api没有任何防护措施，来个人都能给我打趴',
        'Vue真好吃...'
      ],
      currentHelpTextIndex: 0,
      showHelpText: true,
    };
  },
  computed: {
    helpText() {
      return this.helpTexts[this.currentHelpTextIndex];
    }
  },
  mounted() {
    setInterval(() => {
      this.showHelpText = false;
      setTimeout(() => {
        this.currentHelpTextIndex = (this.currentHelpTextIndex + 1) % this.helpTexts.length;
        this.showHelpText = true;
      }, 800); // 淡出动画1秒后切换文本
    }, 5000); // 总周期5秒
  }
};
</script>


<style>

/* 全屏加载容器的样式 */
.loading-container {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(133, 130, 130, 0.42);
  backdrop-filter: blur(10px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
  opacity: 0;
  animation: fadeIn 0.3s ease-out;
}
/* 定义渐出动画 */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
/* 定义渐入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* 加载容器处于活动状态时的样式 */
.loading-container.is-active {
  opacity: 1;
}

/* 加载内容（图标和文本）的样式 */
.loading-content {
  display: flex;
  align-items: center; /* 确保图标和文本垂直居中 */
}
/* 帮助文本样式 */
.help-text {
  font-family: "钉钉进步体 Regular", sans-serif;
  position: absolute;
  bottom: 20px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: #ffffff;
  transition: opacity 1s ease-in-out;
}

/* 淡入淡出动画 */
.fade-effect {
  animation: fadeEffect 5s ease-in-out;
}

@keyframes fadeEffect {
  0%, 100% { opacity: 0; }
  50% { opacity: 1; }
}
/* 加载图标容器的样式 */
.loading-icon-container {
  /* 图标样式，可以根据需要添加 */

}

/* 图标和文本之间的间距 */
.loading-text-container {
  margin-left: 10px; /* 在图标和文本之间添加一些间距 */
}

/* 加载文本的样式 */
.loading-text {
  font-family: "钉钉进步体 Regular", sans-serif;
  font-weight: 400;
  font-size: 24px;
  color: #ffffff; /* 设置文本颜色为白色 */
}

/* 加载图标的样式 */
.loading_icon_styles,
.loading_icon_styles > div {
  position: relative;
  box-sizing: border-box;
}

.loading_icon_styles {
  display: block;
  font-size: 0;
  color: #000;
}

.loading_icon_styles.la-dark {
  color: #000000;
}

.loading_icon_styles > div {
  display: inline-block;
  float: none;
  background-color: currentColor;
  border: 0 solid currentColor;
  width: 32px;
  height: 32px;
  background: transparent;
  border-width: 2px;
  border-radius: 100%;
}

/* 加载图标的动画 */
.loading_icon_styles > div:before,
.loading_icon_styles > div:after {
  position: absolute;
  top: 14px;
  left: 14px;
  display: block;
  width: 2px;
  margin-top: -1px;
  margin-left: -1px;
  content: "";
  background: currentColor;
  border-radius: 2px;
  transform-origin: 1px 1px 0;
  animation: timer-loader 1250ms infinite linear;
}

.loading_icon_styles > div:before {
  height: 12px;
}

.loading_icon_styles > div:after {
  height: 8px;
}

/* 定义加载图标动画的关键帧 */
@keyframes timer-loader {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@font-face {
  font-family: "钉钉进步体 Regular";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/JWIsZmbDIRw1/gYM7n4g9DWXr.woff2") format("woff2"),
  url("//at.alicdn.com/wf/webfont/JWIsZmbDIRw1/2ott3qoogJaD.woff") format("woff");
  font-display: swap;
}
</style>
