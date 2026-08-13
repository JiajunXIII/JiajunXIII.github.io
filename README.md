# Jiajun Xu Academic Homepage

许嘉俊的单页学术主页，基于 AcadHomepage、Minimal Mistakes 和 Jekyll 构建。About 提供精简中英文介绍，其余模块以英文为主。计划部署到 GitHub 用户根站点：

`https://jiajunxiii.github.io/`

> V1 当前处于本地审核阶段。审核前不要 commit、push、重命名远端仓库或启用 GitHub Pages。

## 页面内容

- About / 个人简介
- Research Interests
- News
- Publications
- Research
- Education
- Honors and Awards

Google Scholar statistics 和 Google Analytics 在 V1 中保持禁用。模板支持代码仍保留，并通过 `_config.yml` 中的开关和空配置阻止任何请求。

## 项目结构

- `_pages/about.md`：单页主页内容
- `_config.yml`：根站点、作者信息和 SEO 配置
- `_data/navigation.yml`：七个页内导航入口
- `_includes/`、`_layouts/`、`_sass/`：Jekyll 模板与样式
- `assets/`、`images/`：脚本、样式、头像、论文图和 favicon
- `google_scholar_crawler/`：上游模板的 Scholar 工具，V1 不启用
- `docs/`：中文维护说明与上游模板截图

本地验证产生的 `plan/`、`temp/`、`_site/`、`.jekyll-metadata`、`.bundle/` 和 `vendor/bundle/` 通过本地 Git exclude 排除，不进入最终站点或提交。

## WSL 构建环境

以下命令面向 `Ubuntu-22.04`，复用 `/home/jiajunx/anaconda3`：

```bash
source /home/jiajunx/anaconda3/etc/profile.d/conda.sh

conda create -n homepage-jekyll -c conda-forge ruby=2.7.2 -y
conda install -n homepage-jekyll -c conda-forge \
  c-compiler cxx-compiler pkg-config libxcrypt libxcrypt1=4.4.36 -y

conda activate homepage-jekyll
gem install bundler -v 2.2.19 --no-document
bundle _2.2.19_ config set --local path /home/jiajunx/.bundle/homepage-jekyll
bundle _2.2.19_ install
```

Ruby 2.7.2 的 Conda build 依赖 `libcrypt.so.1`；`libxcrypt1=4.4.36` 用于提供该 ABI。不要执行 `bundle update`，并保持 `Gemfile.lock` 不变。

## 本地预览

```bash
source /home/jiajunx/anaconda3/etc/profile.d/conda.sh
conda activate homepage-jekyll
cd /mnt/e/JiajunX/PycharmProjects/JiajunXu.github.io-main/JiajunXu.github.io-main
bash run_server.sh
```

浏览器访问：`http://127.0.0.1:4000/`

Production build：

```bash
JEKYLL_ENV=production bundle _2.2.19_ exec jekyll build --trace
```

`run_server.sh` 使用 Jekyll 3.9 自带的 livereload、polling 和 `0.0.0.0:4000` 监听配置，适配位于 `/mnt/e` 的 Windows 工作区。

## 内容与素材维护

1. 在 `_pages/about.md` 中维护正文。页面允许混合 Markdown 与 HTML；About 保持精简 English 在前、中文紧随，其余模块使用英文正文。
2. 在 `_config.yml` 中维护站点标题、描述、作者头像、邮箱和 GitHub 用户名。
3. 在 `_data/navigation.yml` 中维护页内锚点；导航 URL 使用根路径和 fragment。
4. 将 favicon 文件放在 `images/`，并同步检查 `images/site.webmanifest`。
5. 图片通过 Liquid `relative_url` filter 引用，SEO canonical 与 Open Graph URL 通过 `absolute_url` 生成。

V1 公开联系方式仅限 `jiajunx.cv@gmail.com` 和 GitHub `JiajunXIII`。不要加入手机号、微信、申请材料或院校定向研究计划。

### 新增论文

V1 不会自动爬取新论文。新增论文时，手动编辑 `_pages/about.md` 中的 `Publications` section：复制现有 `.paper-box`，替换论文标题、作者、venue、卷期/文章号、日期、简介以及 Paper、Project、Code 链接；将论文图放入 `images/`，并通过 `relative_url` 引用。没有 Project 或 Code 时直接删除对应链接，不要保留空链接或占位值。

修改后先运行 `bash run_server.sh`，在 `http://127.0.0.1:4000/` 检查页面，再执行 production build。确认无误后使用：

```bash
git add _pages/about.md images/<new-paper-image>
git commit -m "docs: add <paper-short-name> publication"
git push origin main
```

如果未来配置经过核验的 Google Scholar profile，可以启用引用数统计；它只负责引用统计，不会替你生成完整的 Publications 条目。

### 小内容修改

- 简介、研究方向、News、论文、教育与荣誉：编辑 `_pages/about.md`
- 姓名、头像、邮箱、GitHub、站点标题：编辑 `_config.yml`；修改后必须重启 Jekyll
- 顶部导航：编辑 `_data/navigation.yml`
- 头像和论文图：放入 `images/`，并同步更新引用路径

常规文字修改完成后运行：

```bash
git add _pages/about.md
git commit -m "docs: update homepage content"
git push origin main
```

GitHub Pages 通常会在 push 后数分钟内重新构建；可在仓库的 Actions 或 Settings > Pages 查看状态。

## 模板能力

AcadHomepage 原有的核心能力仍保留：

- Responsive layout：自动适配 desktop、tablet 和 mobile viewport
- SEO：canonical、Open Graph、sitemap 与 search-engine verification 配置
- Google Analytics：仅在设置非空 `google_analytics_id` 且页面允许时加载
- Google Scholar statistics：仅在 `google_scholar_stats_enabled: true` 时加载
- Font Awesome、Jekyll Feed、redirect 和 sitemap plugins

V1 没有已核验的 Scholar profile 或 Analytics ID，因此这两项均为关闭状态。当前 Scholar workflow 只显示停用说明，不会爬取论文或引用数据；不得使用占位 ID。

## 审核后部署

只有在本地页面审核通过后，才按以下顺序发布：

1. 执行最终敏感信息扫描。
2. 创建 Conventional Commit：`feat: build initial academic homepage`。
3. 将功能分支 rebase 到最新 `main`，再使用 `merge --no-ff` 合并。
4. 将远端仓库重命名为 `JiajunXIII.github.io`。
5. 更新本地 `origin`，push `main`。
6. 将 GitHub Pages source 配置为 `main / (root)`。
7. 验证线上地址 `https://jiajunxiii.github.io/`。

根站点配置必须保持为：

```yaml
url: "https://jiajunxiii.github.io"
baseurl: ""
repository: "JiajunXIII/JiajunXIII.github.io"
```

## Acknowledgements

- AcadHomepage incorporates Font Awesome, distributed under the SIL OFL 1.1 and MIT License.
- The template is influenced by [Minimal Mistakes](https://github.com/mmistakes/minimal-mistakes).
- The template is influenced by [Academic Pages](https://github.com/academicpages/academicpages.github.io).
- The original open-source license is retained in [LICENSE](LICENSE).

日常维护说明见 [docs/日常维护文档.md](docs/日常维护文档.md)。
