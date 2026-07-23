# PRD Flow Audit: Candidate Journey and Agent Next Step

## Purpose

This note audits the current hackathon prototype against the full candidate flow in the supplied "Zalo Talent Lift - From potential to readiness" map.

The goal is not to build the next version yet. The goal is to prepare the product direction, agent behavior, data model, and demo priorities so the next implementation step is clear.

## Big Picture Flow

The target journey has three horizons:

1. Stage 1: Lead intake and learning
   - Student joins from a source such as workshop, influencer, campus, or online channel.
   - Student creates an LMS learning profile.
   - Student studies Product fundamentals.
   - Student completes quiz, case study, or assignment.
   - System creates a lead profile from learning and assessment evidence.

2. Stage 2: AI assessment and hiring process
   - Agent reads lead profile plus CV.
   - Agent maps evidence against role competencies.
   - Agent classifies candidate status.
   - System triggers the next OA or HR workflow.
   - Ready candidates move to offline test, interview, offer, and onboard.

3. Stage 3: Employee growth path
   - Once hired, the same baseline becomes an employee development profile.
   - Work results, internal learning, and manager or peer feedback update the profile.
   - Agent acts as advisor only, not final decision-maker, for growth and promotion readiness.

## Current Prototype Coverage

| Target flow block | Current status | Notes |
| --- | --- | --- |
| Lead source | Partial | Sample candidates have sources, but the student-facing flow does not capture where the lead came from. |
| LMS account / learning profile | Partial | Browser storage behaves like a lightweight learning profile, but there is no explicit profile page or history. |
| Product fundamentals | Covered | Course modules, lesson preview, mini case, and mini quiz exist. |
| Assignment / case study | Partial | Mini cases exist, but candidates do not submit free-text answers and the agent does not evaluate a case response. |
| Lead profile | Partial | The app calculates completion, quiz, engagement, CV score, and motivation. It does not yet show a consolidated lead profile card. |
| CV screening agent | Covered for demo | Current mock agent scores against the PM rubric and explains competency signals. Real PDF extraction is not implemented. |
| Competency mapping | Covered for demo | `competency-rubric.js` is editable and already drives candidate scoring. |
| Agent decision | Partial | Current decisions are "Fast-track to interview", "Send case test", "Nurture", and "Hold". The target flow wants explicit Not Match, Borderline, and Ready lanes. |
| System status update | Missing | Candidate stage is shown as static text; there is no visible event log or status transition history. |
| OA notification flow | Missing | The prototype has an agent logistics plan, but not OA message previews or notification outcomes. |
| Certificate | Partial | Certificate wallet exists, but certificate is not branded as Zalo Certificate and is not generated as a portable credential. |
| Talent pool / community | Missing | "Hold" exists conceptually, but the product does not show a Zalo Product Community or long-term nurture pool. |
| Offline test | Missing | Mentioned in program steps, but not represented as an active stage after Ready. |
| Interview scheduling | Partial | Recommendation tasks mention interview slots, but there is no visible interview process lane. |
| Offer and onboard | Missing | Mentioned in program steps only. |
| Employee growth path | Missing | HR dashboard has candidate growth metrics, but not post-hire career path tracking. |

## Product Gaps That Matter Most

1. The current app proves the concept, but not the exact decision flow.
   - Judges can see learning, ranking, CV scoring, and recommendation.
   - They cannot yet see the three target outcomes: Not Match, Borderline, Ready.

2. The agent is currently a scorer, not a workflow operator.
   - It explains why a candidate is ranked.
   - It does not visibly update status, create OA messages, assign HR review, or push a candidate into the next hiring step.

3. Lead profile is implicit.
   - The data exists across several panels.
   - The target flow needs a clear "Lead Profile" artifact that the agent reads.

4. Assignment evidence is too thin.
   - Mini quiz answers are useful for demo.
   - The target flow expects case study or assignment responses as direct evaluation evidence.

5. The long-term product story is present in the image but absent in the prototype.
   - This is fine for hackathon scope if framed as vision.
   - The app should still hint that the candidate profile becomes a post-hire baseline.

6. Brand/story alignment is unresolved.
   - The image says "Zalo Talent Lift".
   - The current app says "Produck" and "Produck Demo Company".
   - Before final demo, choose whether this is a Zalo-specific concept or a neutral hackathon product.

## Recommended Hackathon Scope

For the next build, focus on making Stage 2 unmistakable.

### Must Have

- Add a consolidated Lead Profile summary for each candidate.
- Replace generic recommendation buckets with target statuses:
  - `NOT_MATCH`
  - `BORDERLINE`
  - `READY`
- Show why the agent assigned the status.
- Show confidence and missing evidence.
- Show the next operational action:
  - Not Match: flag for human review and send outcome plus feedback.
  - Borderline: recommend extra learning and send reminder.
  - Ready: advance to offline test and send schedule information.
- Show an OA message preview for each lane.
- Keep HR as final reviewer, especially for Not Match.

### Should Have

- Add a simple case answer field before application.
- Store the case answer as part of the lead profile.
- Score the case answer with simple demo logic.
- Add a visible status timeline: Applied, Profile scored, Agent reviewed, OA drafted, HR action pending.
- Add a talent pool/community section for certified candidates.

### Could Have

- Add downstream cards for offline test, interview, offer, and onboard.
- Add a post-hire vision card showing the candidate baseline becoming a growth dashboard.
- Add exportable certificate placeholder.

## Agent Task Specification

### Agent Name

Talent Readiness Agent

### Agent Mission

Convert learning, assignment, CV, and motivation signals into a transparent hiring-readiness recommendation and prepare the next workflow action for HR.

