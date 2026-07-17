type BoundaryColor = 'dark' | 'light' | 'lime';

// The reference uses a fixed 28-column, two-row motif. Each row begins with
// its section color, then selected cells swap to the opposing section color.
const upperSwaps = new Set([0, 3, 6, 10, 12, 14, 15, 16, 17, 21, 24, 27]);
const lowerSwaps = new Set([0, 2, 6, 12, 17, 21, 26, 27]);

function renderRow(swaps: Set<number>) {
  return Array.from({ length: 28 }, (_, index) => (
    `<span class="${swaps.has(index) ? 'is-swapped' : ''}"></span>`
  )).join('');
}

export function renderCheckerBoundary(from: BoundaryColor, to: BoundaryColor) {
  return `
    <div class="checker-boundary checker-${from}-${to}" aria-hidden="true">
      <div class="checker-row checker-row-upper">${renderRow(upperSwaps)}</div>
      <div class="checker-row checker-row-lower">${renderRow(lowerSwaps)}</div>
    </div>
  `;
}
