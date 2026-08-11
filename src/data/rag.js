import investments from "./data/investments.json" with { type: "json" };

const STOP_WORDS = new Set([
  "what", "which", "where", "when", "how", "is", "are", "the", "a", "an",
  "and", "or", "for", "of", "to", "in", "on", "with", "me", "show", "tell",
  "about", "does", "do", "can", "you", "please", "investment", "investments",
  "fund", "available", "there", "any", "have", "has", "from", "this", "that"
]);

function normalize(text) {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\u0600-\u06ff\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean);
}

function searchableText(item) {
  return [
    item.name,
    item.type,
    item.sector,
    item.risk,
    item.duration,
    item.description,
    `${item.minimumInvestment}`,
    `${item.expectedReturn}%`
  ].join(" ").toLowerCase();
}

function scoreInvestment(query, item) {
  const tokens = normalize(query).filter(t => !STOP_WORDS.has(t) && t.length > 1);
  const text = searchableText(item);

  if (!tokens.length) return 0;

  let score = 0;

  for (const token of tokens) {
    if (text.includes(token)) score += 1;
  }

  const name = item.name.toLowerCase();

  // Stronger matches for exact investment names and important fields.
  for (const token of tokens) {
    if (name.includes(token)) score += 2;
    if (item.type.toLowerCase().includes(token)) score += 1;
    if (item.risk.toLowerCase() === token) score += 2;
  }

  return score / Math.max(tokens.length, 1);
}

export function retrieveInvestments(query, limit = 5) {
  const scored = investments
    .map(item => ({ item, score: scoreInvestment(query, item) }))
    .sort((a, b) => b.score - a.score);

  const relevant = scored.filter(x => x.score > 0).slice(0, limit);

  return {
    items: relevant.map(x => x.item),
    topScore: relevant[0]?.score ?? 0
  };
}

export function getAllInvestments() {
  return investments;
}
