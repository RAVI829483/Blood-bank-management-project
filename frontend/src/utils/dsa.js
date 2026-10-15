/**
 * Stable merge sort for the app's array-backed donor and inventory lists.
 * Time: O(n log n). Extra space: O(n).
 */
export function mergeSort(items, compare) {
  if (items.length < 2) return items.slice();

  const midpoint = Math.floor(items.length / 2);
  const left = mergeSort(items.slice(0, midpoint), compare);
  const right = mergeSort(items.slice(midpoint), compare);
  const sorted = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (compare(left[leftIndex], right[rightIndex]) <= 0) {
      sorted.push(left[leftIndex]);
      leftIndex += 1;
    } else {
      sorted.push(right[rightIndex]);
      rightIndex += 1;
    }
  }

  return sorted
    .concat(left.slice(leftIndex))
    .concat(right.slice(rightIndex));
}

/**
 * Linear search across an array, returning every match.
 * Time: O(n); extra space: O(k), where k is the number of matches.
 */
export function linearSearchAll(items, matches) {
  const found = [];

  for (const item of items) {
    if (matches(item)) found.push(item);
  }

  return found;
}

/**
 * Group array records in a hash map. Build time: O(n); average lookup: O(1).
 * Each key stores an array so repeated stock entries are not discarded.
 */
export function groupByHash(items, getKey) {
  const groups = new Map();

  for (const item of items) {
    const key = getKey(item);
    const group = groups.get(key);
    if (group) {
      group.push(item);
    } else {
      groups.set(key, [item]);
    }
  }

  return groups;
}

/**
 * Find the first equal item in an already sorted array.
 * Time: O(log n); extra space: O(1).
 */
export function binarySearchFirst(sortedItems, target, compare) {
  let low = 0;
  let high = sortedItems.length - 1;
  let firstMatch = null;

  while (low <= high) {
    const middle = Math.floor((low + high) / 2);
    const order = compare(sortedItems[middle], target);

    if (order < 0) {
      low = middle + 1;
    } else if (order > 0) {
      high = middle - 1;
    } else {
      firstMatch = sortedItems[middle];
      high = middle - 1;
    }
  }

  return firstMatch;
}
