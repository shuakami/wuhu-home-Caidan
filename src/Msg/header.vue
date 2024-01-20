<!--
header-头部聊天组件
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
