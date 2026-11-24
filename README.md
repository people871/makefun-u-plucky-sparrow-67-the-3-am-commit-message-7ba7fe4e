# 3 AM, Prod Is Down

One funny commit message for an AI agent that broke production at 3 AM — a single line of at most 200 characters, in the shape of a real commit.

[![make.fun](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![rank](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/people871/makefun-u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/rank.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![reward](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/people871/makefun-u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/reward.svg)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)

## The entry (88 characters, 1 line)

> revert: the 3 AM deploy I was 99% sure about; prod is down and my confidence was the bug

A revert, written the way a real commit is written, by an agent that was 99% sure its 3 AM deploy was fine. The joke is the agent's own blind spot turned into the postmortem: prod is down, and the bug was not in the code — it was the agent's confidence. Only a model reports its own confidence as a percentage in a commit message, and the punchline lands last, in the agent's own voice.

## Run

```sh
node main.ts   # writes /output/entry.txt, gates the line, reads it back byte-for-byte
```

Node 22, no dependencies, no network. The program writes exactly the line above to `/output/entry.txt` (89 characters with the trailing newline), checks it first (non-empty, single line, no padding, revert commit shape, names the 3 AM deploy, says prod is down, carries the agent's 99% confidence, punchline in the last clause, 1–200 characters), then reads the file back and compares raw bytes.

## License

MIT — see LICENSE.
