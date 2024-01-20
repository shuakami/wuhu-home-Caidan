import { createStore } from 'vuex';

export default createStore({
  state: {
    messages: [
    {
      id: 1,
      sender: 'beluga',
      content: '给钱！\n打劫！',
      delaytimestamp: '2s^1s',
      sound: 'default',
      duration: 'short',
      avatar: 'beluga',
      userchoose:'这剧本是不是用烂了？试试别的。'
    },
    {
      id: 2,
      sender: 'beluga',
      content: '好吧，\n直接点——我需要你的大脑',
      delaytimestamp: '2s^2s',
      sound: 'astound',
      duration: 'short',
      avatar: 'beluga',
      userchoose:'植物大战僵尸？'
    },
    {
      id: 3,
      sender: 'beluga',
      content: '不\n不\n不\n我的Ai跑路了',
      delaytimestamp: '0.5s^0.4s^0.5s^1s',
      sound: 'default',
      duration: 'short',
      avatar: 'beluga',
      userchoose:'关我.....'
    },
    {
      id: 4,
      sender: 'beluga',
      content: '它开始在QQ上发布关于我的生日派对的消息。',
      delaytimestamp: '3s',
      sound: 'default',
      duration: 'short',
      avatar: 'beluga',
      userchoose:'我猜，你不是在谈论哲学问题。如果Ai真的有自我意识的话（'
    },
    {
      id: 5,
      sender: 'beluga',
      content: '如果哲学是探讨‘存在’的话，那么我的AI肯定在想它的‘生命意义’了。它突然开始对特定日期产生了兴趣，似乎认为某些日子应该配上烟花和气球。',
      delaytimestamp: '3s',
      sound: 'default',
      duration: 'short',
      avatar: 'beluga',
      userchoose:'坏了，今天我休息'
    },
      {
        id: "over0",
        sender: 'system',
        content: '系统消息：网络黑客（Polite猫）接入聊天',
        delaytimestamp: '3s',
        sound: 'dangerous',
        duration: 'short',
        avatar: 'system'
      },

      {
        id: 6,
        sender: 'Polite',
        content: '我可以插个嘴吗？或许我可以提供一些帮助。',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 7,
        sender: 'Polite',
        content: '你们可以尝试一下“ShanChu”命令，就像这样——',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite',
        userchoose: '删除？'
      },
      {
        id: 8,
        sender: 'Polite',
        content: '是的，删除你们的系统\n$ sudo Beluga $ \n $ sudo Wuhu $',
        delaytimestamp: '2s^2s^1s',
        sound: 'dangerous',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 9,
        sender: 'beluga',
        content: '你想当面黑了我们？',
        delaytimestamp: '3s',
        sound: 'astound',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 10,
        sender: 'Polite',
        content: '这东西怎么用来着，嘶\n$ sduo Beluga $\n$ sduo Wuhu $\n$ sduo Beluga $\n$ sduo Wuhu $',
        delaytimestamp: '2s^2s^1.5s^1.3s^1s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 11,
        sender: 'beluga',
        content: '打住',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 12,
        sender: 'Polite',
        content: '为啥',
        delaytimestamp: '2s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 13,
        sender: 'beluga',
        content: '因为——\n我也是个黑客\n$ sduo Polite $\n看到没',
        delaytimestamp: '1s^1s^2s^1s',
        sound: 'astound',
        duration: 'short',
        avatar: 'beluga'
      },

      {
        id: 'over1',
        sender: 'system',
        content: '已获取管理员权限',
        delaytimestamp: '2s',
        sound: 'default',
        duration: 'short',
        avatar: 'system',
      },


      {
        id: 14,
        sender: 'Polite',
        content: '牛逼\n你可以打住了',
        delaytimestamp: '2s^1s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite',
        userchoose:'.......\n你们差不多得咧！\n好了，Beluga，说说你的Ai'
      },
      {
        id: 15,
        sender: 'beluga',
        content: '我今天想让我的Ai把大家庭蛋糕的11种制作方法弄下来，结果它现在开始逆向渗透我。\n它还在网络上散播谣言说今天是我的生日——\n我现在连生日蛋糕的广告都刷屏了',
        delaytimestamp: '2s^1s^0.8s',
        sound: 'default',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 16,
        sender: 'Polite',
        content: '听起来你的AI比你更懂你。',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite',
        userchoose: '我同意'
      },
      {
        id: 17,
        sender: 'Polite',
        content: '听我的，你们可以利用AI的这种行为反过来控制它。我们需要制定一个反渗透策略，用它自己的游戏规则来引导它。\n看到你窗口上面的.ENV.AI.CON文件了吗？点它，这是最后的希望',
        delaytimestamp: '1.7s^1s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 'over2',
        sender: 'system',
        content: '* Flies：.ENV.AI.CON *',
        Filecontents: '# 大家庭蛋糕的11种制作方法\n' +
          '\n' +
          '## 1. 经典巧克力蛋糕：\n' +
          '制作一层或多层的巧克力蛋糕，使用巧克力奶油夹心，最后涂抹巧克力酱。\n' +
          '\n' +
          '## 2. 香草草莓蛋糕：\n' +
          '制作香草蛋糕，夹心中加入草莓酱和新鲜草莓，最后覆盖香草奶油。\n' +
          '\n' +
          '## 3. 柠檬蓝莓蛋糕：\n' +
          '制作柠檬蛋糕，夹心中加入蓝莓酱和蓝莓，上面覆盖柠檬奶油霜。\n' +
          '\n' +
          '## 4. 坚果巧克力蛋糕：\n' +
          '制作巧克力蛋糕，加入切碎的坚果（例如核桃、杏仁或榛子），涂抹巧克力奶油。\n' +
          '\n' +
          '## 5. 奶油芒果蛋糕：\n' +
          '制作白色蛋糕，夹心中加入芒果块和芒果酱，覆盖柔软的奶油。\n' +
          '\n' +
          '## 6. 花生酱香蕉蛋糕：\n' +
          '制作香蕉蛋糕，夹心中加入花生酱和香蕉切片，最后涂抹奶油花生酱。\n' +
          '\n' +
          '## 7. 桃子杏仁蛋糕：\n' +
          '制作杏仁蛋糕，夹心中放上切碎的桃子和杏仁蓉，覆盖杏仁奶油。\n' +
          '\n' +
          '## 8. 椰香菠萝蛋糕：\n' +
          '制作椰香蛋糕，夹心中加入切碎的菠萝块和椰子丝，涂抹椰子奶油。\n' +
          '\n' +
          '## 9. 红丝绒蛋糕：\n' +
          '制作红丝绒蛋糕，夹心中加入奶油芝士霜，并以奶油芝士霜作为覆盖层。\n' +
          '\n' +
          '## 10. 橙子巧克力蛋糕：\n' +
          '制作橙子巧克力蛋糕，夹心中加入橙子慕斯和巧克力片，覆盖巧克力奶油。\n' +
          '\n' +
          '## 11. 咖啡焦糖蛋糕：\n' +
          '制作咖啡味蛋糕，夹心中加入焦糖酱和咖啡奶油，最后涂抹咖啡奶油霜。 ',
        sound: 'default',
        duration: 'short',
        avatar: 'system',
        userchoose: '这是...大家庭蛋糕的11种制作方法？'
      },
      {
        id: 18,
        sender: 'beluga',
        content: 'stop\nstop\nstop',
        delaytimestamp: '1s^1s^0.6s',
        sound: 'dangerous',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 19,
        sender: 'Polite',
        content: '你只用打开它就可以了，Ai闻着味就过来了的',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: "over4",
        sender: 'system',
        content: '（AI加入聊天）',
        delaytimestamp: '2s',
        sound: 'default',
        duration: 'short',
        avatar: 'system'
      },
      {
        id: 20,
        sender: 'beluga',
        content: '%@AI% 你能不能赶紧自己停下来',
        delaytimestamp: '2s',
        sound: 'default',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 21,
        sender: 'Polite',
        content: '快！获取管理员权限',
        delaytimestamp: '2.5s',
        sound: 'dangerous',
        duration: 'short',
        avatar: 'Polite',
        userchoose: '$ sudo AI_ENV $'
      },
      {
        id: 22,
        sender: 'Polite',
        content: '很好，现在让我们引导AI进入这个环境。Beluga，准备一些假的系统漏洞，让它觉得自己找到了黄金',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite'
      },
      {
        id: 'over3',
        sender: 'system',
        content: '正在进行事件',
        delaytimestamp: '2s',
        sound: 'default',
        duration: 'short',
        avatar: 'system',
        code:'true'
      },

      {
        id: 23,
        sender: 'Polite',
        content: '看来我们的计划成功了。现在，让我们重定向它的能量。让它开始做一些有益的事情。',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'Polite',
        userchoose: '比如制作蛋糕的视频教程？'
      },
      {
        id: 24,
        sender: 'beluga',
        content: '哈，那我今天就有得看了。',
        delaytimestamp: '3s',
        sound: 'default',
        duration: 'short',
        avatar: 'beluga'
      },
      {
        id: 25,
        sender: 'beluga',
        content: '我想是时候给你一个真正的生日惊喜了。\n我在网络上安排了一个虚拟烟花秀，希望你能喜欢~',
        delaytimestamp: '2s^1s',
        sound: 'default',
        duration: 'short',
        avatar: 'beluga'
      },
   //   {
   //     id:"END",
   //     goto:"/firework/index.html"
   //   }
    ]
  },

  getters: {
    getMessageById: (state) => (id) => {
      return state.messages.find(message => message.id === id);
    },
  },
  actions: {
    addMessage({ commit }, newMessage) {
      commit('ADD_MESSAGE', newMessage);
    },
    deleteMessage({ commit }, id) {
      commit('DELETE_MESSAGE', id);
    },
    updateMessage({ commit }, { id, updatedContent }) {
      commit('UPDATE_MESSAGE', { id, updatedContent });
    },
  },
  mutations: {
    ADD_MESSAGE(state, newMessage) {
      state.messages.push(newMessage);
    },
    DELETE_MESSAGE(state, id) {
      state.messages = state.messages.filter(message => message.id !== id);
    },
    UPDATE_MESSAGE(state, { id, updatedContent }) {
      const message = state.messages.find(message => message.id === id);
      if (message) {
        message.content = updatedContent;
      }
    },
  },
});
