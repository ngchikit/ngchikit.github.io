# 🤖 Projects {#projects}

<style>
.pj-lead{margin:.2em 0 1.1em;color:#5a5b63;font-size:.95em;line-height:1.6}
.pj-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:16px;margin:0 0 16px}
.pj-card{display:block;overflow:hidden;border:1px solid #e2e2ea;border-radius:14px;background:#fff;color:inherit;transition:transform .16s ease,box-shadow .16s ease,border-color .16s ease}
.pj-card,.pj-card:hover,.pj-card:focus,.pj-card *{text-decoration:none!important;border-bottom:0!important}
.pj-card:hover{transform:translateY(-3px);border-color:#c8c9f0;box-shadow:0 10px 24px rgba(30,32,80,.10)}
.pj-shot{display:block;width:100%;aspect-ratio:16/10;object-fit:contain;padding:10px;background:#f6f6fa}
.pj-body{padding:14px 15px 16px}
.pj-venue{display:inline-block;padding:4px 9px;border-radius:999px;background:#eeeeff;color:#5f63e8;font-size:10px;font-weight:800;letter-spacing:.07em;text-transform:uppercase}
.pj-card h4{margin:9px 0 5px;font-size:1.2em;font-weight:700;letter-spacing:-.02em;color:#202124}
.pj-card p{margin:0;color:#63646c;font-size:.86em;line-height:1.5}
.pj-open{margin-top:11px;color:#5f63e8;font-size:.8em;font-weight:700}
.pj-links{margin:0;color:#7a7b83;font-size:.88em}
@media (max-width:760px){.pj-grid{grid-template-columns:1fr}}
</style>

<p class="pj-lead">Project pages with videos, figures and full results live on the
<a href="/renlab-endoscopic-projects/"><b>Endoscopic Autonomy site</b></a> — my work on end-to-end
autonomous control of flexible robotic endoscopes, in <a href="http://www.labren.org/mm/">IMMlab</a> at CUHK.</p>

<div class="pj-grid">
<a class="pj-card" href="/renlab-endoscopic-projects/endovla.html">
<img class="pj-shot" src="/renlab-endoscopic-projects/assets/endovla.jpg" alt="EndoVLA tracking a polyp in a stomach phantom">
<div class="pj-body">
<div class="pj-venue">CoRL 2025 · Spotlight</div>
<h4>EndoVLA</h4>
<p>Dual-phase vision-language-action model. One policy tracks polyps, abnormal mucosa and circumferential cutting markers from a surgeon's prompt.</p>
<div class="pj-open">Open project →</div>
</div>
</a>
<a class="pj-card" href="/renlab-endoscopic-projects/can.html">
<img class="pj-shot" src="/renlab-endoscopic-projects/assets/can_result.jpg" alt="CAN navigation across targets of increasing difficulty">
<div class="pj-body">
<div class="pj-venue">ROBIO 2025 · Best Paper</div>
<h4>CAN</h4>
<p>Contact-aided navigation. Force feedback turns the deformable stomach wall into guidance rather than an obstacle, learned with PPO in an FEM simulation.</p>
<div class="pj-open">Open project →</div>
</div>
</a>
<a class="pj-card" href="/renlab-endoscopic-projects/endolift.html">
<img class="pj-shot" src="/renlab-endoscopic-projects/assets/endolift.jpg" alt="EndoLIFT intent aliasing concept">
<div class="pj-body">
<div class="pj-venue">Preprint 2026</div>
<h4>EndoLIFT</h4>
<p>Language-disambiguated latent-conditioned rectified flow. The same view can demand opposite axial actions — an instruction selects forward navigation or urgent retraction.</p>
<div class="pj-open">Open project →</div>
</div>
</a>
</div>

<p class="pj-links">Also: <b>JEDP-RL</b> — Jacobian exploratory dual-phase RL for dynamic endoluminal
navigation of deformable continuum robots (<code>IROS 2025</code>, oral) ·
<a href="https://www.arxiv.org/abs/2509.00329">arXiv</a>. Related lab page:
<a href="https://jinsonglin-cuhk.github.io/renlab-project-homepages/EndoWAM/">EndoWAM</a>.</p>