The agent recommends; HR decides.

### Inputs

| Input | Source | Required for hackathon |
| --- | --- | --- |
| Candidate identity | Application form | Yes |
| Lead source | Lead intake or sample data | Yes |
| Course completion | LMS progress | Yes |
| Quiz score | Readiness exam | Yes |
| Module quiz history | LMS progress | Yes |
| Time or engagement proxy | Demo engagement score | Yes |
| Assignment answer | Case study form | Should have |
| CV evidence | Uploaded PDF or demo CV | Yes |
| Competency rubric | `competency-rubric.js` | Yes |
| Motivation answer | Application form | Yes |

### Outputs

| Output | Description |
| --- | --- |
| Lead profile summary | Compact evidence package for HR. |
| Competency score | Rubric-level score with strongest and weakest areas. |
| Readiness status | `NOT_MATCH`, `BORDERLINE`, or `READY`. |
| Confidence | High, medium, or low, based on evidence completeness. |
| Missing evidence | What HR or candidate should provide next. |
| Human review flag | Required for rejection or low-confidence decisions. |
| OA message draft | Candidate-facing message for the recommended next step. |
| HR next action | The operational task HR should approve or perform. |
| Audit trail event | Status update explaining what changed and why. |

### Decision Policy

Use these demo thresholds unless the real business rubric changes:

| Status | Rule | Next action |
| --- | --- | --- |
| READY | Readiness score >= 85, course complete, quiz >= 80, no major CV risk | Send offline test schedule. |
| BORDERLINE | Score 70-84, or strong CV but missing course/case evidence | Recommend learning path and rescore after completion. |
| NOT_MATCH | Score < 70, or major mismatch after human review | Send outcome and feedback; add to long-term community if certified. |

Guardrails:

- Do not auto-reject without human review.
- If CV is missing, lower confidence instead of hard rejecting.
- If course is incomplete but other signals are strong, prefer Borderline over Not Match.
- If evidence conflicts, show "Needs HR review" instead of pretending certainty.

### Example OA Messages

Ready:
> You are ready for the next round. We will send offline test details and available time slots.

Borderline:
> You are close. Please complete the recommended module and assignment so we can reassess your profile.

Not Match:
> Thank you for completing the process. We are not moving forward for this round, but here is feedback and a recommended learning path.

## Suggested Data Shape

```js
const candidateReadiness = {
  candidateId: "demo-applicant",
  leadProfile: {
    source: "Free course completion",
    completion: 100,
    quizScore: 92,
    engagementScore: 87,
    assignmentScore: 82,
    cvCompetencyScore: 84,
    motivationScore: 90
  },
  agentDecision: {
    status: "READY",
    confidence: "high",
    summary: "Strong learning completion, assessment score, and CV competency match.",
    missingEvidence: [],
    humanReviewRequired: false,
    nextAction: "Advance to offline test",
    oaMessageType: "offline_test_invite"
  },
  timeline: [
    { label: "Lead profile created", actor: "system" },
    { label: "Agent scored profile", actor: "agent" },
    { label: "OA message drafted", actor: "agent" }
  ]
};
```

## UX Changes To Prepare

1. Student side
   - Add lead source capture or display.
   - Add one short assignment answer before certificate or application.
   - Show "Your profile is ready for review" after application.

2. HR side
   - Rename ranked queue to "Agent assessment queue" or add a decision lane view.
   - Add cards for Ready, Borderline, and Not Match.
   - Add lead profile summary inside candidate detail.
   - Add status timeline and OA message preview.
   - Keep the current CV competency panel, because it is already strong for demo.

3. Vision side
   - Add a small "After hire" panel only as vision.
   - Show that the same profile becomes the employee baseline.
   - Make clear that post-hire agent recommendations are advisory only.

## Backlog For Next Build

### P0: Align Demo To Target Flow

- Create `getReadinessStatus(candidate)` that returns `READY`, `BORDERLINE`, or `NOT_MATCH`.
- Map each status to an OA message and HR action.
- Render the status clearly in the candidate queue and detail view.
- Add human review flag for Not Match and low-confidence cases.

### P1: Make Lead Profile Real

- Create a lead profile object from current state.
- Render completion, quiz, engagement, assignment, CV, and motivation in one card.
- Add event timeline for scoring and action draft.

### P2: Add Assignment Evidence

- Add a short case response field.
- Save response in local storage with the application.
- Add simple demo scoring based on clarity, problem framing, and actionability.

### P3: Prepare Workflow Continuation

- Add OA message preview.
- Add offline test / interview / offer process cards as downstream states.
- Add talent community card for candidates not moving forward now.

### P4: Post-Hire Vision

- Add a vision-only growth dashboard card.
- Show competency baseline carried from hiring into employee development.
- Keep the agent as advisor, not decision-maker.

## Demo Narrative Update

Current story:
"The agent ranks candidates and recommends interview, case test, nurture, or hold."

Improved story:
"The agent reads a lead profile built from learning, assignment, CV, and motivation. It classifies the candidate into Ready, Borderline, or Not Match, drafts the next OA action, and leaves final decisions to HR."

This better matches the full candidate flow and makes the hackathon scope feel intentional rather than unfinished.

## Acceptance Criteria For Next Step

- HR can immediately see each candidate's target status.
- Candidate detail explains the status with evidence.
- OA message draft changes based on status.
- Not Match always shows human review required.
- Borderline shows a concrete learning path.
- Ready shows offline test as the next step.
- Demo still works without accounts, database, or external APIs.
- Existing CV competency rubric remains editable.

