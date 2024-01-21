<template>
  <div class="chat-main" >
    <div v-for="message in displayedMessages" :key="message.id">
      <file-message
        v-if="isFileMessage(message)"
        :file-name="extractFileName(message.content)"
        :file-contents="message.Filecontents"
        @file-dblclick="openFile"
      ></file-message>
      <div v-if="isSystemMessage(message)" class="system-message">
        <!-- 处理特殊消息 -->
        <span class="system-message-icon fas fa-info-circle"></span>
        <span class="system-message-text">{{ message.content }}</span>
      </div>
      <!-- 特殊消息：系统消息、代码块、提及 -->
      <div v-else-if="isSpecialMessage(message)" v-html="formatSpecialMessage(message)"></div>

      <!-- 处理普通消息，排除System和Files类型的消息 -->
      <div v-else-if="!isFileMessage(message) && !isSystemMessage(message)" class="message-container">
        <div class="message-user-avatar">
          <img :src="getAvatarUrl(message.avatar)" alt="avatar" />
        </div>
        <div class="message-details">
          <div class="message-header">
            <div class="message-username">{{ message.sender }}</div>
            <div class="message-timestamp">time is{{ message.delaytimestamp }}x</div>
          </div>
          <div class="message-text">{{ message.content }}</div>
        </div>
      </div>
    </div>
  </div>
  <chat-foot v-if="showUserChoice" :user-choice="currentUserChoice" @user-selects-choice="handleUserSelect"></chat-foot>
  <audio v-if="soundPath" :src="soundPath" ref="audioElement"></audio>
</template>


<script>
import ChatFoot from './foot.vue';
import FileMessage from './FileMessage.vue';
import MarkdownIt from 'markdown-it';
import ModalContent from './ModalContent.vue';


