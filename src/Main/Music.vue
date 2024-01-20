<!--
Music音乐管理组件-逻辑播放-Howler.js管理版本
重构日期：2024-1-14 封装版本：10.1 注释版本1.1

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
  </div>
</template>

<script>
import { ref, onMounted, onUnmounted } from 'vue';
import { Howl } from 'howler';
import { getMusicUrl } from '@/api/Music.js';

export default {
  props: {
    //音乐ID
    initialTrackId: {
      type: String,
      required: false,
      default: '',
    },
    // 加载时自动播放音乐
    shouldAutoPlayOnLoad: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 静音
    isMuted: {
      type: Boolean,
      required: false,
      default: false,
    },
    // 初始音量设置
    initialVolume: {
      type: Number,
      default: 0.4,
    },
    // 是否在彩蛋页面（用于判断音乐结束后的行为）
    isInEggHuntPage: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  setup(props) {
    // Howler音频对象
    const sound = ref(null);
    // 准备状态
    const isReady = ref(false);
    // 当前音乐ID
    const currentTrackId = ref(props.initialTrackId);
    // 上次播放时间（用于恢复进度）
    const lastPlayedTime = ref(0);

    // 加载音轨函数
    const loadTrack = async (trackId) => {
      if (trackId === '1440363352') {
        // 如果trackId为1440363352，使用特定链接
        const trackUrl = 'https://cdn.xn--7ovw36h.love/music/index.mp3';

        // 创建 Howler 音频对象
        sound.value = new Howl({
          src: [trackUrl],
          volume: props.initialVolume,
          autoplay: props.shouldAutoPlayOnLoad,
          mute: props.isMuted,
          onend: onMusicEnd,
        });

        lastPlayedTime.value = 0; // 切换音轨时重置播放时间
        console.log("Howler track loaded:", trackUrl);
      } else if (trackId === '2098345334') {
        // 如果trackId为2098345334，使用特定链接
        const trackUrl = 'https://cdn.xn--7ovw36h.love/music/the2.mp3';

        // 创建 Howler 音频对象
        sound.value = new Howl({
          src: [trackUrl],
          volume: props.initialVolume,
          autoplay: props.shouldAutoPlayOnLoad,
          mute: props.isMuted,
          onend: onMusicEnd,
        });

        lastPlayedTime.value = 0; // 切换音轨时重置播放时间
        console.log("Howler track loaded:", trackUrl);
      } else if (trackId === '0416') {
        // 如果trackId为0416，使用特定链接
        const trackUrl = 'https://cdn.xn--7ovw36h.love/music/fwork.mp3';

        // 创建 Howler 音频对象
        sound.value = new Howl({
          src: [trackUrl],
          volume: props.initialVolume,
          autoplay: props.shouldAutoPlayOnLoad,
          mute: props.isMuted,
          onend: onMusicEnd,
        });

        lastPlayedTime.value = 0; // 切换音轨时重置播放时间
        console.log("Howler track loaded:", trackUrl);
      }
      else {
        // 如果不是特定ID，获取音乐URL
        const musicData = await getMusicUrl(trackId);
        if (musicData && musicData.data && musicData.data[0]) {
          const trackUrl = musicData.data[0].url;

          // 创建 Howler 音频对象
          sound.value = new Howl({
            src: [trackUrl],
            volume: props.initialVolume,
            autoplay: props.shouldAutoPlayOnLoad,
            mute: props.isMuted,
            onend: onMusicEnd,
          });

          lastPlayedTime.value = 0; // 切换音轨时重置播放时间
          console.log("Howler track loaded:", trackUrl);
        }
      }
    };


    // 组件挂载时的逻辑
    onMounted(async () => {
      if (props.initialTrackId) {
        await loadTrack(props.initialTrackId);
        isReady.value = true;
      }
    });

    // 组件卸载时的逻辑
    onUnmounted(() => {
      if (sound.value) {
        sound.value.unload(); // 卸载音频，释放资源
      }
    });

    // 播放音乐
    const playMusic = () => {
      if (sound.value) {
        sound.value.fade(0, props.initialVolume, 3000); // 淡入
        sound.value.play(); // 开始播放
      }
    };

    // 暂停音乐
    const pauseMusic = () => {
      if (sound.value && sound.value.playing()) {
        sound.value.fade(props.initialVolume, 0, 1000);
        setTimeout(() => sound.value.pause(), 1000); // 淡出
      }
    };

    // 音乐结束时的处理逻辑
    const onMusicEnd = () => {
      if (props.isInEggHuntPage) {
        // 如果在彩蛋页面，则循环播放
        playMusic();
      }
    };

    return {
      playMusic,
      pauseMusic,
      isReady,
      loadTrack,
      getIsAudioReady: () => isReady.value,
      currentTrackId,
      lastPlayedTime,
    };
  },
};
</script>
