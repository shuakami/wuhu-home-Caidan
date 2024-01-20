<!--
App-引入组件-NewYearHome特别版
重构日期：2024-1-14 封装版本：20.1 注释版本1.1

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
  <div>
    <Music ref="musicPlayer" :initialTrackId="'1440363352'" :shouldAutoPlayOnLoad="false" :isInEggHuntPage="showEggHunt" />
    <!-- 控制台输出组件 -->
    <ConsoleOutput />
    <!-- 引导页面 -->
    <OnScmd v-if="showOnScmd" @ageEntered="handleAgeEntered" />
    <!-- 引导彩蛋页面 -->
    <EggHuntPage v-if="showEggHunt" @TheBackEnd:Turn="handleTheBackEnd" />
    <!-- MailPage 主内容 -->
    <MsgPage v-if="showMailPage" />
  </div>
</template>

<script setup>
import Music from '@/Main/Music.vue';
import { nextTick } from 'vue';
import OnScmd from "@/components/onscmd.vue";
import EggHuntPage from "@/egghunt/index.vue"; // 彩蛋页面组件 EggHuntPage
import ConsoleOutput from "@/components/ConsoleOutput.vue"; // 引入新输出组件-这个是控制台，不要动
import { ref, onMounted } from 'vue';
import MsgPage from "@/Msg/index.vue"

const musicPlayer = ref(null);
const showOnScmd = ref(true);
const showEggHunt = ref(false); // 控制彩蛋页面的显示
const showMailPage = ref(false); // 新增：控制MailPage页面的显示

onMounted(() => {
  const startMusicOnFirstInteraction = () => {
    window.addEventListener('musicguolai', handleMusicGuoLai);
    if (musicPlayer.value) {
      // 移除监听器，确保只播放一次
      document.removeEventListener('mousemove', startMusicOnFirstInteraction);
    }
  };
  document.addEventListener('mousemove', startMusicOnFirstInteraction);
});

// 当 OnScmd ok 时的处理函数
const handleAgeEntered = async (age) => {
  if (age === 16) {
    showOnScmd.value = false;
    showEggHunt.value = true;

    await nextTick();
    setTimeout(async () => {
      // 确保音乐组件已准备好并且音频元素可以播放
      while (!musicPlayer.value || !musicPlayer.value.getIsAudioReady()) {
        await new Promise(resolve => setTimeout(resolve, 100));
      }

      // 已经在组件挂载时设置了初始曲目，所以这里无需再次加载
      // 如果需要切换到不同曲目，则使用：
      // await musicPlayer.value.loadTrack('1440363352');

      musicPlayer.value.playMusic(); // 直接播放当前设置的曲目
    }, 500);
  }
};

// 彩蛋完成的跳转事件
const handleTheBackEnd = async () => {
  showEggHunt.value = false; // 隐藏彩蛋页面
  showMailPage.value = true; // 假设存在一个showMailPage变量来控制MailPage的显示
  musicPlayer.value.pauseMusic();
  // 先确保暂停当前播放的曲目
 // await musicPlayer.value.loadTrack('2098345334');
  // 显示MailPage内容

//  setTimeout(() => {
  //  musicPlayer.value.playMusic(); // 延迟播放当前设置的曲目
//  }, 1000); // 延迟1秒钟，你可以根据需要调整延迟时间
 // console.log("Main content (MailPage) ok after Egg.");
};

// 添加处理 musicguolai 事件的方法
// 已废除
const handleMusicGuoLai = async () => {
    await musicPlayer.value.loadTrack('0416');
    musicPlayer.value.playMusic();
};

</script>

<style lang="scss" scoped>
/* 在你的全局样式文件中添加 */
.ant-modal-content {
  background-color: #333; /* 黑色背景 */
  color: #fff; /* 白色文本 */
}

.ant-modal-header {
  background-color: #444; /* 模态框头部的深色背景 */
  color: #fff;
}

.ant-modal-body {
  color: #fff; /* 内容部分的文本颜色 */
}

.ant-modal-footer {
  background-color: #444; /* 模态框底部的深色背景 */
}

#main {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  transform: scale(1.2);
  transition: transform 0.3s;
  animation: fade-blur-main-in 0.65s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards;
  animation-delay: 0.5s;
}
</style>
