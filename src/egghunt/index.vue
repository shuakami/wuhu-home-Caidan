<!--
EggHunt(Index)-彩蛋动态壁纸-NewYearHome特别版
重构日期：2024-1-7 封装版本：29.0.3 注释版本1.3

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
  <div class="egg-hunt-container" @click="handleScreenClick" @mousemove="handleMouseMove">
    <!-- Loading组件 -->
    <LoadingComponent v-if="isLoading" class="loading-overlay" />
    <!-- 视频、文字组件 -->
    <video ref="backgroundVideo" class="background-video" :style="videoStyle" src="https://cdn.xn--7ovw36h.love/index_converted.mp4" autoplay loop muted @ended="handleVideoEnd"></video>
    <div v-if="showMessage" class="welcome-message">
      <div class="horizontal-text"><span>H</span><span>a</span><span>p</span><span>p</span><span>y</span></div>
      <div class="spacer"></div>
      <div class="horizontal-text age">16th</div>
      <div class="spacer"></div>
      <div class="horizontal-text">
        <span>B</span><span>i</span><span>r</span><span>t</span><span>h</span><span>d</span><span>a</span>
        <span>y
          <!-- 原本是打算圣诞帽的，但是不好看，换成烟花了 -->
          <img class="christmas-hat" src="https://cdn.xn--7ovw36h.love/yanhua.svg" alt="Christmas Hat">
        </span>
      </div>

      <div class="triangle-container" v-show="!state.hideTriangleAndText">
        <div class="triangle"></div>
        <div class="small-text">点击任意位置以继续</div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, reactive, onMounted, computed } from "vue";
import LoadingComponent from './LoadingComponent.vue'; // 导入Loading组件

export default {
  components: {
    LoadingComponent, // 注册Loading组件
  },
  setup() {
    const backgroundVideo = ref(null);
    const showMessage = ref(false);
    const videoLoaded = ref(false); // 标志视频是否已加载
    const isLoading = ref(true); // 添加isLoading标志
    const state = reactive({
      hideTriangleAndText: false,
      videoX: 0,
      videoY: 0,
      maxVideoWidth: 0
    });

    // 视频加载完成的处理逻辑
    const handleVideoLoaded = () => {
      isLoading.value = false; // 隐藏 Loading 组件
      if (!videoLoaded.value) {
        videoLoaded.value = true; // 设置视频已加载标志
        isLoading.value = false; // 设置加载标志为 false
      }
    };


    // 当视频播放结束时触发，用于循环播放视频
    const handleVideoEnd = () => {
      backgroundVideo.value.style.transition = 'opacity 0.3s ease-in-out';
      backgroundVideo.value.style.opacity = '0';
      setTimeout(() => {
        backgroundVideo.value.style.transition = 'none';
        backgroundVideo.value.style.opacity = '1';
        backgroundVideo.value.play();
      }, 4900);
    };

    // 处理鼠标移动事件，实现背景视频的视差效果
    // 视差效果的计算和平移逻辑
    // 鼠标移动事件处理
    const handleMouseMove = (event) => {
      const { clientX, clientY } = event;
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;

      // 确保视频始终在视窗范围内
      const maxMoveX = screenWidth * 0.05; // 水平移动
      const maxMoveY = screenHeight * 0.35; // 垂直移动

      let moveX = (clientX - screenWidth / 2) * 0.05;
      let moveY = (clientY - screenHeight / 2) * 0.05;

      // 限制移动范围，确保视频不会消失
      moveX = Math.max(Math.min(moveX, maxMoveX), -maxMoveX);
      moveY = Math.max(Math.min(moveY, maxMoveY), -maxMoveY);

      state.videoX = moveX;
      state.videoY = moveY;
    };

    const videoStyle = computed(() => ({
      transform: `scale(1.15) translate(${state.videoX}px, ${state.videoY}px)`
    }));

    // 获取视频最大宽度
    onMounted(() => {
      if (backgroundVideo.value) {
        // 监听视频加载完成事件
        backgroundVideo.value.addEventListener('canplaythrough', handleVideoLoaded);
        isLoading.value = false; // 加载完成，卸载 Loading 组件
        // 检查视频是否已经预加载
        if (backgroundVideo.value.readyState >= 4) {
          // HAVE_ENOUGH_DATA
          handleVideoLoaded();
          isLoading.value = false;
        }
        backgroundVideo.value.addEventListener('loadedmetadata', () => {
          state.videoWidth = backgroundVideo.value.videoWidth;
          state.videoHeight = backgroundVideo.value.videoHeight;
          isLoading.value = false; // 视频加载完成后设置isLoading为false
          setTimeout(() => {
            const loadingElement = document.querySelector('.loading-overlay');
            if (loadingElement) {
              loadingElement.classList.add('fade-out');
            }
          }, 500);// 延迟1秒开始动画=
        });
      }
    });

    // 组件挂载后的操作，例如初始化显示状态
    onMounted(() => {
      setTimeout(() => {
        showMessage.value = true;
      }, 1000);
    });

    // 贴心加了全注释，看不懂你真就大傻子了。
    return {
      backgroundVideo, // 背景视频
      handleVideoEnd,  // 视频结束后处理函数
      showMessage,     // 用于控制helptext消息的标志
      handleMouseMove, // 处理鼠标移动事件的函数
      state,           // 组件的状态数据
      videoStyle,      // 视频元素的样式数据
      isLoading,       // 是否正在加载的标志
    };
  },
  methods: {
    // 处理屏幕点击事件，切换小helptext显示状态并添加渐隐效果
    handleScreenClick() {

      this.state.hideTriangleAndText = !this.state.hideTriangleAndText;
      const triangleContainer = document.querySelector('.triangle-container');
      if (triangleContainer) {
        triangleContainer.style.transition = 'opacity 0.5s ease';
        triangleContainer.style.opacity = this.state.hideTriangleAndText ? '0' : '1';
      }

      this.$emit('TheBackEnd:Turn'); // 使用 this.$emit 发出事件
      console.log("Send:Msg");
    }
  },
  // 页面切换动效
  onBeforeUnmount() {
    const container = document.querySelector('.egg-hunt-container');
    if (container) {
      container.style.animation = 'fadeOut 1s ease forwards';
    }
  }
};
</script>

