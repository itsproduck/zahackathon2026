# Agent Next Step Build Brief

## Objective

Prepare the current prototype to match the target hackathon scope from the candidate-flow map:

Student learning profile -> Lead Profile -> Talent Readiness Agent -> Ready / Borderline / Not Match -> OA action draft -> HR review.

Do not add backend services yet. Keep the demo static and reliable.

## Agreed Agent Chain

The product should be built around this operating flow:

Student signals -> Lead Profile Agent -> CV + Assignment Agents -> Talent Readiness Agent -> OA Workflow Agent -> HR approves.

### MVP Agent Responsibilities

| Step | Owner | Purpose | Output |
| --- | --- | --- | --- |
| Student Signals | System | Capture course completion, quiz score, engagement, source, motivation, and role target. | Structured signal package. |
| Lead Profile Agent | AI agent | Convert raw student/application signals into one evidence profile. | Lead Profile summary for HR. |
| CV Screening Agent | AI agent | Score CV evidence against the PM competency rubric. | Competency match score and risks. |
| Assignment Evaluation Agent | AI agent | Score case response for problem framing, user evidence, prioritization, measurement, and experiment thinking. | Assignment score and missing evidence. |
| Talent Readiness Agent | AI agent | Decide Ready, Borderline, or Not Match using profile, CV, assignment, and guardrails. | Readiness status, confidence, reasons, and missing evidence. |
| OA Workflow Agent | AI agent | Draft the next operational message and tasks. | Offline test invite, learning reminder, or HR-held feedback draft. |
| HR Approval | Human | Review sensitive outcomes and approve the next action. | Approved OA action or manual review. |

### ChatGPT/OpenAI API Upgrade Path

The current demo keeps these agents deterministic so the hackathon flow is reliable. In production, each agent can become an API-backed service call:

1. Keep CV parsing and OpenAI calls in a private backend.
2. Send each agent only the fields it needs.
3. Require structured JSON output for scores, reasons, missing evidence, and next action.
4. Store every agent result as an audit event.
5. Keep rejection, sensitive feedback, and low-confidence decisions behind HR approval.

## Files To Touch First

- `app.js`
  - Add the readiness status model.
  - Add lead profile generation.
  - Add OA message drafts.
  - Render the new agent decision details.
- `index.html`
  - Add containers only if current HR detail markup needs clearer sections.
- `styles.css`
  - Add status lane, timeline, and message-preview styling.
- `course-content.js`
  - Add assignment prompt only if implementing P2.

## Implementation Order

1. Add a readiness status helper.

```js
function getReadinessStatus(candidate) {
  // Return READY, BORDERLINE, or NOT_MATCH with confidence,
  // missing evidence, humanReviewRequired, nextAction, and oaMessage.
}
```

2. Convert the existing recommendation model.

Current:
- Fast-track to interview
- Send case test
- Nurture to finish certificate
- Hold for later campaign

Target:
- READY: advance to offline test.
- BORDERLINE: recommend more learning or assignment improvement.
- NOT_MATCH: require human review before outcome message.

3. Add a Lead Profile section in candidate detail.

Include:
- Lead source
- Completion
- Quiz score
- Engagement
- CV competency score
- Motivation score
- Assignment score placeholder if not yet built

4. Add OA message preview.

Examples:
- Ready: offline test invite.
- Borderline: learning reminder and next checkpoint.
- Not Match: feedback message after HR review.

5. Add timeline events.

Minimum:
- Lead profile created
- CV screened
- Agent readiness status assigned
- OA message drafted
- HR review needed or next step ready

## Suggested Status Rules

| Status | Rule |
| --- | --- |
| READY | Score >= 85, course completion 100, quiz >= 80, no major CV risk |
| BORDERLINE | Score 70-84, or strong candidate with incomplete evidence |
| NOT_MATCH | Score < 70 after HR review, or severe mismatch |

Guardrails:

- Not Match always requires human review.
- Missing CV lowers confidence, not automatic rejection.
- Incomplete course plus strong CV should be Borderline.
- Any conflicting signal should show medium or low confidence.

## UI Acceptance Criteria

- Candidate queue shows status labels, not only score.
- Candidate detail shows "Lead Profile" before CV scoring.
- Candidate detail shows agent status, confidence, and missing evidence.
- Candidate detail shows OA message preview.
- Candidate detail shows HR next action.
- The existing demo application flow still works from student side to HR side.
- The app still works by opening `index.html` directly.

## Demo Talk Track

"The agent is no longer only ranking. It reads a lead profile created from learning behavior, assessment, assignment, CV, and motivation. Then it prepares the next workflow: Ready goes to offline test, Borderline receives a learning path, and Not Match is flagged for HR review before any message is sent."
