import os
from datetime import datetime, timedelta
from github import Github
import langdetect

# 获取环境变量
GITHUB_TOKEN = os.getenv("GITHUB_TOKEN")
REPO_NAME = "shuakami/wuhu-home-Caidan" 

# 创建Github对象
g = Github(GITHUB_TOKEN)

# 获取仓库
repo = g.get_repo(REPO_NAME)

# 获取所有的issue
issues = repo.get_issues(state="open")

# 遍历所有的issue
for issue in issues:
  # 获取issue的最后更新时间
  last_updated = issue.updated_at

  # 获取当前时间
  now = datetime.now()

  # 计算时间差
  time_diff = now - last_updated

  # 如果超过10小时没有人回复
  if time_diff > timedelta(hours=10):
    # 检测issue的语言
    detected_lang = langdetect.detect(issue.body)

    # 根据检测到的语言发送相应的通知
    if detected_lang == 'zh-cn':
      comment_text = "您好，您的问题已经超过10小时都没有人回复了，按照常理来说，这不对。所以一定是开发者有了特殊情况，我替他给您道歉。您可以用邮件向 sdjz@vip.qq.com 这可能会有帮助。不过如果超过7天，开发者没有回复的话，那么大概率他是死了q"
    elif detected_lang == 'en':
      comment_text = "Hello, your issue has not been responded to for over 10 hours, which is not normal. So there must be some special circumstances with the developer, I apologize for him. You can email sdjz@vip.qq.com, this may help. But if the developer does not respond for more than 7 days, then there is a high probability that he is dead."

    # 使用Github API发表评论
    issue.create_comment(comment_text)
