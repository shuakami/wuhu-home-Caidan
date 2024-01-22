import langdetect
from github import Github
import os

# 获取Issue的标题和内容
issue_title = os.getenv("ISSUE_TITLE")
issue_body = os.getenv("ISSUE_BODY")

# 将标题和内容合并成一个字符串
issue_text = issue_title + " " + issue_body

# 检测字符串的语言
detected_lang = langdetect.detect(issue_text)

if detected_lang == 'zh-cn':
  comment_text = "🐱 感谢您的问题反馈！我们会在4-8小时内回复您，请耐心等待QAQ，放平心态哦~\n\n🐳 在等待期间，请务必查阅我们的项目文档：[https://docs.sdjz.wiki/docs/birthday/start](https://docs.sdjz.wiki/docs/birthday/start)。\n\n🌨️ 若确认问题是与本项目相关，请提供以下详细信息以便我们更准确地定位和解决问题：\n- 错误内容（附上完整的错误日志）\n- 截图（如有可视化错误界面）\n- 相关代码片段或仓库链接（如果方便的话）\n\n🌻 我们会尽快伸出援手，帮您解决遇到的难题哒！"
elif detected_lang == 'en':
  comment_text = "🐱 Hey there! Thanks for reaching out with your issue. We'll get back to you within 4-8 hours, so please hang tight and stay calm ~<3~\n\n🐳 While you're waiting, be sure to review our project documentation: [https://docs.sdjz.wiki/docs/birthday/start](https://docs.sdjz.wiki/docs/birthday/start).\n\n🌨️ If the problem seems related to this project, kindly provide us with these details to help us troubleshoot more efficiently:\n- Error messages (include a full error log)\n- Screenshots (if applicable to visualize the issue)\n- Relevant code snippets or repository link (if convenient)\n\n🌻 We're on it! Our team will assist you in tackling your issue as promptly as possible. Keep your cool – we've got this!"

# 使用Github API发表评论
g = Github(os.getenv("GITHUB_TOKEN"))
repo = g.get_repo("shuakami/wuhu-home-Caidan")
issue = repo.get_issue(number=int(os.getenv("ISSUE_NUMBER")))
issue.create_comment(comment_text)
