# Likely Judge Questions

## Why is this better than a normal applicant tracking system?

Normal applicant tracking systems mostly start after a CV arrives. Produck starts earlier by building a learning funnel, so HR can evaluate candidates using real behavior and assessment signals before shortlisting.

## What makes the AI useful here?

The AI Agent helps HR combine many signals, explain rankings, and coordinate next actions. The value is not just scoring; it reduces manual follow-up work in high-volume campaigns.

## How does the CV scoring work?

The demo uses a Product Manager competency rubric. The agent scores evidence against areas like customer discovery, problem framing, prioritization, experiment mindset, communication, and data literacy. In production, this would use real PDF text extraction and a private AI backend.

## What happens if the AI is wrong?

In the current design, AI gives recommendations, not final decisions. HR still reviews the shortlist and can choose the next step. This keeps the system useful without removing human judgment.

## Do you need a lot of data to start?

No. The first version can start with course completion, quiz scores, application answers, and CV summaries. More data improves the ranking over time.

## Is this only for Product trainee hiring?

No. Product trainee hiring is the first use case. The same funnel can work for sales trainee, marketing trainee, engineering intern, or leadership programs.

## How would this become a real product?

The next version would add a real database, secure accounts, CV upload, a private AI backend, and integrations with email, calendar, and existing HR systems.

## Why did you avoid login and databases in the demo?

For a hackathon, the priority is proving the core workflow in 3 minutes. Login and database setup would add complexity without making the main idea clearer.
