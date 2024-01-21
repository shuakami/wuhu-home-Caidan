<template>
  <div class="console" @click="focusInput" ref="consoleContainer">
    <pre id="output" :class="{ 'typing': isTyping }">{{ consoleOutput }}</pre>
  </div>
</template>

<script>
// 本组件已废除
export default {
  data() {
    return {
      consoleOutput: "",
      isTyping: true,
      originalCodeLines: [],
      isGlitchActive: false,
      codeLinesInfo: [], // 存储每行代码及其定时器信息

    };
  },

  mounted() {
    this.simulateCodeOutput();
    this.adjustConsoleHeight();
  },
  methods: {
    async simulateCodeOutput() {
      // 模拟控制台输出
      const codeLines = [
        // 控制台输出内容
        `
__        __     _            ____            _             _
 \ \      / /   _| |__  _   _ / ___|___  _ __ | |_ _ __ ___ | |
  \ \ /\ / / | | | '_ \| | | | |   / _ \| '_ \| __| '__/ _ \| |
   \ V  V /| |_| | | | | |_| | |__| (_) | | | | |_| | | (_) | |
    \_/\_/  \__,_|_| |_|\__,_|\____\___/|_| |_|\__|_|  \___/|_|
                                                                ` ,
        "Log Entry #0: SystemError: <built-in function func90> returned NULL without setting an error",
        "Log Entry #1: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #2: ReferenceError: var5 is not defined",
        "Log Entry #3: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #4: Segmentation fault (core dumped)",
        "Log Entry #5: ImportError: No module named 'package45'",
        "Log Entry #6: Unexpected token in JSON at position 14",
        "Log Entry #7: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #8: Unexpected token in JSON at position 47",
        "Log Entry #9: Unexpected token in JSON at position 98",
        "Log Entry #10: Unexpected token in JSON at position 77",
        "Log Entry #11: ImportError: No module named 'package25'",
        "Log Entry #12: Warning: Each child in a list should have a unique 'key' prop",
        "Log Entry #13: TypeError: Cannot read property 'prop6' of undefined",
        "Log Entry #14: ImportError: No module named 'package37'",
        "Log Entry #15: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #16: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #17: ReferenceError: var57 is not defined",
        "Log Entry #18: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #19: TypeError: Cannot read property 'prop46' of undefined",
        "Log Entry #20: TypeError: Cannot read property 'prop28' of undefined",
        "Log Entry #21: Unexpected token in JSON at position 39",
        "Log Entry #22: SyntaxError: Invalid or unexpected token in file Module41.js",
        "Log Entry #23: SystemError: <built-in function func71> returned NULL without setting an error",
        "Log Entry #24: Failed to load resource: the server responded with a status of 404 (Not Found)",
        "Log Entry #25: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #26: ImportError: No module named 'package52'",
        "Log Entry #27: Warning: Each child in a list should have a unique 'key' prop",
        "Log Entry #28: Unexpected token in JSON at position 20",
        "Log Entry #29: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #30: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #31: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #32: SyntaxError: Invalid or unexpected token in file Module81.js",
        "Log Entry #33: Failed to load resource: the server responded with a status of 404 (Not Found)",
        "Log Entry #34: ReferenceError: var58 is not defined",
        "Log Entry #35: SyntaxError: Invalid or unexpected token in file Module19.js",
        "Log Entry #36: SyntaxError: Invalid or unexpected token in file Module96.js",
        "Log Entry #37: SystemError: <built-in function func59> returned NULL without setting an error",
        "Log Entry #38: Warning: Each child in a list should have a unique 'key' prop",
        "Log Entry #39: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #40: Warning: Each child in a list should have a unique 'key' prop",
        "Log Entry #41: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #42: SystemError: <built-in function func58> returned NULL without setting an error",
        "Log Entry #43: ReferenceError: var17 is not defined",
        "Log Entry #44: Unexpected token in JSON at position 54",
        "Log Entry #45: Segmentation fault (core dumped)",
        "Log Entry #46: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #47: Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)",
        "Log Entry #48: SyntaxError: Invalid or unexpected token in file Module36.js",
        "Log Entry #49: Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)",
        "Log Entry #50: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #51: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #52: Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)",
        "Log Entry #53: Error: Request failed with status code 500",
        "Log Entry #54: Unexpected token in JSON at position 23",
        "Log Entry #55: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #56: Kernel panic - not syncing: VFS: Unable to mount root fs on unknown-block(0,0)",
        "Log Entry #57: TypeError: Cannot read property 'prop42' of undefined",
        "Log Entry #58: TypeError: Cannot read property 'prop14' of undefined",
        "Log Entry #59: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #60: SystemError: <built-in function func96> returned NULL without setting an error",
        "Log Entry #61: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #62: SystemError: <built-in function func47> returned NULL without setting an error",
        "Log Entry #63: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #64: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #65: Failed to load resource: the server responded with a status of 404 (Not Found)",
        "Log Entry #66: Segmentation fault (core dumped)",
        "Log Entry #67: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #68: TypeError: Cannot read property 'prop6' of undefined",
        "Log Entry #69: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #70: Segmentation fault (core dumped)",
        "Log Entry #71: Segmentation fault (core dumped)",
        "Log Entry #72: Segmentation fault (core dumped)",
        "Log Entry #73: ImportError: No module named 'package75'",
        "Log Entry #74: Unexpected token in JSON at position 88",
        "Log Entry #75: SyntaxError: Invalid or unexpected token in file Module73.js",
        "Log Entry #76: Error: Request failed with status code 500",
        "Log Entry #77: ImportError: No module named 'package18'",
        "Log Entry #78: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #79: TypeError: Cannot read property 'prop4' of undefined",
        "Log Entry #80: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #81: Unexpected token in JSON at position 62",
        "Log Entry #82: ReferenceError: var81 is not defined",
        "Log Entry #83: ImportError: No module named 'package57'",
        "Log Entry #84: Segmentation fault (core dumped)",
        "Log Entry #85: Warning: Each child in a list should have a unique 'key' prop",
        "Log Entry #86: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #87: Error: Request failed with status code 500",
        "Log Entry #88: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #89: SystemError: <built-in function func37> returned NULL without setting an error",
        "Log Entry #90: TypeError: Cannot read property 'prop48' of undefined",
        "Log Entry #91: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #92: ImportError: No module named 'package15'",
        "Log Entry #93: ImportError: No module named 'package46'",
        "Log Entry #94: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #95: ImportError: No module named 'package52'",
        "Log Entry #96: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #97: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #98: ReferenceError: var61 is not defined",
        "Log Entry #99: ImportError: No module named 'package79'",
        "Log Entry #100: TypeError: Cannot read property 'prop46' of undefined",
        "Log Entry #101: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #102: ImportError: No module named 'package24'",
        "Log Entry #103: TypeError: Cannot read property 'prop18' of undefined",
        "Log Entry #104: SyntaxError: Invalid or unexpected token in file Module64.js",
        "Log Entry #105: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #106: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #107: SyntaxError: Invalid or unexpected token in file Module59.js",
        "Log Entry #108: TypeError: Cannot read property 'prop7' of undefined",
        "Log Entry #109: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #110: SystemError: <built-in function func85> returned NULL without setting an error",
        "Log Entry #111: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #112: DeprecationWarning: Buffer() is deprecated due to security and usability issues",
        "Log Entry #113: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #114: Unexpected token in JSON at position 0",
        "Log Entry #115: TypeError: Cannot read property 'prop37' of undefined",
        "Log Entry #116: Fatal error: Maximum execution time of 30 seconds exceeded",
        "Log Entry #117: Failed to load resource: the server responded with a status of 404 (Not Found)",
        "Log Entry #118: PDOException: SQLSTATE[HY000] [2002] Connection refused",
        "Log Entry #119: Segmentation fault (core dumped)",
        "Log Entry #120: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #121: Segmentation fault (core dumped)",
        "Log Entry #122: Unexpected token in JSON at position 51",
        "Log Entry #123: ImportError: No module named 'package62'",
        "Log Entry #124: UnhandledPromiseRejectionWarning: Unhandled promise rejection",
        "Log Entry #125: SystemError: <built-in function func6> returned NULL without setting an error",
        "Log Entry #126: SyntaxError: Invalid or unexpected token in file Module58.js",


      ];
      const delayArray = [100, 200, 100, /* ...其他延迟... */];
      for (let i = 0; i < codeLines.length; i++) {
        await this.sleep(/* 延迟时间 */);
        this.consoleOutput += codeLines[i] + "\n";
        this.scrollToBottom(); // 滚动到底部
        this.isTyping = false; // 停止打字动效
        await this.sleep(delayArray[i]);
        this.isTyping = true; // 恢复打字动效
      }
      this.isTyping = false; // 执行完后隐藏小光标
      console.log("Code simulation completed. Proceeding to main content...");

      // 保存状态到本地存储
      const ageCount = parseInt(localStorage.getItem('AgeCount') || 0) + 1;
      const savedData = `TheOnsProject#${ageCount}: Age:true, Date:${new Date().toString()}`;
      localStorage.setItem('AgeCount', ageCount);
      localStorage.setItem(`ConsLog`, savedData);

      // 保存原始代码行
      this.codeLinesInfo = this.consoleOutput.split('\n').map(line => ({
        text: line,
        isGlitching: false,
      }));

      this.startGlitchEffect(); // 开始故障动效

    },
    //随机替换动效
    randomizeString(str) {
      const symbols = ",!^*(+=}`"
      return str.split('').map(char => {
        if (Math.random() > 0.9) {
          return symbols[Math.floor(Math.random() * symbols.length)];
        }
        return char;
      }).join('');
    },

    adjustConsoleHeight() {
      const screenHeight = window.innerHeight;
      const consoleHeight = screenHeight * 1; // 可调整为屏幕高度的某个比例
      this.$refs.consoleContainer.style.height = `${consoleHeight}px`;
    },
    proceedToMainContent() {
      // 跳转到主内容
      setTimeout(() => {
        this.$emit("ageEntered");
      }, 500);
    },
    sleep(ms) {
      // 模拟延迟函数
      return new Promise(resolve => setTimeout(resolve, ms));
    },
//故障动效逻辑
    startGlitchEffect() {
      const toggleGlitch = (lineInfo) => {
        lineInfo.isGlitching = !lineInfo.isGlitching;
        lineInfo.text = lineInfo.isGlitching ? this.randomizeString(lineInfo.originalText) : lineInfo.originalText;

        // 重新构建 consoleOutput
        this.consoleOutput = this.codeLinesInfo.map(info => info.text).join('\n');

        // 设置下一次切换的随机延时
        setTimeout(() => {
          toggleGlitch(lineInfo);
        }, Math.random() * 1500 + 200); // 500到1500毫秒之间的随机延时
      };

      // 为每一行启动独立的故障动效
      this.codeLinesInfo.forEach(lineInfo => {
        lineInfo.originalText = lineInfo.text; // 保存原始文本
        toggleGlitch(lineInfo);
      });

      // 设置动效的总持续时间
      setTimeout(() => {
        this.codeLinesInfo.forEach(lineInfo => {
          lineInfo.text = lineInfo.originalText; // 恢复原始文本
        });
        this.consoleOutput = this.codeLinesInfo.map(info => info.text).join('\n'); // 更新 consoleOutput
        this.proceedToMainContent(); // 执行跳转逻辑
      }, 5000); // 故障动效持续5秒
    },

    scrollToBottom() {
      // 确保nextTick之后执行滚动
      this.$nextTick(() => {
        const container = this.$refs.consoleContainer;
        if (container) {
          container.scrollTop = container.scrollHeight;
        } else {
          console.error("Scroll container not found");
        }
      });

    },
  },
};
</script>