<style scoped>
/* 样式表注释不能用斜杠 */
.loading-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(121, 116, 116, 0.8);
  z-index: 999; /* 确保在顶部 */
  animation: fadeIn 0.3s ease-out;
}
/* 定义渐入动画 */
@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}
/* 定义渐出动画 */
@keyframes fadeOut {
  from { opacity: 1; }
  to { opacity: 0; }
}
@font-face {
  font-family: 'LibreBaskerville-Italic';
  src: url('/font/LibreBaskerville-Italic-3.ttf') format('truetype');
}

.egg-hunt-container {
  position: relative;
  width: 100%;
  height: 100vh;
  overflow: hidden;
  opacity: 0;
  animation: fadeIn 1s ease forwards;
  cursor: pointer;
}

.background-video {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  animation: videoSunlightEffect 30s infinite alternate;
}

@keyframes videoSunlightEffect {
  0%, 100% {
    filter: brightness(0.8);
  }
  50% {
    filter: brightness(1.00);
  }
}

.welcome-message {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 80%;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
  opacity: 0;
  animation: textAppear 2s ease forwards;
}
/* 应用动画到 Loading 组件 */
.loading-overlay.fade-out {
  animation: fadeOut 1s ease-out forwards;
}
.triangle-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  text-align: center;
  opacity: 0;
  animation: fadeTriangleAndText 1s ease forwards;
}

.triangle {
  width: 0;
  height: 0;
  border-left: 7px solid transparent;
  border-right: 7px solid transparent;
  border-top: 14px solid white;
  margin-bottom: 8px;
  animation: float 2s ease-in-out infinite;
}

/* 添加字体 */
@font-face {
  font-family: "钉钉进步体 Regular";
  font-weight: 400;
  src: url("//at.alicdn.com/wf/webfont/JWIsZmbDIRw1/rvXK7gFWyGR3.woff2") format("woff2"),
  url("//at.alicdn.com/wf/webfont/JWIsZmbDIRw1/h0JsBvEtmHHV.woff") format("woff");
  font-display: swap;
}

/* .small-text类自定义字体 */
.small-text {
  font-size: 14px;
  color: white;
  font-family: "钉钉进步体 Regular", sans-serif; /* 添加了字体族 */
}

.welcome-message .horizontal-text {
  font-family: 'LibreBaskerville-Italic', serif;
  font-size: 4rem;
  color: white;
  opacity: 0;
  transform: translateY(20px);
  animation: textAppear 2s ease forwards;
}

.welcome-message .spacer {
  width: 20px;
}

.welcome-message .horizontal-text.age {
  font-size: 5rem;
  color: #FFD700;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes textAppear {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes fadeTriangleAndText {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes float {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-10px);
  }
}
.christmas-hat {
  width: 57px;
  height: 35px;
  position: absolute;
  right: -30px;
  top: -20px;
}
/* 彩蛋浮动动效 */
.christmas-hat {
  animation: float 5s ease-in-out infinite;
}
</style>