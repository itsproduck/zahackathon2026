# Final Testing Checklist

## Student Journey

- Open the app.
- Confirm the `Student funnel` view is visible.
- Confirm the student funnel has `Optional learning`, `Optional exam and certificates`, and `Hiring programs` subtabs.
- Open at least one course module and confirm the lesson content changes.
- Answer at least one mini quiz beside a mini case.
- Click all three course lesson buttons.
- Confirm progress reaches 100%.
- Open the certificates subtab and confirm multiple certificate cards appear.
- Answer the readiness check with the best answer.
- Confirm the certificate is earned.
- Open the hiring subtab and confirm trainee and full-time program cards appear.
- Select a different hiring position.
- Confirm the application title, motivation prompt, assignment prompt, and button text update.
- Confirm lead source and mini assignment answer fields appear.
- Upload a PDF CV.
- Confirm the application button is available before earning a certificate.
- Submit the application.
- Confirm the app automatically triggers the AI assessment path.
- Confirm the app switches to Candidate Review and inserts a new structured row.

## HR Journey

- Confirm the candidate queue appears.
- Confirm the top metrics show a 30,000-student talent pool.
- Confirm the Product Management Trainee position shows 4,000 CVs.
- Switch to Product Manager and confirm it shows 20 CVs.
- Confirm active hiring position cards appear for multiple roles.
- Confirm Ready, Borderline, and Not Match lanes appear.
- Confirm lane counts change when switching positions.
- Confirm there are realistic sample candidates.
- Confirm the live demo applicant appears.
- Confirm the selected candidate has a readiness score.
- Confirm the selected candidate has a readiness status and confidence.
- Confirm the Lead Profile panel appears.
- Confirm the OA message draft appears.
- Confirm a Ready candidate receives a direct interview invitation.
- Click `Candidate accepts interview`.
- Confirm CV details lets TA expand an available interviewer pack after interview acceptance.
- Confirm the status timeline appears.
- Confirm the CV screening agent panel appears.
- Confirm competency scores appear.
- Confirm the agent shows status reasons.
- Confirm the agent shows a logistics plan.
- Click `Run AI Agent`.
- If running with `npm start` and Workspace Agent credentials, confirm the PM CV Evaluator shows `Workspace Agent triggered`.
- If running without Workspace Agent credentials or by opening `index.html`, confirm the app falls back cleanly and candidate scores remain visible.

## Visual Check

- Check desktop width.
- Check mobile width.
- Confirm there is no sideways scrolling on mobile.
- Confirm text does not overlap.
- Confirm buttons are readable.

## Failure Mode

- Test without any Workspace Agent credentials.
- Confirm the app still works in demo mode.
- Confirm `/api/evaluate-assignment` returns a missing `WORKSPACE_AGENT_ACCESS_TOKEN` error instead of exposing any secret.
