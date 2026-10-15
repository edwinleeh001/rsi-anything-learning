# RSI-Anything evidence and original-figure audit

Checked on 2026-10-15 (Asia/Hong_Kong). Scope: arXiv v1 paper evidence, original figure assets, table transcription and read-only inspection of the authors' public repository. No model training or paper benchmark was rerun.

## Authoritative paper sources

- [Abstract and version record](https://arxiv.org/abs/2610.13912)
- [HTML v1](https://arxiv.org/html/2610.13912v1)
- [PDF v1](https://arxiv.org/pdf/2610.13912v1)
- Local raw HTML: `research/original.html`.
- Poppler layout text from the complete PDF: `research/paper.txt`.
- Full PDF: `dist/sources/rsi-anything-v1.pdf` (27 pages).
- Original HTML image URLs and verbatim source captions are recorded in `research/figure-sources.json`. They are source material; the bilingual website captions and reading guides are independently worded educational syntheses.

The arXiv version record is v1, submitted 9 October 2026. The PDF also has a 2026-10-12 header. Website source citations should identify v1 and avoid inferring a separate submission version from that header.

## Original figures

All seven images came from the paper. Figure 1 keeps the large original PNG. The HTML versions of figures 2–7 were small, so the delivered assets render and crop the same original PDF figures at 300 dpi. No labels, marks, plotted data or visual elements were changed. Captions are excluded from the crop because bilingual explanatory text is supplied in the page.

| Figure | PDF page | Delivered asset | Dimensions | Material |
|---|---:|---|---|---|
| 1 | 2 | `dist/media/originals/figure-1.png` | 3884 × 1618 | Original HTML PNG |
| 2 | 4 | `dist/media/originals/figure-2.png` | 1713 × 1925 | Original PDF crop |
| 3 | 12 | `dist/media/originals/figure-3.png` | 1713 × 1971 | Original PDF crop |
| 4 | 14 | `dist/media/originals/figure-4.png` | 1713 × 1750 | Original PDF crop |
| 5 | 15 | `dist/media/originals/figure-5.png` | 1713 × 1475 | Original PDF crop |
| 6 | 17 | `dist/media/originals/figure-6.png` | 1713 × 2029 | Original PDF crop |
| 7 | 18 | `dist/media/originals/figure-7.png` | 1713 × 1338 | Original PDF crop |

Visual QA: original paper pages and a contact sheet of all delivered crops were inspected. All panels, titles and plot labels fit. PDF page 13 (Table 2) and page 21 (Table 4) were visually inspected after rendering. Source PNG files were verified with Pillow. `research/pdf-qa/crop-manifest.json` records PDF-point crop boxes; small downloaded HTML versions remain in that QA directory for source comparison.

The paper's arXiv distribution license is the arXiv perpetual non-exclusive license. Its figures remain attributed to the paper and its authors. The authors' code license does not automatically relabel the paper figures. Figure 7 itself credits adaptation from Figure 1 of the cited immune-world-model paper, arXiv:2609.14709.

## Table 2 transcription (PDF page 13)

Shared ReasonFlux-Coder-7B, four repair candidates per round, at most three feedback rounds; 200 CodeContests tasks × three seeds = 600 task–seed evaluations. Online tests supply repair feedback; hidden tests determine final success.

| Selection method | Hidden all-pass | Online suite calls/task |
|---|---:|---:|
| Random-K | 26.0% | 3.72 |
| Capacity-matched static verifier | 26.3% | 3.72 |
| RSI-Anything, fixed world model (CURE-WM-Lite) | 29.2% | 3.71 |
| RSI-Anything, world-model adaptation | 31.2% | 3.72 |

Figure 3c compares static verifier with fixed world model: ranking accuracy 66.5% → 72.8%; five-class Brier 0.488 → 0.358. It does not provide an adaptive-model Brier score. The paired success gain fixed WM vs static verifier is +2.83 percentage points, 95% interval [+0.17, +5.50]. Subtracting rounded table percentages gives 2.9 points, so the exact paired estimate and the rounded difference should not be silently interchanged.

The similar suite-call counts control external feedback usage. They do not establish identical total compute, training cost or latency.

## Laboratory progression (PDF pages 14–15)

V1–V5 mean F200 Level-2 Final Scores are 21.80%, 38.03%, 41.99%, 44.56%, 46.01%. Final minus initial = 24.21 percentage points. This is a sequence of five versions of one 4B policy, evaluated on the same 200-task benchmark. Spacing on the plot is schematic development order, not measured training time. Final Score combines action-sequence similarity and parameter accuracy; it is not physical-execution success.

The Actor–Simulator–Selector reference is 45.32%; the last version differs by 0.69 percentage points. Table 3 L1 values are 0.700 for RSI-Anything and 0.665 for the reference. No uncertainty interval for the 0.69-point mean difference is supplied in this paper, so do not describe it as statistically significant.

## Table 4 update-scope mapping (PDF page 21)

| Domain | Policy/workflow scope | World model | Observations/evaluation |
|---|---|---|---|
| Code | ReasonFlux-Coder-7B fixed | W1 fixed or feedback-adapted; Qwen2.5-Coder-3B-Instruct + LoRA + JEPA-Anything design; five-class execution probabilities | Execution tests; hidden final success and online calls |
| GUI | Action policy updated from interaction | GUI action-consequence predictor also updated | Task outcomes; completion, actions, repeated clicks, submissions |
| Lab | Five consecutive versions of the same 4B planning policy | Protocol consequence predictor | Development feedback; L1 accuracy and F200 L2 planning score |
| Chemistry | Measured yields guide next condition selection | ReactionT5–JEPA-Anything yield distribution | GC/LC–MS yields; best-so-far at matched counts |
| Immune | Workflow evolution and predictor construction, then downstream self-correcting analysis | Resulting predictor frozen during downstream analysis | Measured perturbation development evidence; withheld interventions/contexts for forecast assessment |

The shared framework permits asynchronous component updates. This table is essential to avoid implying that every domain jointly updated policy and world-model parameters at every round.

## GUI units and attribution

Paper Figure 4 / §3.2: selected-controller success 51% → 79% → 99%; mean actions 5.30 → 2.93 → 3.21; repeated clicks 237 → 2 → 0; incorrect-submission episodes 9 → 21 → 1. The world-based control success sequence is 49% → 96% → 98%.

OSWorld reports relative success-rate improvement, not percentage-point improvement: RLAnything +12.3% vs initial agent; RSI-Anything +18.4% vs initial agent and +5.5% vs RLAnything. Formula: 100 × (method success/reference success − 1)%. An absolute endpoint is not supplied here.

[Official GUI results](https://github.com/Gen-Verse/RSI-Anything/blob/main/tasks/gui/docs/RESULTS.md), read on 2026-10-15, adds implementation detail beyond the paper: the development-selected controller has alpha=0 and follows policy ranking. Pure world-based control instead ranks the same policy candidates by model values. Thus the 99% selected endpoint is not an isolated causal measurement of the contribution of world-model ranking. The common framework and the particular selected-controller evaluation should be distinguished.

## Chemistry endpoints and implementation scope

Paper Figure 6 / §3.4 reports two separate protocols:

- GC, 20 observations: 93.0% vs 87.5%, a 5.5-percentage-point difference.
- Flow LC–MS, 40 observations: 96.15% mean best observed yield vs 82.16%, a 13.99-percentage-point difference.

The best-so-far curve is monotonic by definition, not a promise that each successive experiment is better. Do not splice the two screens into one trajectory or average their endpoints.

[Official reaction-optimization guide](https://github.com/Gen-Verse/RSI-Anything/blob/main/tasks/reaction_optimization/README.md), read on 2026-10-15, specifies the released flow evaluation more narrowly: sequential replay of measured yields from one fixed pool of 321 conditions, 100 runs with seeds 4001–4100, eight initial observations counted within the total 40. Predictions remain frozen; feedback changes expected-improvement selection and removes observed candidates. This is reproducible sequential selection over the released pool. It is not evidence that the published inference loop performs a fresh wet-lab experiment or neural weight adaptation after every observation.

## Official repository and reproducibility

The paper itself links [Gen-Verse/RSI-Anything](https://github.com/Gen-Verse/RSI-Anything) and [Hugging Face resources](https://huggingface.co/datasets/Gen-Verse/RSI-Anything). The GitHub repository is available and supplies implementation directories for code repair, GUI, laboratory planning and reaction optimization, with shared CLI, workflow recipes, tests and asset guides. Project-owned code is Apache-2.0; model/data/component terms are separately identified. The Hugging Face URL is a dataset/resource repository even though the paper's link label says Models.

[Code reproduction guide](https://github.com/Gen-Verse/RSI-Anything/blob/main/docs/reproduction.en.md), read on 2026-10-15:

- Linux + Python 3.10; isolated program judging uses runuser, unshare and the nobody account. The recorded workflow uses GPU inference/training and substantial model assets.
- `recorded` evaluation fixes recorded programs, candidate inputs and public feedback, then recomputes scores and decisions before hidden judging. `fresh` resamples later candidates and reruns public tests.
- Adaptation is documented as a four-stage training chain on recorded transitions. Final benchmark evaluation does not perform optimizer updates. A conceptual online adaptation demo on this site must be labeled as synthetic pedagogy, rather than a literal replay of the released final evaluation.
- Packaging validation reports 600 decisions and hidden episodes, matched training reconstruction hashes, and three-step training smoke checks. Full-epoch retraining was not run during packaging. Its geometry checks for strict orthogonality/factor independence did not pass on reference checkpoints; do not claim experimentally proven exact OPF factor independence based on the released checkpoints.

This learning artifact downloads only the paper and figures and inspects these guides. Availability of commands/assets is not a claim that we independently reproduced the experiments. The classroom demos illustrate decisions with small synthetic data and do not run the authors' models.

## Central interpretation limits

Paper §5 explicitly says joint multiround evaluation is needed to establish sustained mutual improvement of policy and world model within a single task. The existing results separately support predictive selection, predictor adaptation, policy progression and budgeted feedback search in their settings. They do not establish unrestricted self-improvement.

Laboratory results assess protocol-aligned plans and require equipment/workflow execution evaluation. Chemistry covers the reported screens. The immune-science nomination combining SIRPα inhibition and IL-36γ-axis modulation is a hypothesis for experimental testing; it is not a validated therapy.

The site's bilingual explanations, toy numbers, diagrams and scripts should explicitly distinguish (1) paper-reported observations, (2) educational synthesis and (3) proposed future evaluation. The machine-readable `dist/assets/evidence.json` contains the figure-reading text, key tables and limits for this purpose.
