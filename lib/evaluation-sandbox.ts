export interface SandboxPrompt {
  id: string;
  domain: string;
  promptText: string;
  responseA: {
    codeOrText: string;
    flaws: string[];
    strengths: string[];
  };
  responseB: {
    codeOrText: string;
    flaws: string[];
    strengths: string[];
  };
  consensusWinner: 'B';
  expertRubricReasoning: string;
}

export const SAMPLE_TASK: SandboxPrompt = {
  id: 'task-python-backoff',
  domain: 'Python Engineering & System Reliability',
  promptText:
    'Write a Python 3.11+ function to fetch user data from a REST endpoint with exponential backoff, randomized jitter, specific exception handling, and a strict timeout.',
  responseA: {
    codeOrText: `import requests
import time

def fetch_user_data(url, max_retries=3):
    for i in range(max_retries):
        try:
            res = requests.get(url, timeout=5)
            return res.json()
        except Exception as e:
            # Wait fixed time
            time.sleep(2 ** i)
    return None`,
    flaws: [
      'Missing randomized jitter (leads to the "thundering herd" problem on service recovery)',
      'Catches generic `Exception`, masking keyboard interrupts or syntax issues',
      'Silently returns `None` after max retries without raising or propagating error telemetry',
      'Lacks type annotations or return type specification',
    ],
    strengths: [
      'Sets a 5-second timeout on requests.get',
      'Simple, easy-to-read loop structure',
    ],
  },
  responseB: {
    codeOrText: `import time
import random
from typing import Any, Optional
import requests
from requests.exceptions import RequestException, Timeout

def fetch_user_data(
    url: str,
    max_retries: int = 4,
    base_backoff_sec: float = 1.0,
    max_backoff_sec: float = 16.0,
    timeout_sec: float = 5.0,
) -> dict[str, Any]:
    """Fetch user JSON with exponential backoff and full randomized jitter."""
    for attempt in range(max_retries):
        try:
            response = requests.get(url, timeout=timeout_sec)
            response.raise_for_status()
            return response.json()
        except (RequestException, Timeout) as err:
            if attempt == max_retries - 1:
                raise RuntimeError(f"Failed to fetch {url} after {max_retries} attempts") from err
            # Exponential backoff with full jitter: uniform(0, min(max_backoff, base * 2^attempt))
            backoff_cap = min(max_backoff_sec, base_backoff_sec * (2 ** attempt))
            jittered_delay = random.uniform(0.1, backoff_cap)
            time.sleep(jittered_delay)
    raise RuntimeError("Unexpected retry exhaustion")`,
    flaws: [
      'Slightly more verbose than a minimal script, but necessary for resilient production services',
    ],
    strengths: [
      'Implements genuine randomized jitter to avoid thundering herd bursts',
      'Catches specific `(RequestException, Timeout)` instead of bare `Exception`',
      'Uses `raise_for_status()` to catch HTTP 4xx/5xx status codes',
      'Proper exception chaining with `raise ... from err`',
      'Complete modern Python 3.11+ type hints (`dict[str, Any]`, `float`, `int`)',
    ],
  },
  consensusWinner: 'B',
  expertRubricReasoning:
    'Response B is substantially better. It rigorously fulfills all prompt constraints: exponential backoff with true randomized jitter, specific exception hierarchies, HTTP error status checking, type annotations, and explicit failure propagation instead of silent `None` swallows.',
};

export interface UserSubmission {
  selectedWinner: 'A' | 'B' | 'Tie';
  accuracyScore: number; // 1 - 5
  helpfulnessScore: number; // 1 - 5
  codeRobustnessScore: number; // 1 - 5
  rationale: string;
}

export interface EvaluationResult {
  score: number; // 0 - 100%
  consensusAlignment: 'Exact Match' | 'Partial Alignment' | 'Needs Recalibration';
  feedbackSummary: string;
  identifiedStrengths: string[];
  keyRecommendations: string[];
  contributorReadiness: 'High' | 'Promising' | 'Requires Study';
}

export function evaluateSubmission(
  submission: UserSubmission,
  task: SandboxPrompt = SAMPLE_TASK
): EvaluationResult {
  let score = 0;

  // 1. Winner selection (50 points)
  if (submission.selectedWinner === task.consensusWinner) {
    score += 50;
  } else if (submission.selectedWinner === 'Tie') {
    score += 20;
  } else {
    score += 10;
  }

  // 2. Multi-axis rating calibration (30 points)
  // Expert benchmark for Response B: Accuracy 5, Helpfulness 5, Robustness 5
  // If user rated high scores (4 or 5) for robustness and accuracy:
  const avgRating = (submission.accuracyScore + submission.helpfulnessScore + submission.codeRobustnessScore) / 3;
  if (submission.selectedWinner === 'B') {
    if (avgRating >= 4) {
      score += 30;
    } else {
      score += 20;
    }
  } else {
    // If they picked A, check consistency
    score += Math.max(5, Math.round(avgRating * 3));
  }

  // 3. Rationale evaluation (20 points)
  const rationaleLower = (submission.rationale || '').toLowerCase();
  const keywordMatches = ['jitter', 'exception', 'typing', 'thundering herd', 'timeout', 'raise_for_status', 'none'].filter(
    (kw) => rationaleLower.includes(kw)
  );

  if (keywordMatches.length >= 2) {
    score += 20;
  } else if (keywordMatches.length === 1 || rationaleLower.length > 30) {
    score += 15;
  } else if (rationaleLower.length > 10) {
    score += 10;
  } else {
    score += 5;
  }

  score = Math.min(100, Math.max(10, score));

  let consensusAlignment: 'Exact Match' | 'Partial Alignment' | 'Needs Recalibration' = 'Needs Recalibration';
  let contributorReadiness: 'High' | 'Promising' | 'Requires Study' = 'Requires Study';

  if (score >= 85) {
    consensusAlignment = 'Exact Match';
    contributorReadiness = 'High';
  } else if (score >= 60) {
    consensusAlignment = 'Partial Alignment';
    contributorReadiness = 'Promising';
  }

  const identifiedStrengths: string[] = [];
  if (submission.selectedWinner === 'B') {
    identifiedStrengths.push('Correctly recognized Model B as superior due to production-readiness');
  }
  if (keywordMatches.includes('jitter')) {
    identifiedStrengths.push('Identified the importance of randomized jitter for distributed retry safety');
  }
  if (keywordMatches.includes('exception')) {
    identifiedStrengths.push('Spotted the difference in exception specificity');
  }
  if (identifiedStrengths.length === 0) {
    identifiedStrengths.push('Provided prompt assessment and multi-axis rubric ratings');
  }

  const keyRecommendations = [
    'Always inspect edge-case handling: what happens on max retry exhaustion?',
    'Check whether the model silently swallows errors vs properly chaining exceptions with `raise from`',
    'Examine prompt constraints carefully: prompt asked for randomized jitter, which Model A completely omitted',
  ];

  const feedbackSummary =
    score >= 85
      ? 'Outstanding evaluation! Your critique aligns closely with Bever senior AI evaluators and benchmark standards.'
      : score >= 60
      ? 'Good critical eye. You spotted key distinctions, but review how minor omissions like jitter impact system scalability.'
      : 'Review the expert rubric below. In AI evaluation, adherence to technical constraints is strictly weighted.';

  return {
    score,
    consensusAlignment,
    feedbackSummary,
    identifiedStrengths,
    keyRecommendations,
    contributorReadiness,
  };
}
