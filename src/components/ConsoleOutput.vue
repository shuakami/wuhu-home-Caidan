<!--
ConsoleOutput-控制台输出组件（分布式）-NewYearHome特别版
重构日期：2023-12-29 封装版本：1.0 注释版本1.0 新年快乐！

Copyright (C) 2023-2024 ByteFreezeLab×Sdjz.Wiki. All rights reserved.
严禁任何形式的未经许可的商业使用和倒卖行为。
This project is open-sourced on Github, accessible at: https://github.com/shuakami/wuhu-home-Caidan, and adopts the CC BY-NC-SA 4.0 DEED open-source license agreement. Unauthorized commercial exploitation and reselling are strictly prohibited.
Below are highlighted aspects of the CC BY-NC-SA 4.0 DEED license agreement (for complete terms, please refer to: https://creativecommons.org/licenses/by-nc-sa/4.0/):
Under the Attribution-NonCommercial-ShareAlike 4.0 International Public License, authors grant you the right to reproduce, distribute, and adapt their work under certain conditions. Any individual or entity using this project must retain the original author's attribution and may not use the project for commercial purposes. Distribution, adaptation, or creation of new works based on this project shall be released under the same license as this project.
-->
<template>
  <div>
    <!-- 留个Template很正常吧 -->
  </div>
</template>

<script setup>
import config from "@/../package.json";

const styleTitle1 = "font-size: 20px;font-weight: 600;color: rgb(221, 135, 71);";
const styleTitle2 = "font-size:12px;color: rgb(30,152,255);";
const styleContent = "color: rgb(44, 62, 80);";
const title1 = "Wuhu.Sdjz.Wiki_新年特供版 (16)";
const title2 = `

    ____      _  _       __        ___ _    _
 / ___|  __| |(_)____  \\ \\      / (_) | _(_)
 \\___ \\ / _\` || |_  /___\\ \\ /\\ / /| | |/ / |
  ___) | (_| || |/ /_____\\ V  V / | |   <| |
 |____/ \\__,_|/ /___|     \\_/\\_/  |_|_|\\_\\_|
            |__/

                 _
 __      ___   _| |__  _   _
 \\ \\ /\\ / / | | | '_ \\| | | |
  \\ V  V /| |_| | | | | |_| |
   \\_/\\_/  \\__,_|_| |_|\\__,_|

-----
Copyright (C) 2023-2024 sdjz.wiki. All rights reserved.
This project is based on the anonymous second open and adopts the MIT license.
  `;
const content = `\n\n版本: ${config.version}_NewYear特供\n主页: ${config.home}\n\n你今年已经16岁啦！ `;

console.info(`%c${title1} %c${title2} %c${content}`, styleTitle1, styleTitle2, styleContent);
</script>