<style scoped>

.console {
  /* 默认样式 */
  height: 1080px; /* 初始高度，根据需要调整 */
  /* 其他样式保持不变 */
}

/* 媒体查询，适应不同屏幕尺寸 */
@media screen and (max-height: 800px) {
  .console {
    height: 400px; /* 较小屏幕的高度 */
  }
}

@media screen and (max-height: 600px) {
  .console {
    height: 300px; /* 更小屏幕的高度 */
  }
}

.console {
  background-color: black;
  color: limegreen;
  font-family: "Cascadia Code", monospace;
  padding: 10px;
  overflow-y: scroll;
}

.age-input {
  color: limegreen;
  font-family: "Cascadia Code", monospace;
}
/* 针对 Webkit 浏览器（如 Chrome, Safari） */
.console::-webkit-scrollbar {
  display: none; /* 隐藏滚动条 */
}

/* 针对 IE, Edge 浏览器 */
.console {
  -ms-overflow-style: none; /* 在IE和Edge中隐藏滚动条 */
}

/* 针对 Firefox 浏览器 */
.console {
  scrollbar-width: none; /* 在Firefox中隐藏滚动条 */
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
.console pre {
  font-family: "Cascadia Code", monospace;
  font-size: 13px;
  line-height: 1.3;
}

@keyframes glitch {
  0% {
    opacity: 1;
    transform: translate(0);
  }
  20% {
    opacity: 0;
    transform: translate(-2px, 2px);
  }
  40% {
    opacity: 1;
    transform: translate(2px, -2px);
  }
  60% {
    opacity: 0;
    transform: translate(-2px, -2px);
  }
  80% {
    opacity: 1;
    transform: translate(2px, 2px);
  }
  100% {
    opacity: 1;
    transform: translate(0);
  }
}

.console.glitch {
  animation: glitch 0.2s infinite;
}


</style>
