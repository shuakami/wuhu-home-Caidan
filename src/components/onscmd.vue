<!--
OnsCmd-控制台模拟1-NewYearHome特别版
重构日期：2023-1-14 (125) 封装版本：7.3 注释版本：3.1 新年快乐！

Copyright (C) 2023-2024 ByteFreezeLab×Sdjz.Wiki. All rights reserved.
严禁任何形式的未经许可的商业使用和倒卖行为。
This project is open-sourced on Github, accessible at: https://github.com/shuakami/wuhu-home-Caidan, and adopts the CC BY-NC-SA 4.0 DEED open-source license agreement. Unauthorized commercial exploitation and reselling are strictly prohibited.
Below are highlighted aspects of the CC BY-NC-SA 4.0 DEED license agreement (for complete terms, please refer to: https://creativecommons.org/licenses/by-nc-sa/4.0/):
Under the Attribution-NonCommercial-ShareAlike 4.0 International Public License, authors grant you the right to reproduce, distribute, and adapt their work under certain conditions. Any individual or entity using this project must retain the original author's attribution and may not use the project for commercial purposes. Distribution, adaptation, or creation of new works based on this project shall be released under the same license as this project.
-->

<template>
  <div class="console" @click="focusInput">
    <pre id="output" :class="{ 'typing': isTyping }">{{ consoleOutput }}</pre>
    <div v-if="showAgeInput" class="age-input">
      <span class="command-prompt">></span> What's Your Age? <span>{{ userAge }}</span><span class="cursor">_</span>
      <input type="text" v-model="userAge" @keyup="handleAgeInput" ref="ageInput" class="hidden-input" />
    </div>
    <!-- 错误消息 -->
    <div v-if="showAgeInput && showError" class="error-message">
      <span class="command-prompt_error">></span>  <span class="error-text">{{ errorMessage }}</span>
    </div>
    <!-- 帮助 -->
    <div v-if="showHelp" class="help-message">
      <span class="command-prompt">></span> <span class="help-text">{{ helpMessage }}</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      consoleOutput: "",
      showAgeInput: false,
      userAge: "",
      isTyping: true,
      showError: false, // 控制是否显示错误提示
      errorMessage: "", // 错误消息文本
      errorInterval: null, // 用于保存错误检测的定时器
      showHelp: false, // 控制帮助信息的显示
      helpMessage: "帮助：请如实输入您的年龄，系统会自动判定并且进入主页面", // 帮助消息文本
    };
  },
  mounted() {
    this.simulateCodeOutput();
  },
  updated() {
    this.focusInput(); // 自动聚焦到输入框，这玩意可不能删

    // 在初始时等待700毫秒后再开始错误检测
    //这玩意写崩了，有时间再修，先占位
    // if (this.showAgeInput) {
    //  this.$refs.ageInput.focus();
    //  setTimeout(() => {
    //     this.showError();
    //   }, 700);
    //  }
  },
  methods: {
    async simulateCodeOutput() {
      const codeLines = [
        "WuhuControl Birthday [版本 1.0.22635.2700]",
        "(c) Sdjz.Wiki Corporation。保留所有权利。",
        "",
        "F:\\Project\\Wuhu\\App\\NewYear\\Home>pnpm install",
        "Lockfile is up to date, resolution step is skipped",
        "Already up to date",
        "Done in 1.1s",
        "",
        "F:\\Project\\Wuhu\\App\\NewYear\\Home>pnpm dev",
        "",
        "> home@16 dev F:\\Project\\Wuhu\\App\\NewYear\\Home",
        "> vite --host",
        "",
        "",
        "  VITE v4.4.9  ready in 691 ms",
        "",
        "  ➜  Local: https://wuhu.sdjz.wiki/",
        "  ➜  不会啦？你可以按H获得帮助",
        "  ➜  press h to show help",
        "",
      ];
      const delayArray = [0, 10, 100, 400, 100, 200, 300, 100, 100, 600, 100, 100, 300, 100, 0];
      for (let i = 0; i < codeLines.length; i++) {
        await this.sleep(100);
        this.consoleOutput += codeLines[i] + "\n";
        this.isTyping = false; // 停止打字动效
        await this.sleep(delayArray[i]);
        this.isTyping = true; // 恢复打字动效
      }

      this.showAgeInput = true;
      this.isTyping = false; // 执行完后隐藏小光标
      console.log("Code simulation completed. Waiting for age input...");
      this.focusInput(); // 自动聚焦到输入框
    },
    focusInput() {
      if (this.$refs.ageInput) { // 确保存在
        this.$refs.ageInput.focus();
      }
    },
    handleAgeInput() {
      const input = this.userAge.trim();
      if (input === "h" || input === "H") {
        // 输出帮助信息
        this.showHelp = true;
        this.userAge = ""; // 清空输入框内容
        // 5分钟后隐藏帮助信息
        setTimeout(() => {
          this.showHelp = false;
        }, 30 * 1000); // 30秒清除消息
      } else if (input === "") {
        this.showError = false;
      } else {
        const age = parseInt(input);
        if (!isNaN(age) && age === 16) {
          // 保存状态到本地存储-用于后期首次访问状态确定
          const ageCount = parseInt(localStorage.getItem('AgeCount') || 0) + 1; // 获取并增加计数器
          const savedData = `TheOnsProject#${ageCount}: Age:true, Date:${new Date().toString()}`;
          localStorage.setItem('AgeCount', ageCount); // 更新计数器
          localStorage.setItem(`Cons`, savedData); // 保存状态到本地存储
          this.showError = false; // 清除错误提示
          console.log("Age entered successfully. Loading main content...");

          // 延迟500毫秒后执行跳转
          setTimeout(() => {
            this.$emit("ageEntered", age);
          }, 500);
        } else if (input === "") { // 用户输入为空时不显示错误提示
          this.showError = false; // 清除错误提示
        } else {
          this.showError = true; // 显示错误提示
          this.errorMessage = "Please enter your age accurately and press Enter.";
        }
      }
    },
    sleep(ms) {
      return new Promise(resolve => setTimeout(resolve, ms));
    },
    startErrorCheck() {
      this.errorInterval = setInterval(() => {
        const age = parseInt(this.userAge);
        if (!isNaN(age) && age !== 16) {
          this.showError = true;
          this.errorMessage = "Please enter your age accurately and press Enter.";
        } else {
          this.showError = false;
          this.errorMessage = "";
        }
      }, 700);
    },
    stopErrorCheck() {
      clearInterval(this.errorInterval);
    },
  },
  watch: {
    userAge() {
      // 当用户输入年龄时启动或停止错误检测
      if (this.showError) {
        this.startErrorCheck();
      } else {
        this.stopErrorCheck();
      }
    },
  },
};
</script>

<style scoped>
.console {
  background-color: black;
  color: limegreen;
  font-family: "Cascadia Code", monospace;
  padding: 10px;
  overflow-y: scroll;
  height: 3000px;
}

.age-input {
  color: limegreen;
  font-family: "Cascadia Code", monospace;
}

.help-message,
.error-message {
  color: red;
  font-family: "Cascadia Code", monospace;
}

.cursor {
  animation: blink-caret 1s step-end infinite;
}

.hidden-input {
  position: absolute;
  opacity: 0;
  width: 0;
  height: 0;
  border: none;
  outline: none;
}

.command-prompt {
  color: limegreen;
  font-family: "Cascadia Code", monospace;
  margin-right: 5px;
}

.command-prompt_error {
  color: red;
  font-family: "Cascadia Code", monospace;
  margin-right: 5px;
}

@keyframes blink-caret {
  50% {
    opacity: 0;
  }
}

.typing::after {
  content: "_";
  animation: blink-caret 1s step-end infinite;
}
</style>
