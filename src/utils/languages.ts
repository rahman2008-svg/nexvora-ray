import { LanguageOption } from '../types/index.ts';

export const LANGUAGES: LanguageOption[] = [
  {
    id: 'typescript',
    name: 'TypeScript',
    extension: 'ts',
    sample: `import { useState, useEffect } from 'react';

interface MetricPayload {
  readonly id: string;
  timestamp: number;
  value: number;
  status: 'active' | 'idle';
}

export function useLiveMetrics(sensorId: string) {
  const [metrics, setMetrics] = useState<MetricPayload[]>([]);

  useEffect(() => {
    const stream = subscribeToSensor(sensorId, (data) => {
      setMetrics((prev) => [...prev.slice(-49), data]);
    });
    return () => stream.unsubscribe();
  }, [sensorId]);

  return { metrics, isConnected: metrics.length > 0 };
}`,
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    extension: 'js',
    sample: `// Elegant asynchronous memoization helper
const memoize = (fn, ttlMs = 60000) => {
  const cache = new Map();

  return async (...args) => {
    const key = JSON.stringify(args);
    const now = Date.now();

    if (cache.has(key)) {
      const { value, expiry } = cache.get(key);
      if (now < expiry) return value;
    }

    const value = await fn(...args);
    cache.set(key, { value, expiry: now + ttlMs });
    return value;
  };
};`,
  },
  {
    id: 'python',
    name: 'Python',
    extension: 'py',
    sample: `from typing import AsyncGenerator
from dataclasses import dataclass
import asyncio

@dataclass(slots=True, frozen=True)
class StreamFrame:
    sequence_id: int
    payload_hash: str
    confidence: float

async def generate_frames(count: int = 10) -> AsyncGenerator[StreamFrame, None]:
    for seq in range(count):
        await asyncio.sleep(0.05)
        yield StreamFrame(
            sequence_id=seq,
            payload_hash=f"0x{seq:08x}",
            confidence=round(0.95 + (seq % 5) * 0.01, 3)
        )`,
  },
  {
    id: 'rust',
    name: 'Rust',
    extension: 'rs',
    sample: `use std::sync::Arc;
use tokio::sync::RwLock;

#[derive(Debug, Clone)]
pub struct PipelineConfig {
    pub max_concurrency: usize,
    pub timeout_seconds: u64,
}

pub struct Engine {
    config: Arc<RwLock<PipelineConfig>>,
}

impl Engine {
    pub fn new(config: PipelineConfig) -> Self {
        Self {
            config: Arc::new(RwLock::new(config)),
        }
    }

    pub async fn process_job(&self, job_id: &str) -> Result<usize, String> {
        let conf = self.config.read().await;
        println!("Dispatching job: {} (concurrency: {})", job_id, conf.max_concurrency);
        Ok(conf.max_concurrency * 42)
    }
}`,
  },
  {
    id: 'go',
    name: 'Go',
    extension: 'go',
    sample: `package main

import (
	"context"
	"fmt"
	"time"
)

type Result struct {
	ID    int
	Value string
}

func fetchWorker(ctx context.Context, id int, out chan<- Result) {
	select {
	case <-time.After(150 * time.Millisecond):
		out <- Result{ID: id, Value: fmt.Sprintf("Worker #%d done", id)}
	case <-ctx.Done():
		return
	}
}`,
  },
  {
    id: 'html',
    name: 'HTML',
    extension: 'html',
    sample: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>NexVora Ray Canvas</title>
    <link rel="stylesheet" href="./style.css" />
  </head>
  <body class="bg-slate-950 text-white">
    <main class="max-w-4xl mx-auto py-16 px-6">
      <h1 class="text-4xl font-bold tracking-tight">Code Canvas</h1>
      <p class="text-slate-400 mt-2">Render syntax with pure clarity.</p>
    </main>
  </body>
</html>`,
  },
  {
    id: 'css',
    name: 'CSS',
    extension: 'css',
    sample: `@layer utilities {
  .glass-surface {
    background: rgba(18, 18, 24, 0.75);
    backdrop-filter: blur(24px) saturate(180%);
    -webkit-backdrop-filter: blur(24px) saturate(180%);
    border: 1px solid rgba(255, 255, 255, 0.12);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);
    border-radius: 1rem;
  }
}`,
  },
  {
    id: 'json',
    name: 'JSON',
    extension: 'json',
    sample: `{
  "name": "nexvora-ray",
  "version": "1.0.0",
  "author": "Prince AR Abdur Rahman",
  "publisher": "NexVora Lab's Ofc",
  "features": [
    "Pixel-perfect export",
    "macOS & Windows chrome",
    "Gradients & customizable shadows",
    "Instant clipboard sync"
  ],
  "license": "Apache-2.0"
}`,
  },
  {
    id: 'sql',
    name: 'SQL',
    extension: 'sql',
    sample: `WITH RankedDeployments AS (
  SELECT
    d.id,
    d.project_name,
    d.commit_hash,
    d.deployed_at,
    ROW_NUMBER() OVER (
      PARTITION BY d.project_name 
      ORDER BY d.deployed_at DESC
    ) AS rank_order
  FROM deployments d
  WHERE d.environment = 'production'
)
SELECT id, project_name, commit_hash
FROM RankedDeployments
WHERE rank_order <= 3;`,
  },
  {
    id: 'bash',
    name: 'Shell / Bash',
    extension: 'sh',
    sample: `#!/usr/bin/env bash
set -euo pipefail

APP_NAME="nexvora-ray"
TARGET_DIR="./dist"

echo "==> Building \${APP_NAME} for production..."
npm run build

if [ -d "\${TARGET_DIR}" ]; then
  echo "✔ Build bundle created successfully at \${TARGET_DIR}"
  du -sh "\${TARGET_DIR}"
else
  echo "✖ Error: Build output directory missing!"
  exit 1
fi`,
  },
  {
    id: 'cpp',
    name: 'C++',
    extension: 'cpp',
    sample: `#include <iostream>
#include <vector>
#include <algorithm>

template <typename T>
void quick_display(const std::vector<T>& data) {
    std::cout << "[ ";
    for (const auto& item : data) {
        std::cout << item << " ";
    }
    std::cout << "]\n";
}

int main() {
    std::vector<int> numbers = {7, 14, 21, 28, 35};
    quick_display(numbers);
    return 0;
}`,
  },
  {
    id: 'markdown',
    name: 'Markdown',
    extension: 'md',
    sample: `# NexVora Ray

> The sleek code screenshot generator by NexVora Lab's Ofc.

### Key Highlights
- **Stunning Gradients**: Breeze, Candy, Falcon, Tokyo Night
- **Full Typography**: JetBrains Mono, Fira Code & custom scaling
- **Instant Sharing**: Export 2x PNG, SVG, or copy directly`,
  },
];

export function detectLanguage(filename: string, code: string): string {
  if (filename) {
    const ext = filename.split('.').pop()?.toLowerCase();
    const match = LANGUAGES.find((lang) => lang.extension === ext);
    if (match) return match.id;
    if (ext === 'tsx' || ext === 'jsx') return 'typescript';
    if (ext === 'py') return 'python';
    if (ext === 'rs') return 'rust';
    if (ext === 'go') return 'go';
    if (ext === 'json') return 'json';
    if (ext === 'sh' || ext === 'zsh') return 'bash';
    if (ext === 'sql') return 'sql';
    if (ext === 'html' || ext === 'htm') return 'html';
    if (ext === 'css' || ext === 'scss') return 'css';
    if (ext === 'cpp' || ext === 'cc' || ext === 'h') return 'cpp';
  }

  // Content heuristics
  if (/import\s+.*\s+from\s+['"].*['"]|export\s+(default\s+)?(function|class|const|interface|type)/.test(code)) {
    return /:\s*(string|number|boolean|any)|interface\s+\w+/.test(code) ? 'typescript' : 'javascript';
  }
  if (/def\s+\w+\(.*\):|import\s+\w+|from\s+\w+\s+import/.test(code)) return 'python';
  if (/fn\s+\w+\(.*\)\s*->|pub\s+struct|impl\s+\w+|let\s+mut\s+/.test(code)) return 'rust';
  if (/package\s+main|func\s+\w+\(.*\)|type\s+\w+\s+struct/.test(code)) return 'go';
  if (/<!DOCTYPE\s+html>|<html|<div|<body/i.test(code)) return 'html';
  if (/SELECT\s+.*\s+FROM\s+/i.test(code)) return 'sql';
  if (/^(\s*\{|\s*\[)/.test(code) && /:\s*["\d]/.test(code)) return 'json';
  if (/^#!\/bin\/(bash|sh|zsh)/.test(code)) return 'bash';

  return 'typescript';
}
