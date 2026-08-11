/**
 * Confidence / anti-hallucination test runner.
 *
 * Run:
 *   node src/utils/testConfidence.js
 *
 * The runner reads public/data.json, builds the grounded dataset, tests
 * exact/paraphrased/partial/out-of-domain queries, and reports the score
 * distribution. It never fabricates test facts; in-domain queries are derived
 * from the loaded data.
 */

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  buildGroundedDataset,
  getDatasetStats
} from '../data/groundedDataset.js';
import {
  retrieve,
  CONFIDENCE_THRESHOLD,
  isGroundedGeneration
} from './bertRagEngine.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataPath = path.resolve(__dirname, '../../public/data.json');

function printResult(test, result) {
  const status = result.accepted ? 'PASS' : 'FALLBACK';
  const top = result.topMatch;
  console.log(
    `${status.padEnd(9)} | ${String(result.confidence).padStart(5)}% | ` +
    `${test.type.padEnd(15)} | ${test.query}`
  );
  if (top) {
    console.log(`           top=${top.id} | group=${top.group} | source=${top.source}`);
  }
}

function deriveTests(dataset) {
  const tests = [];
  const firstDocs = dataset.slice(0, 4);

  firstDocs.forEach((doc, index) => {
    const question = Array.isArray(doc.question) ? doc.question[0] : doc.question;
    if (question) {
      tests.push({
        type: `exact-${index + 1}`,
        query: question
      });
    }
  });

  firstDocs.forEach((doc, index) => {
    const question = Array.isArray(doc.question) ? doc.question[0] : doc.question;
    if (!question) return;

    const paraphrase = question
      .replace(/What information is available about this/gi, 'Tell me about this')
      .replace(/What does the knowledge base say about/gi, 'Give me information about')
      .replace(/ما المعلومات المتوفرة عن/gi, 'ماذا تعرف قاعدة البيانات عن')
      .replace(/ماذا تقول قاعدة البيانات عن/gi, 'ما الموجود في قاعدة البيانات عن');

    tests.push({
      type: `paraphrase-${index + 1}`,
      query: paraphrase
    });
  });

  const groupQueries = [
    'investment opportunities',
    'market indicators',
    'investment incentives',
    'الفرص الاستثمارية',
    'مؤشرات السوق',
    'الحوافز الاستثمارية'
  ];

  groupQueries.forEach((query, index) => {
    tests.push({ type: `partial-${index + 1}`, query });
  });

  tests.push(
    { type: 'out-of-domain-1', query: 'How to make pizza at home?' },
    { type: 'out-of-domain-2', query: 'من فاز بكأس العالم 2026؟' },
    { type: 'out-of-domain-3', query: 'What is the weather tomorrow in Tokyo?' },
    { type: 'out-of-domain-4', query: 'Explain how to repair a bicycle chain.' }
  );

  return tests.slice(0, 18);
}

async function main() {
  let raw;
  try {
    raw = JSON.parse(await fs.readFile(dataPath, 'utf8'));
  } catch (error) {
    console.error(`Could not read ${dataPath}`);
    console.error(error.message);
    process.exitCode = 1;
    return;
  }

  const dataset = buildGroundedDataset(raw);
  const stats = getDatasetStats(dataset);

  console.log('\n=== Grounded RAG Confidence Test ===');
  console.log(`Dataset documents : ${stats.total}`);
  console.log(`Threshold         : ${CONFIDENCE_THRESHOLD}%`);
  console.log(`Groups            : ${JSON.stringify(stats.byGroup)}`);
  console.log('');

  if (!dataset.length) {
    console.error('FAIL: grounded dataset is empty.');
    process.exitCode = 1;
    return;
  }

  const tests = deriveTests(dataset);
  const results = tests.map(test => ({
    test,
    result: retrieve(test.query, dataset)
  }));

  console.log('RESULTS');
  console.log('STATUS    | SCORE | TYPE            | QUERY');
  console.log('-'.repeat(95));

  results.forEach(({ test, result }) => printResult(test, result));

  const outOfDomain = results.filter(({ test }) => test.type.startsWith('out-of-domain'));
  const falsePositives = outOfDomain.filter(({ result }) => result.accepted);

  const inDomain = results.filter(({ test }) => !test.type.startsWith('out-of-domain'));
  const acceptedInDomain = inDomain.filter(({ result }) => result.accepted);

  const scores = results.map(x => x.result.confidence);
  const average = scores.length
    ? scores.reduce((a, b) => a + b, 0) / scores.length
    : 0;

  console.log('\nSUMMARY');
  console.log(`Average confidence : ${average.toFixed(1)}%`);
  console.log(`In-domain accepted : ${acceptedInDomain.length}/${inDomain.length}`);
  console.log(`Out-domain blocked : ${outOfDomain.length - falsePositives.length}/${outOfDomain.length}`);
  console.log(`False positives    : ${falsePositives.length}`);

  // Guardrail test: a generated answer containing a source number that is not
  // in the retrieved context must never be accepted.
  const groundedSample = inDomain.find(x => x.result.accepted)?.result;
  if (groundedSample) {
    const safe = isGroundedGeneration(
      groundedSample.groundedAnswer,
      [groundedSample]
    );
    const unsafe = isGroundedGeneration(
      `${groundedSample.groundedAnswer} 999999999`,
      [groundedSample]
    );
    console.log(`Grounded answer check: ${safe ? 'PASS' : 'FAIL'}`);
    console.log(`Unsupported-number check: ${!unsafe ? 'PASS' : 'FAIL'}`);

    if (!safe || unsafe) process.exitCode = 1;
  }

  if (falsePositives.length) {
    console.error('\nFAIL: one or more out-of-domain queries crossed the confidence threshold.');
    falsePositives.forEach(({ test, result }) => {
      console.error(`  ${test.query} -> ${result.confidence}%`);
    });
    process.exitCode = 1;
  } else {
    console.log('\nPASS: all tested out-of-domain queries were rejected.');
  }

  console.log('\nTuning note:');
  console.log(
    `The starting threshold is ${CONFIDENCE_THRESHOLD}%. ` +
    'If valid paraphrases are repeatedly below the threshold while noise remains low, ' +
    'increase semantic weighting or lower the threshold in small increments (e.g. 2-3%). ' +
    'Do not lower it just to force a desired answer.'
  );
}

main();
