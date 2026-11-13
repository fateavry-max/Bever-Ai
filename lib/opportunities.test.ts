import test from 'node:test';
import assert from 'node:assert/strict';
import {
  OPPORTUNITIES_DATA,
  filterOpportunities,
  getCategoryCounts,
  getOpportunityById,
  getAllOpportunityIds,
} from './opportunities';
import { evaluateSubmission, SAMPLE_TASK } from './evaluation-sandbox';

test('opportunities dataset contains at least 10 categories', () => {
  assert.ok(OPPORTUNITIES_DATA.length >= 10, 'Expected at least 10 opportunities');
  const categories = new Set(OPPORTUNITIES_DATA.map((o) => o.category));
  assert.ok(categories.size >= 8, 'Expected diverse categories represented');
  assert.ok(categories.has('Coding and Software Engineering'));
  assert.ok(categories.has('Writing and Editing'));
  assert.ok(categories.has('Mathematics'));
  assert.ok(categories.has('Language and Translation'));
});

test('filterOpportunities filters correctly by category', () => {
  const codingProjects = filterOpportunities(OPPORTUNITIES_DATA, {
    category: 'Coding and Software Engineering',
  });
  assert.ok(codingProjects.length >= 2);
  for (const p of codingProjects) {
    assert.equal(p.category, 'Coding and Software Engineering');
  }
});

test('filterOpportunities searches title, description, and skills', () => {
  const pythonResults = filterOpportunities(OPPORTUNITIES_DATA, {
    searchQuery: 'Python',
  });
  assert.ok(pythonResults.length >= 1);
  assert.ok(
    pythonResults.some((p) => p.requiredSkills.some((s) => s.includes('Python')))
  );

  const nonExistent = filterOpportunities(OPPORTUNITIES_DATA, {
    searchQuery: 'xyzNonExistentKeyword999',
  });
  assert.equal(nonExistent.length, 0);
});

test('filterOpportunities handles All Categories and difficulty filter', () => {
  const allItems = filterOpportunities(OPPORTUNITIES_DATA, {
    category: 'All Categories',
    difficulty: 'All Levels',
  });
  assert.equal(allItems.length, OPPORTUNITIES_DATA.length);

  const advancedItems = filterOpportunities(OPPORTUNITIES_DATA, {
    difficulty: 'Advanced',
  });
  assert.ok(advancedItems.length > 0);
  for (const item of advancedItems) {
    assert.equal(item.difficulty, 'Advanced');
  }
});

test('getCategoryCounts calculates totals accurately', () => {
  const counts = getCategoryCounts(OPPORTUNITIES_DATA);
  assert.equal(counts['All Categories'], OPPORTUNITIES_DATA.length);
  assert.ok(counts['Coding and Software Engineering'] >= 2);
});

test('evaluateSubmission calculates high score for correct winner and insightful rationale', () => {
  const result = evaluateSubmission(
    {
      selectedWinner: 'B',
      accuracyScore: 5,
      helpfulnessScore: 5,
      codeRobustnessScore: 5,
      rationale:
        'Response B properly introduces exponential backoff with randomized jitter to prevent the thundering herd problem, and handles specific requests exceptions.',
    },
    SAMPLE_TASK
  );

  assert.ok(result.score >= 85, `Expected score >= 85, got ${result.score}`);
  assert.equal(result.consensusAlignment, 'Exact Match');
  assert.equal(result.contributorReadiness, 'High');
  assert.ok(result.identifiedStrengths.length >= 2);
});

test('evaluateSubmission calculates lower score for incorrect winner', () => {
  const result = evaluateSubmission(
    {
      selectedWinner: 'A',
      accuracyScore: 2,
      helpfulnessScore: 2,
      codeRobustnessScore: 2,
      rationale: 'I like shorter code',
    },
    SAMPLE_TASK
  );

  assert.ok(result.score < 60, `Expected score < 60, got ${result.score}`);
  assert.equal(result.consensusAlignment, 'Needs Recalibration');
});

test('getOpportunityById retrieves valid opportunity and handles missing IDs', () => {
  const opp = getOpportunityById('opp-code-01');
  assert.ok(opp !== undefined);
  assert.equal(opp?.title, 'Python Backend & Algorithm Evaluation');

  const missing = getOpportunityById('non-existent-id-404');
  assert.equal(missing, undefined);
});

test('getAllOpportunityIds returns array of all IDs', () => {
  const ids = getAllOpportunityIds();
  assert.equal(ids.length, OPPORTUNITIES_DATA.length);
  assert.ok(ids.includes('opp-code-01'));
});
