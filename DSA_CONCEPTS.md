# DSA concepts used in the blood-bank app

These changes keep the uploaded app's existing screens and apply the algorithms
to donor and inventory data.

| Concept | Blood-bank example | Cost |
| --- | --- | --- |
| Array | Donors and stock records are kept and rendered as lists. | Access by index: O(1); scan: O(n) |
| Linear search | The donor directory checks each fetched donor against the search text. | O(n) |
| Merge sort | Donors follow the chosen sort order; inventory is ordered by earliest expiry first. | O(n log n) time, O(n) extra space |
| Hash map | A `Map` groups stock records by blood group without losing duplicate entries. | Build: O(n); average lookup: O(1) |
| Binary search | The eight inventory summary cards find a blood group in stock already sorted by group. | O(log n); the input must be sorted |

The DSA helpers live in `frontend/src/utils/dsa.js`. The donor and hospital
inventory pages use them without adding controls or changing the page layout.
