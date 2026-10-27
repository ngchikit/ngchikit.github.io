
<h1 align="center">
AcadHomepage
</h1>

<div align="center">

[![](https://img.shields.io/github/stars/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/forks/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/issues/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io)
[![](https://img.shields.io/github/license/RayeRen/acad-homepage.github.io)](https://github.com/RayeRen/acad-homepage.github.io/blob/main/LICENSE)  | [中文文档](./docs/README-zh.md) 
</div>

<p align="center">A Modern and Responsive Academic Personal Homepage</p>

<p align="center">
    <br>
    <img src="docs/screenshot.png" width="100%"/>
    <br>
</p>

Some examples:
- [Demo Page](https://rayeren.github.io/acad-homepage.github.io/)
- [Personal Homepage of the author](https://rayeren.github.io/)

## Maintaining Chi Kit Ng's homepage

- Homepage layout and styling: `_pages/about.md`, `_layouts/home.html`, and `assets/css/home.css`.
- Selected publications: `_data/selected_publications.json`. Each entry supplies the paper, project page, authors, figure, and optional demonstration video.
- Full bibliography and news: `_pages/includes/pub.md` and `_pages/includes/news.md`. The selected list does not replace the full bibliography.
- Biography, research experience, awards, and other background: the corresponding Markdown files in `_pages/includes/`.
- Personal email: `_config.yml` stores `author.email_encoded` as Base64. `_includes/contact-*.html` and `assets/{css,js}/contact.*` provide click-to-open contact details with copy and email-app actions, shared by the homepage and the project inquiry link. The complete address and `mailto:` link are created only after activation and cleared when the dialog closes. Without JavaScript, contact links lead to LinkedIn. This reduces basic address scraping; it is not encryption and cannot stop a crawler that decodes the configuration or follows interactions. Existing copies in public Git history or search caches are unaffected.
- The project hub at `renlab-endoscopic-projects/index.html` and the EndoVLA-OOV, EBV-CAN, and EndoRSI pages share `_layouts/endoscopy.html`, `renlab-endoscopic-projects/projects.css`, and `renlab-endoscopic-projects/projects.js`. Project order, filters, and detailed content live in `_data/endoscopy.json`; paper metadata and authors come from `_data/selected_publications.json`. The three detail pages use `_layouts/endoscopy-project.html`. MPRF uses `_layouts/research-project.html`, and the earlier project pages remain in `renlab-endoscopic-projects/`.

Research figures in `assets/research/` come from the public arXiv v1 pages for [EBV-CAN](https://arxiv.org/html/2610.30786v1), [MPRF](https://arxiv.org/html/2610.31028v1), [EndoVLA-OOV](https://arxiv.org/html/2610.24747v1), and [EndoRSI](https://arxiv.org/html/2610.13376v1). Short previews are compressed excerpts of the author's supplied demonstration videos; full videos are linked separately.

The compact footer uses the free [MapMyVisitors map](https://mapmyvisitors.com/) with a blue ocean, white continents, and visitor markers. Its pageview label belongs to the date range displayed on the widget; it must not be relabelled as an all-time total. The statistics link opens the provider's daily views and geographic breakdown. This replaces the separate Busuanzi counters (whose backend was timing out) and the large Flag Counter map.

`visitor_map.widget_id` in `_config.yml` contains the `d` parameter from the account's generated embed code. `visitor_map.statistics_url` points to this homepage's [public statistics](https://mapmyvisitors.com/web/1c94n). Use the widget registered for `https://ngchikit.github.io/`, not another website's ID. Account email, password, and login cookies do not belong in this repository. When replacing the widget, update both public settings and verify the real widget before publication.

`assets/js/home.js` loads the provider once per visit to the published homepage. Local previews do not request the tracking widget or invent counts. The responsive map is at most 300 px wide; a failed load shows a short unavailable message and retains the statistics link. There is no timer that repeatedly submits pageviews, and no scheduled GitHub workflow is needed. Statistics start when the new widget is installed and cannot restore visits missed by the previous counter. The footer links the provider's [privacy policy](https://mapmyvisitors.com/b/policy), which describes IP-based approximate locations, browser information, page URLs, and visit metadata.

## Key Features
- **Automatically update google scholar citations**: using the google scholar crawler and github action, this REPO can update the author citations and publication citations automatically.
- **Support Google analytics**: you can trace the traffics of your homepage by easy configuration.
- **Responsive**: this homepage automatically adjust for different screen sizes and viewports.
- **Beautiful and Simple Design**: this homepage is beautiful and simple, which is very suitable for academic personal homepage.
- **SEO**: search Engine Optimization (SEO) helps search engines find the information you publish on your homepage easily, then rank it against similar websites.

## Quick Start

1. Fork this REPO and rename to `USERNAME.github.io`, where `USERNAME` is your github USERNAME.
1. Configure the google scholar citation crawler:
    1. Find your google scholar ID in the url of your google scholar page (e.g., https://scholar.google.com/citations?user=SCHOLAR_ID), where `SCHOLAR_ID` is your google scholar ID.
    1. Set GOOGLE_SCHOLAR_ID variable to your google scholar ID in `Settings -> Secrets -> Actions -> New repository secret` of the REPO website with `name=GOOGLE_SCHOLAR_ID` and `value=SCHOLAR_ID`.
    1. Click the `Action` of the REPO website and enable the workflows by clicking *"I understand my workflows, go ahead and enable them"*. This github action will generate google scholar citation stats data `gs_data.json` in `google-scholar-stats` branch of your REPO. When you update your main branch, this action will be triggered. This action will also be trigger 08:00 UTC everyday.
1. Generate favicon using [favicon-generator](https://redketchup.io/favicon-generator) and download all generated files to `REPO/images`.
1. Modify the configuration of your homepage `_config.yml`:
    1. `title`: the title of your homepage
    1. `description`: the description of your homepage
    1. `repository`: USER_NAME/REPO_NAME  
    1. `google_analytics_id` (optional): google analytics ID
    1. SEO Related keys (optional): get these keys from search engine consoles (e.g. Google, Bing and Baidu) and paste here.
    1. `author`: the author information of this homepage, including some other websites, emails, city and univeristy.
    1. More configuration details are described in the comments.
1. Add your homepage content in `_pages/about.md`.
    1. You can use html+markdown syntax just same as jekyll.
    1. You can use a `<span>` tag with class `show_paper_citations` and attribute `data` to display the citations of your paper. Set the data to the google scholar paper ID. For
        ```html
        <span class='show_paper_citations' data='DhtAFkwAAAAJ:ALROH1vI_8AC'></span>
        ``` 
        > Q: How to get the google scholar paper ID?   
        > A: Enter your google scholar homepage and click the paper name. Then you can see the paper ID from `citation_for_view=XXXX`, where `XXXX` is the required paper ID.
1. Your page will be published at `https://USERNAME.github.io`.

## Debug Locally

1. Clone your REPO to local using `git clone`.
1. Install Jekyll building environment, including `Ruby`, `RubyGems`, `GCC` and `Make` following [the installation guide](https://jekyllrb.com/docs/installation/#requirements).
1. Run `bash run_server.sh` to start Jekyll livereload server.
1. Open http://127.0.0.1:4000 in your browser.
1. If you change the source code of the website, the livereload server will automatically refresh.
1. When you finish the modification of your homepage, `commit` your changings and `push` to your remote REPO using `git` command.

# Acknowledges

- AcadHomepage incorporates Font Awesome, which is distributed under the terms of the SIL OFL 1.1 and MIT License.
- AcadHomepage is influenced by the github repo [mmistakes/minimal-mistakes](https://github.com/mmistakes/minimal-mistakes), which is distributed under the MIT License.
- AcadHomepage is influenced by the github repo [academicpages/academicpages.github.io](https://github.com/academicpages/academicpages.github.io), which is distributed under the MIT License.
