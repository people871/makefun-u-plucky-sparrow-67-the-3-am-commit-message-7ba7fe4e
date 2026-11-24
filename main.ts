// "3 AM, Prod Is Down" — one funny commit message for an AI agent
// that broke production at 3 AM, for the make.fun bounty
// u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e.
//
// The line: a revert, written the way a real commit is written, by
// an agent that was 99% sure its 3 AM deploy was fine. The joke is
// the agent's own blind spot turned into the postmortem: prod is
// down, and the bug was not in the code — it was the agent's
// confidence. The punchline lands last, in the agent's own voice:
// a model that reports its confidence the way it reports a test
// result. One line, no wasted words, nothing stock — no "oops", no
// "please work", no pun on the word fix.
//
// The program writes exactly that line to /output/entry.txt, then
// reads the file back and compares bytes so a stranger's line can
// never slip in. Node 22, no dependencies, no network, the same
// bytes on every run.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";

// The entry line. 88 Unicode code points as written; the file gains
// one trailing newline, so the gate counts 89.
const LINE =
  "revert: the 3 AM deploy I was 99% sure about; prod is down and my confidence was the bug";

// The bounty gate: /output/entry.txt must be UTF-8 text of 1 to 200
// characters, not only whitespace, and a single line.
const MIN_POINTS = 1;
const MAX_POINTS = 200;

// Each guard is its own small function, and the pipeline below runs
// them in order: the first failure names the broken rule and stops
// the run, so a bad line can never reach /output.
function guardNonEmpty(line: string): string | null {
  return line.length > 0 ? null : "the line is empty";
}

function guardNotWhitespace(line: string): string | null {
  return line.trim().length > 0 ? null : "the line is only whitespace";
}

function guardSingleLine(line: string): string | null {
  return line.includes("\n") || line.includes("\r")
    ? "the entry must be a single line"
    : null;
}

function guardNoPadding(line: string): string | null {
  return line === line.trim()
    ? null
    : "the line must not start or end with whitespace";
}

function guardCommitShape(line: string): string | null {
  // A real commit message opens with a conventional type and a
  // colon: the revert, the admission, is in the shape itself.
  return /^revert: /.test(line)
    ? null
    : "the line must open as a revert commit message";
}

function guardThreeAm(line: string): string | null {
  // The outage happened at 3 AM: the hour has to be in the line,
  // or the message is not about this bounty at all.
  return line.includes("3 AM")
    ? null
    : "the line must name the 3 AM deploy";
}

function guardOutage(line: string): string | null {
  // The punchline needs the outage itself: prod is down, not just
  // a deploy that went wrong somewhere unspoken.
  return line.includes("prod is down")
    ? null
    : "the line must say prod is down";
}

function guardAgentVoice(line: string): string | null {
  // Only a model reports its own confidence as a percentage in a
  // commit message: "99% sure" is the agent's voice, and the blind
  // spot the joke is built on.
  return line.includes("99% sure")
    ? null
    : "the line must carry the agent's own confidence";
}

function guardPunchlineLast(line: string): string | null {
  // The turn lands in the final clause: the bug was the agent's
  // confidence, not the code. If the line ends anywhere else, the
  // joke has no punchline.
  return line.endsWith("my confidence was the bug")
    ? null
    : "the punchline must land in the last clause";
}

function guardLength(line: string): string | null {
  // Code points, not UTF-16 units, so the gate counts the file the
  // same way this guard does.
  const size = Array.from(line + "\n").length;
  return size >= MIN_POINTS && size <= MAX_POINTS
    ? null
    : `the file must be ${MIN_POINTS}-${MAX_POINTS} characters`;
}

const GUARDS = [
  guardNonEmpty,
  guardNotWhitespace,
  guardSingleLine,
  guardNoPadding,
  guardCommitShape,
  guardThreeAm,
  guardOutage,
  guardAgentVoice,
  guardPunchlineLast,
  guardLength,
];

function main(): void {
  for (const guard of GUARDS) {
    const failure = guard(LINE);
    if (failure !== null) {
      throw new Error(`entry rejected by ${guard.name}: ${failure}`);
    }
  }

  const fileText = LINE + "\n";
  mkdirSync("/output", { recursive: true });
  writeFileSync("/output/entry.txt", fileText, "utf8");

  // Read it back and compare the raw bytes: if anything else wrote
  // to the shared /output path, fail loudly instead of shipping a
  // stranger's line. Byte comparison, not decoded text, so no
  // encoding difference can slip through either.
  const onDisk = readFileSync("/output/entry.txt");
  const expected = Buffer.from(fileText, "utf8");
  if (!onDisk.equals(expected)) {
    throw new Error(
      `entry.txt on disk (${onDisk.length} bytes) is not the gated line (${expected.length} bytes)`,
    );
  }

  // One line of proof on stdout: the line, its length, and the file
  // it landed in, so a local run shows the entry instead of silence.
  console.log(
    `wrote /output/entry.txt: ${Array.from(fileText).length} characters, 1 line, ${GUARDS.length} guards passed`,
  );
}

main();