export default {
  name: 'ChatMain',
  components: {
    ChatFoot,
    // eslint-disable-next-line vue/no-unused-components
    ModalContent,
    // eslint-disable-next-line vue/no-unused-components
    FileMessage  // 新添加的文件消息组件
  },
  updated() {
    if (this.soundPath) {
      this.playAudio();
    }
  },
  watch: {
    displayedMessages() {
      // 当 displayedMessages 更新时，调用 scrollToBottom 方法
      this.$nextTick(() => {
        console.log("Attempting to scroll to bottom...");
        this.scrollToBottom();
      });
    },
  },
  data() {
    return {
      currentSound: null, // 当前要播放的声音名称
      soundPath: '', // 声音文件的路径
      displayedMessages: [],
      showModal: false,
      modalFileContent: '',
      showUserChoice: false, // 控制是否显示需要用户选择的按钮
      isAwaitingUserResponse: false,
      currentUserChoice: null, // 当前待选的用户选项
      currentMessageIndex: 0,
      messages: [], // 从 Vuex store 获取的原始消息数组
    };
  },
  mounted() {
    console.log('mounted, this.$el:', this.$el);
    this.messages = this.$store.state.messages;
    this.processNextMessage();
    window.openFile = this.openFile;
  },
  methods: {
    playAudio() {
      let audio = this.$refs.audioElement;
      if (audio) {
        audio.play().then(() => {
          console.log(`Sound played successfully.`);
        }).catch(error => {
          console.error(`Error playing sound:`, error);
        });
      } else {
        console.error(`Audio element not found`);
      }
    },
    scrollToBottom() {
      // 获取消息容器元素
      const container = this.$refs.messageContainer;
      if (container) {
        console.log(`ScrollHeight: ${container.scrollHeight}, ScrollTop: ${container.scrollTop}`);
        container.scrollTop = container.scrollHeight;

        // 添加调试信息
        setTimeout(() => {
          console.log(`Updated ScrollTop: ${container.scrollTop}`);
        }, 0);
      } else {
        console.log("Message container not found");
      }
    },
    triggerSound(soundType) {
      if (soundType) {
        this.soundPath = `https://cdn.xn--7ovw36h.love/sound/${soundType}.mp3`;
        this.$nextTick(() => {
          this.playAudio();
        });
      } else {
        console.log('No soundType provided to triggerSound method');
      }
    },
    isFileMessage(message) {
      // 检查消息内容是否符合文件消息的格式
      return message.content.startsWith('*') && message.content.endsWith('*');
    },
    extractFileName(content) {
      // 从消息内容中提取文件名
      const matches = content.match(/\*(.*?)\*/);
      return matches ? matches[1].trim() : '';
    },
    openFile(fileName, fileContents) {
      console.log('File opened:', fileName);

      // 创建 MarkdownIt 实例
      const md = new MarkdownIt();

      // 将 Markdown 格式的文本转换为 HTML
      const renderedContent = fileContents; // 不进行Markdown转换
      console.log('Formatted file contents:', renderedContent);

      // 使用 Ant Design Vue 的 Modal 展示格式化后的内容
      this.$info({
        title: '文件内容',
        content: renderedContent, // 使用转换后的 HTML
        onOk: () => {
          this.processNextMessage();
        }
      });
    },



    handleUserSelect(choice) {
      this.showUserChoice = false; // 用户选择后隐藏按钮
      const selectedMessage = this.messages[this.currentMessageIndex];
      selectedMessage.userHasResponded = true;
      this.displayedMessages.push({
        id: `user_choice_${Date.now()}`,
        content: choice,
        avatar: 'user',
        sender: 'wuhu',
      });

      // 重置等待用户响应的状态
      this.isAwaitingUserResponse = false;

      // 获取下一条消息的延时
      const nextMessage = this.messages[this.currentMessageIndex + 1];
      const nextMessageDelay = nextMessage ? parseInt(nextMessage.delaytimestamp.split('^')[0]) * 1000 : 0;


      // 等待延时后处理下一条消息
      setTimeout(() => {
        this.currentMessageIndex++;
        this.processNextMessage();
      }, nextMessageDelay);
    },
    processNextMessage() {

      console.log('processNextMessage called, index:', this.currentMessageIndex);
      if (this.currentMessageIndex < this.messages.length && !this.isAwaitingUserResponse) {
        // 如果当前消息是最后一条
        if (this.currentMessageIndex === this.messages.length - 1) {
          // 发送 'fangyanhua' 事件给父组件
          this.$emit('fangyanhua');
        }

        const message = this.messages[this.currentMessageIndex];
        console.log('Processing message:', message);

        if (message.sound ) {
          console.log(`Triggering sound for message id ${message.id}: ${message.sound}`);
          this.triggerSound(message.sound);
        }
        const defaultDelay = 1500; // 默认延迟时间为1.5秒
        let delays = message.delaytimestamp ? message.delaytimestamp.split('^').map(delay => parseInt(delay) * 1000) : [defaultDelay];
        if (delays.length < message.content.split('\n').length) {
          let requiredDelays = message.content.split('\n').length - delays.length;
          for (let i = 0; i < requiredDelays; i++) {
            delays.push(defaultDelay);
          }
        }

        this.processLines(message.content.split('\n'), delays, 0, message);
      }
    },

    processLines(lines, delays, index, message) {
      console.log('processLines called, line index:', index, 'line content:', lines[index]);
      if (index < lines.length) {
        this.displayedMessages.push({
          ...message,
          content: lines[index],
          userHasResponded: false,
        });

        let nextIndex = index + 1;
        let delay = delays[index] || 1500;
        if (nextIndex < lines.length) {
          setTimeout(() => {
            this.processLines(lines, delays, nextIndex, message);
          }, delay);
        } else {
          // 到达消息的最后一行
          if (message.userchoose && !this.isAwaitingUserResponse) {
            // 显示用户选择器并暂停消息处理
            this.isAwaitingUserResponse = true;
            this.currentUserChoice = message.userchoose;
            this.showUserChoice = true;
            console.log('Waiting for user choice');
          } else {
            // 不是 userchoose 消息或用户已做出选择，继续下一条消息
            setTimeout(() => {
              this.currentMessageIndex++;
              this.processNextMessage();
            }, delay);
          }
        }
      } else {
        // 没有更多行，继续下一条消息
        this.currentMessageIndex++;
        this.processNextMessage();
      }
    },


    calculateDelay(index, delaysArray) {
      let totalDelay = 0;
      for (let j = 0; j <= index; j++) { // 这里使用j <= index，确保计算最后一个延迟时间
        totalDelay += delaysArray[j] || 0; // 如果delaytimestamp数组长度小于lines.length，添加默认值0避免错误
      }
      return totalDelay;
    },

    continueMessages() {
      // 从当前显示的最后一条消息之后继续处理消息
      const lastIndex = this.displayedMessages.length - 1;
      const lastMessageId = this.displayedMessages[lastIndex].id;
      const remainingMessages = this.messages.slice(lastMessageId + 1);
      this.processMessages(remainingMessages);
    },
    getAvatarUrl(avatar) {
      const avatarPath = '/img/'; // 假设头像存储在此路径
      return `https://cdn.xn--7ovw36h.love/${avatarPath}${avatar}.jpg`; // 拼接头像的完整路径
    },
    isSpecialMessage(message) {
      // 检查是否是文件消息、系统消息、代码块或提及
      return this.isFileMessage(message) ||
        this.isSystemMessage(message) ||
        message.content.includes('$$') ||
        message.content.includes('%@%');
    },
    isSystemMessage(message) {
      // 检查消息发送者是否为system或消息id是否为over1, over2, over3
      return message.sender === 'system' || ['over1', 'over2', 'over3'].includes(message.id);
    },
    formatSpecialMessage(message) {
      // 初始化格式化内容变量
      let formattedContent = message.content;

      // 检查是否为系统消息
      if (this.isSystemMessage(message)) {
        // 如果是系统消息，应用.system-message样式
        formattedContent = `<div class="system-message">${formattedContent}</div>`;
      }



      // 处理代码块
      if (formattedContent.includes('$$')) {
        formattedContent = formattedContent.replace(/\$\$(.*?)\$\$/g, '<div class="code-block">$1</div>');
      }

      // 处理提及
      if (formattedContent.includes('%@%')) {
        formattedContent = formattedContent.replace(/%\@(.*?)\@%/g, '<div class="mention">@$1</div>');
      }

      // 替换文件附件
      if (formattedContent.includes('*')) {
        formattedContent = formattedContent.replace(/\*(.*?)\*/g, '<div class="file-attachment">$1</div>');
      }

      return formattedContent;
    },
  },
};
</script>

