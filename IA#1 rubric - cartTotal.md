# IA#1 rubric - cartTotal

IA#1 — cartTotal with a harness · rubric
CSC13008 · individual assignment · 5% of the course · 100 points

Hand in your repository link, the brief you gave your assistant, this week's `AI-LOG.md`, and `SELF_ASSESSMENT_REPORT.md`.
The specification is on the session 2 slides and in the starter repository: https://github.com/fithcmus/wad-cart-starter.

## What is scored

| # | Criterion | Points |
|---|---|---|
| 1 | cartTotal behaves as specified | 30 |
| 2 | Tests | 20 |
| 3 | The harness | 20 |
| 4 | The brief | 15 |
| 5 | AI-LOG.md | 15 |

### 1. Behaviour — 30 points
Marked by running your code against the specification, not by reading it.

| Points | What it looks like |
|---|---|
| 26–30 | Every rule holds: the worked example returns 467400 as a number, free shipping at the threshold, empty cart returns 0, a negative price or a non-integer quantity throws RangeError. |
| 18–25 | The happy path and the threshold are right; one edge case is wrong or missing. |
| 8–17 | The happy path is right; two or more edge cases are wrong. toFixed returning a string lands here. |
| 0–7 | The worked example does not produce the right total. |

### 2. Tests — 20 points
| Points | What it looks like |
|---|---|
| 17–20 | `npm test` passes and covers the worked example, the empty cart, the free-shipping threshold, and both RangeError cases. Each test can fail for one reason. |
| 11–16 | Tests pass and cover the happy path plus one or two edge cases. |
| 4–10 | One test, or tests that assert the implementation rather than the specification. |
| 0–3 | No tests, or `npm test` fails. |

### 3. The harness — 20 points
| Points | What it looks like |
|---|---|
| 17–20 | A rules file that a stranger could follow — stack, commands, and at least one "never" — plus a working gate (`npm test` and one of format/lint) and CI running on push. |
| 11–16 | Rules file and a working gate; no CI, or CI that does not run. |
| 4–10 | A rules file copied from the slides with nothing project-specific in it. |
| 0–3 | No rules file. |

### 4. The brief — 15 points
| Points | What it looks like |
|---|---|
| 13–15 | Names the files it may touch, the contract, the error cases, and "no dependencies". A stranger could give this brief and get your result. |
| 8–12 | Describes the task and the contract; scope or constraints left open. |
| 3–7 | One sentence: "write cartTotal". |
| 0–2 | No brief submitted. |

### 5. AI-LOG.md — 15 points
| Points | What it looks like |
|---|---|
| 13–15 | Says which tool, what it produced, what you changed and rejected, and what you wrote by hand. Specific enough to check against the diff. |
| 8–12 | Honest but thin — tool and task only. |
| 3–7 | One line, or clearly written after the fact. |
| 0–2 | Missing, or contradicted by the commit history. |

## How to submit
One zip file, named after your student ID and the total you give yourself:
- individual work — `<StudentID>_<total>.zip`, for example `23120001_82.zip`
- group work — `<StudentID1>-<StudentID2>-<StudentID3>_<total>.zip`, IDs in ascending order, for example `23120001-23120042-23120117_75.zip`

The zip must contain `SELF_ASSESSMENT_REPORT.md`: one row per criterion in this rubric, the marks you claim, and evidence pointing at a file, a section, a commit or a test name — plus a short what I did not manage. The total in that table is the number in the file name. Template on Classroom.

A wrong file name costs no marks but delays your result — the grading script matches submissions to the class list by that name.

## Honesty adjustment
Your self-assessment is compared with the mark you actually earn. The gap is your total − the mark, on the same 100-point scale.

| Gap | Adjustment |
|---|---|
| within ±10 | none — this is normal calibration |
| +11 to +20 | −3 |
| +21 to +30 | −6 |
| more than +30 | −10 |
| −21 or worse | −3 — read the rubric before you score yourself down |
| no SELF_ASSESSMENT_REPORT.md | −10, and the file-name total is ignored |

A criterion you claim with no evidence line counts as claimed-and-not-done for this comparison. The adjustment never takes a submission below 0.

Scoring yourself honestly low costs you nothing inside ±10. Claiming marks you did not earn costs more than the marks would have been worth.

## Notes
- Declaring heavy assistant use costs nothing here. Section 5 rewards the account, not a low percentage.
- "It works on my machine" is what CI is for. A green local run with a red CI scores as a red CI.
- You will be asked to explain any line of this in class. That applies to lines an assistant wrote.
