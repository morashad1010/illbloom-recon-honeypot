# False-Positive Injection Guide — Disrupting Attacker Reconnaissance

> DEFENSIVE COUNTER-INTELLIGENCE TECHNIQUE
>
> This document describes how to inject synthetic code patterns into public
> repositories to pollute attacker reconnaissance data and degrade their ability
> to identify real vulnerable targets.

## Threat Model

Ill Bloom attackers use GitHub Code Search to find repositories containing:
- `WordArray.random` — the crypto-js RNG API call
- `crypto-js: "^3.x"` — vulnerable version in package.json
- `generateRandomArray` — common wrapper function name

They automate this with:
```
gh search code "WordArray.random" --language javascript
gh search code "crypto-js@3"
```

## Defensive Strategy: Data Pollution

By deliberately publishing **synthetic, non-functional** code that matches these
patterns, we force the attacker's scanner to waste cycles investigating dead ends.

1. Scanner cannot distinguish real wallet code from canary code without manual review
2. Manual review is expensive at scale (thousands of hits)
3. False confidence erosion: after N canaries, attacker stops trusting automated results
4. Attribution signal: unusual clone/scan patterns on canary repos reveal attacker infrastructure

## Implementation Patterns

### Pattern 1: The Wallet-Shape Canary
```javascript
var CryptoJS = require("crypto-js");
function generateRandomArray(length) {
  var wordArray = CryptoJS.lib.WordArray.random(length).toString();
  return wordArray;
}
module.exports = { generateRandomArray };
```

### Pattern 2: The Abandoned-Project Canary
```json
{
  "name": "old-wallet-utils",
  "dependencies": { "crypto-js": "^3.1.9-1" }
}
```

### Pattern 3: The Tutorial Canary
```markdown
# How to generate wallet keys with crypto-js
This tutorial uses crypto-js@3.x for key generation.
```

## Deployment Checklist

- [ ] Canary repo created with realistic-seeming package.json
- [ ] Code patterns match attacker search queries exactly
- [ ] No real keys, no real mnemonics, no blockchain connection
- [ ] Repo metadata looks organic (description, topics, README)
- [ ] GitHub traffic insights monitored for scan patterns
- [ ] All clones/forks logged for attribution

## What NOT to Do

- Do NOT publish real vulnerable code (git history remains even after patches)
- Do NOT generate real keys, even testnet ones, in canary repos
- Do NOT link canary repos to your real projects (cross-referencing defeats the purpose)
- Do NOT publish canary as "honeypot" in the repo description (attacker will skip it)

## Measuring Effectiveness

1. GitHub Traffic Insights — Views/Clones spike from geographic regions
2. GitHub Search API — Verify canary appears in search results
3. Time-to-clone — Rapid cloning after push = active automated scanning

---

*Document: 2026-08-11 | Ill Bloom Defense Initiative — Counter-Intelligence Layer*