<style scoped>
.code-block {
  font-family: 'Courier New', Courier, monospace;
  background-color: #f0f0f0;
  padding: 8px;
  border-radius: 4px;
  margin: 4px 0;
  white-space: pre-wrap;
  word-wrap: break-word;
}

/* 提及样式 */
.mention {
  font-weight: bold;
  background-color: #e6f7ff; /* 淡蓝色背景 */
  padding: 2px 8px;
  border-radius: 4px;
  margin: 2px 0;
}




.chat-main {
  padding: 20px;
  background-color: #36393f; /* 背景颜色 */
  color: #ffffff; /* 字体颜色 */
  height: calc(100vh - 48px - 52px); /* 高度减去头部和底部组件的高度 */
  overflow-y: scroll;
}

.message {
  display: flex;
  padding: 10px 0;
}

.message-user-avatar img {
  width: 40px; /* 头像大小 */
  height: 40px;
  border-radius: 50%; /* 圆形头像 */
  margin-right: 10px;
}

.message-container {
  display: flex;
  align-items: flex-start;
  margin-bottom: 10px;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.message-username {
  font-weight: 500; /* 用户名字体加粗 */
  margin-right: 10px;
}

.message-timestamp {
  font-size: 0.8em; /* 时间戳字体大小 */
  color: #72767d; /* 时间戳字体颜色 */
}

.message-text {
  white-space: pre-wrap; /* 支持换行 */
}
/* 为特殊消息格式定义样式 */
.code-block {
  font-family: 'Courier New', Courier, monospace; /* 固定宽度字体 */
  background-color: #eee; /* 浅灰色背景 */
  border-left: 3px solid #f0f; /* 左侧边框突出显示 */
  padding: 5px 10px; /* 内部间距 */
  margin: 5px 0; /* 外部间距 */
  white-space: pre-wrap; /* 保留空白字符和换行 */
  word-wrap: break-word; /* 自动换行 */
}

.bold-text {
  font-weight: bold;
  background-color: #f0f0f0;
  padding: 2px 5px; /* 轻微内部间距 */
  border-radius: 2px; /* 轻微圆角 */
}

.file-attachment {
  display: inline-flex; /* 行内弹性布局 */
  align-items: center; /* 垂直居中 */
  background-color: #dff0d8; /* 浅绿色背景 */
  padding: 5px 10px;
  border-radius: 4px;
  margin: 5px 0;
  font-size: 0.9em; /* 稍小字体 */
}

.file-attachment::before {
  content: '\f15b'; /* FontAwesome 文件图标 */
  font-family: FontAwesome; /* FontAwesome 字体 */
  margin-right: 5px; /* 图标和文本间隔 */
}

.message-details {
  margin-left: 10px;
}

.message-header {
  display: flex;
  align-items: center;
  margin-bottom: 5px;
}

.message-username {
  color: #ffffff; /* 用户名颜色 */
  font-weight: bold;
  margin-right: 10px;
}

.message-timestamp {
  color: #72767d; /* 时间戳颜色 */
  font-size: 0.75em;
}

.system-message {
  background-color: #e6f7ff; /* 更为柔和的背景色 */
  border-left: 4px solid #1890ff; /* 配合背景的边框色 */
  color: #333; /* 深色文本以增强对比度和可读性 */
  padding: 10px 20px; /* 适当的内边距以增强视觉效果 */
  border-radius: 4px; /* 适中的圆角 */
  margin: 10px 0 10px 0; /* 增加外边距，让消息不会挨得太紧 */
  font-size: 14px; /* 较小的字体大小以避免显得笨重 */
  box-shadow: 0 1px 6px rgba(0,0,0,0.2);
  display: flex; /* 使用flex布局确保元素在一行显示 */
  align-items: center; /* 垂直居中对齐内容 */
  justify-content: start; /* 确保内容靠左对齐 */
}

.system-message-icon {
  font-size: 18px; /* 图标大小适中 */
  margin-right: 10px; /* 图标与文本的间距 */
  color: #1890ff; /* 图标颜色与边框和背景色协调 */
}

.system-message-text {
  flex-grow: 1; /* 文本占据剩余空间 */
  color: #333; /* 深色文本更易阅读 */
  word-break: break-word; /* 防止文本溢出 */
}



</style>
