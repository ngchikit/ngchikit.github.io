---
layout: home
homepage: true
permalink: /
title: "Chi Kit Ng"
redirect_from: 
  - /about/
  - /about.html
---

<section class="profile-hero" aria-labelledby="profile-name">
  <aside class="profile-portrait">
    <img class="portrait" src="/{{ site.author.avatar }}" alt="Chi Kit Ng (Justin)" width="216" height="270" fetchpriority="high">
    <p class="profile-location"><span aria-hidden="true">●</span> Hong Kong · CUHK</p>
    <a class="profile-email" href="mailto:{{ site.author.email }}">{{ site.author.email }}</a>
    <div class="profile-links"><a href="{{ site.author.googlescholar }}" target="_blank" rel="noopener noreferrer">Scholar ↗</a><a href="https://github.com/{{ site.author.github }}" target="_blank" rel="noopener noreferrer">GitHub ↗</a><a href="https://www.linkedin.com/in/{{ site.author.linkedin }}" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a></div>
  </aside>
  <div class="hero-copy">
    <p class="eyebrow">Robotic endoscopy · Embodied intelligence</p>
    <h1 id="profile-name">Chi Kit Ng <span>Justin</span></h1>
    <p class="profile-role">PhD student, Electronic Engineering <span>·</span> HKPFS Awardee</p>
    <h2 class="about-label" id="about-me">About me</h2>
    <div class="biography">
      {% capture intro %}{% include_relative includes/intro.md %}{% endcapture %}
      {{ intro | remove_first: '# About Me' | markdownify }}
    </div>
  </div>
</section>

<section class="home-section news-section" aria-labelledby="news">
  <div class="section-heading"><div><p class="eyebrow">The latest</p><h2 id="news">News & updates</h2></div><span class="section-note">2026 — 2024</span></div>
  <div id="news-list" class="news-list">
    {% capture news %}{% include_relative includes/news.md %}{% endcapture %}
    {% assign news_heading = news | strip | newline_to_br | split: '<br />' | first %}
    {{ news | remove_first: news_heading | markdownify }}
  </div>
  <button type="button" class="text-button news-toggle" aria-expanded="false" aria-controls="news-list" hidden>Show all updates ↓</button>
</section>

<section class="home-section publications-section" aria-labelledby="publications">
  <div class="section-heading"><div><p class="eyebrow">Research in action</p><h2 id="publications">Selected publications</h2></div><a class="section-link" href="{{ site.author.googlescholar }}" target="_blank" rel="noopener noreferrer">Google Scholar ↗</a></div>
  <p class="section-intro">Learning to see, act and improve in robotic endoscopy.</p>
  <p class="author-key"><sup>*</sup> Equal contribution <span>·</span> <sup>†</sup> Corresponding author</p>
  <div class="publication-list">
    {% for paper in site.data.selected_publications %}
    <article class="publication" id="publication-{{ paper.id }}">
      <div class="publication-visual">
        {% if paper.preview %}
        <video controls muted loop playsinline preload="none" poster="{{ paper.poster }}" data-preview="{{ paper.preview }}" aria-label="{{ paper.short | escape }} demonstration preview">Your browser does not support embedded video. <a href="{{ paper.video }}">Watch the demonstration</a>.</video>
        <span class="media-caption">Demonstration · 12-second preview</span>
        {% else %}
        <a class="figure-link" href="{{ paper.figure }}" data-figure aria-label="Enlarge {{ paper.short | escape }} figure"><img src="{{ paper.figure }}" alt="{{ paper.alt | escape }}" loading="lazy" decoding="async" width="320" height="208"><span class="figure-expand" aria-hidden="true">↗</span></a>
        <span class="media-caption">{{ paper.short }} · Research overview</span>
        {% endif %}
      </div>
      <div class="publication-copy">
        <div class="publication-meta"><span class="venue">{{ paper.venue }} {{ paper.year }}</span>{% if paper.highlight %}<span class="recognition">{{ paper.highlight }}</span>{% endif %}</div>
        <h3><a href="{{ paper.paper }}" target="_blank" rel="noopener noreferrer">{{ paper.title }}</a></h3>
        <p class="publication-authors">{{ paper.authors }}</p>
        <p class="publication-description">{{ paper.description }}</p>
        <div class="publication-links"><a href="{{ paper.paper }}" target="_blank" rel="noopener noreferrer" aria-label="Read {{ paper.short | escape }} paper">[paper]</a><a href="{{ paper.project }}" aria-label="{{ paper.short | escape }} project page">[project page]</a>{% if paper.video %}<a href="{{ paper.video }}" target="_blank" rel="noopener" aria-label="Watch full {{ paper.short | escape }} video">[video]</a>{% endif %}</div>
      </div>
    </article>
    {% endfor %}
  </div>
  <details class="all-publications" id="all-publications">
    <summary><span>Full publication list</span><span class="details-hint">All papers & collaborations <b aria-hidden="true">+</b></span></summary>
    <div class="full-publication-content">
      {% capture publications %}{% include_relative includes/pub.md %}{% endcapture %}
      {% assign publication_heading = publications | strip | newline_to_br | split: '<br />' | first %}
      {{ publications | remove_first: publication_heading | markdownify }}
    </div>
  </details>
</section>

<section class="project-invitation" id="projects" aria-labelledby="projects-title"><div><p class="eyebrow">From learning to the real world</p><h2 id="projects-title">Explore the endoscopy projects</h2><p>Demonstrations, full results and open student research opportunities.</p></div><a class="button-link" href="/renlab-endoscopic-projects/">Visit project website ↗</a></section>

<section class="home-section experience-section">
  {% capture experience %}{% include_relative includes/research-experience.md %}{% endcapture %}
  {{ experience | markdownify }}
</section>

<section class="home-section honors-section">
  {% capture honors %}{% include_relative includes/honers.md %}{% endcapture %}
  {{ honors | replace: '# 🎖 Honors and Awards', '## Honors & awards' | markdownify }}
</section>

<section class="home-section background-section" aria-label="Education, service and teaching">
  {% capture background %}{% include_relative includes/others.md %}{% endcapture %}
  {% assign background_blocks = background | split: '## ' %}
  {% for block in background_blocks %}{% assign block_content = block | strip %}{% unless block_content == '' %}
  <div class="background-block">{{ '## ' | append: block_content | replace: '📖 ', '' | replace: '👨‍🔬 ', '' | replace: '👨‍🏫 ', '' | replace: '🗣️ ', '' | markdownify }}</div>
  {% endunless %}{% endfor %}
</section>
