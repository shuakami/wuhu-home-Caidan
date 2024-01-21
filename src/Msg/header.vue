<!--
header-头部聊天组件
重构日期：2024-1-14 封装版本：3.1 注释版本1.0

Copyright (C) 2023-2024 ByteFreezeLab×Sdjz.Wiki. All rights reserved.
严禁任何形式的未经许可的商业使用和倒卖行为。
This project is open-sourced on Github, accessible at: https://github.com/shuakami/wuhu-home-Caidan, and adopts the CC BY-NC-SA 4.0 DEED open-source license agreement. Unauthorized commercial exploitation and reselling are strictly prohibited.
Below are highlighted aspects of the CC BY-NC-SA 4.0 DEED license agreement (for complete terms, please refer to: https://creativecommons.org/licenses/by-nc-sa/4.0/):
Under the Attribution-NonCommercial-ShareAlike 4.0 International Public License, authors grant you the right to reproduce, distribute, and adapt their work under certain conditions. Any individual or entity using this project must retain the original author's attribution and may not use the project for commercial purposes. Distribution, adaptation, or creation of new works based on this project shall be released under the same license as this project.
-->
<template>
  <header class="chat-header">
    <div class="header-left">
      <div class="user-info">
        <span class="username">Wuhu.IDE</span>
        <i class="fas fa-chevron-down"></i>
      </div>

    </div>
    <div class="header-center">
      <i class="fas fa-at"></i>
      <i class="fas fa-hashtag"></i>
      <i class="fas fa-bell"></i>
      <i class="fas fa-user-friends"></i>
      <i class="fas fa-cog"></i>
    </div>
    <div class="header-right">
      <div class="search-bar">
        <input type="text" placeholder="搜索" />
        <i class="fas fa-search"></i>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'ChatHeader',
};
</script>

<style scoped>
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #36393f;
  color: #b9bbbe;
  padding: 0 16px;
  font-size: 14px;
  height: 48px;
}

.user-info {
  display: flex;
  align-items: center;
  cursor: pointer;
}

.username {
  margin-right: 8px;
}

.header-center i,
.header-right .search-bar i {
  margin: 0 8px;
  cursor: pointer;
}



.search-bar {
  display: flex;
  align-items: center;
  background-color: #202225;
  border-radius: 4px;
  padding: 2px;
}

.search-bar input {
  background: transparent;
  border: none;
  color: inherit;
  padding: 4px 8px;
}

.search-bar input:focus {
  outline: none;
}


@media (max-width: 768px) {

}
</style>
