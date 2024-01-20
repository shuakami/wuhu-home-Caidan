<!--
ConsoleOutput-控制台输出组件（分布式）-NewYearHome特别版
重构日期：2023-12-29 封装版本：1.0 注释版本1.0 新年快乐！

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
