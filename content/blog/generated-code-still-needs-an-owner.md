---
title: "Generated code still needs an owner"
date: "2026-11-03"
tags: ["Development"]
excerpt: "\"The AI wrote it, and the tests pass.\" More and more pull requests arrive with a sentence like this somewhere behind them. The code compiles, the feature works, and the ticket moves to done. It feels…"
cover: "/images/b1f92cde43e7.jpg"
hero: "/images/18f9bbcee1e0.jpg"
readingTime: 2
---

"The AI wrote it, and the tests pass." More and more pull requests arrive with a sentence like this somewhere behind them. The code compiles, the feature works, and the ticket moves to done. It feels like the work is finished.

In reality, a different kind of work has only just started.

Code has always had two lives. The first is the moment it's written. The second is every moment after that, when someone has to read it, change it, debug it at an inconvenient hour, or explain it to a new colleague. Most of the cost of software lives in that second life, and generating code faster does nothing to shorten it.

When developers write a function by hand, understanding comes almost for free. They made the decisions, weighed the trade-offs, and know why the edge case is handled the way it is. When the same function is generated, the decisions were still made, just not by anyone on the team. If nobody takes the time to understand them, the codebase slowly fills with logic that works but belongs to no one.

That is where the trouble begins. A bug appears in a module nobody can explain. A small change takes a day because the structure follows patterns the team never chose. Reviews turn into a glance at a large diff because careful reading feels slow next to the tool that produced it. Over time, the team owns a system it doesn't fully understand.

Good teams treat generated code like any other contribution. Someone puts their name on it, and that name means something. The developer who opens the pull request should be able to explain every line as if they had written it themselves, including why it is there and what would break without it. If they cannot, the code is not ready, no matter how green the pipeline looks.

This also changes what a good review looks like. The question is no longer only "does this work?" but "do we understand this, and would we have built it this way?" Generated code tends to look confident and complete, which makes it easy to accept. It's also often more verbose, more generic, and less aligned with the conventions a team has agreed on. Reviewers who notice that are not being slow. They are protecting the second life of the code.

None of this means we should avoid the tools. Used well, they remove a lot of repetitive work and give developers more time for the parts that need real thought. For boilerplate, tests, or a first draft of something unfamiliar, they can be a good starting point. What matters isn't where the code comes from, but whether someone on the team understands it well enough to take responsibility for it.

If the person who merged it cannot explain it, who can? Code doesn't need an author to exist. It needs an owner to last.
