import os
from datetime import datetime, timedelta, timezone
from github import Github
import langdetect

GITHUB_TOKEN = os.getenv("GITHUB_TOKEN") 
REPO_NAME = "shuakami/wuhu-home-Caidan"

g = Github(GITHUB_TOKEN)
repo = g.get_repo(REPO_NAME)
issues = repo.get_issues(state="open")

for issue in issues:
    # 检查issue的创建者是否为bot
    if issue.user.type == "Bot":
        continue  # 如果是bot,则跳过处理

    last_updated = issue.updated_at
    now = datetime.now(timezone.utc)  
    time_diff = now - last_updated

    if time_diff > timedelta(hours=10):
        detected_lang = langdetect.detect(issue.body)

        if detected_lang == 'zh-cn':
            comment_text = "您好,您的问题已经超过10小时都没有人回复了,按照常理来说,这不对....所以一定是开发者有了特殊情况,我替他给您道歉。您可以用邮件向 sdjz@vip.qq.com 这可能会有帮助。不过如果超过7天,开发者没有回复的话,那么大概率他是挂了~"
        elif detected_lang == 'en':  
            comment_text = "Hello, your issue has not been responded to for over 10 hours, which is not normal. So there must be some special circumstances with the developer, I apologize for him. You can email sdjz@vip.qq.com, this may help. But if the developer does not respond for more than 7 days, then there is a high probability that he is dead."

        issue.create_comment(comment_text)
