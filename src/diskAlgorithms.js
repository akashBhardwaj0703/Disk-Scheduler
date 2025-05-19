// src/diskAlgorithms.js

export function fcfs(requests, head) {
  let totalSeekCount = 0;
  let current = head;
  const seekSequence = [];

  for (const req of requests) {
    totalSeekCount += Math.abs(current - req);
    current = req;
    seekSequence.push(req);
  }
  return { totalSeekCount, seekSequence };
}

export function scan(requests, head, direction = 'right', diskSize = 199) {
  let left = [], right = [], seekSequence = [];
  let totalSeekCount = 0;
  let current = head;

  requests = requests.slice().sort((a, b) => a - b);

  for (const r of requests) {
    if (r < head) left.push(r);
    else right.push(r);
  }

  if (direction === 'left') {
    left.reverse();
    seekSequence = [...left, 0, ...right];
  } else {
    seekSequence = [...right, diskSize, ...left.reverse()];
  }

  for (const pos of seekSequence) {
    totalSeekCount += Math.abs(current - pos);
    current = pos;
  }

  return { totalSeekCount, seekSequence };
}
