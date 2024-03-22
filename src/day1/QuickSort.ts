function qs(arr: number[], low: number, high: number): void {
    if (low >= high) {
        return;
    }

    const pivotIdx = partition(arr, low, high);

    partition(arr, low, pivotIdx - 1);
    partition(arr, pivotIdx + 1, high);
}

function partition(arr: number[], low: number, high: number): number {
    const pivotVal = arr[high];

    let idx = low - 1;

    for (let i = low; i < high; ++i) {
        if (arr[i] <= pivotVal) {
            idx++;
            const tmp = arr[i];
            arr[i] = arr[idx];
            arr[idx] = tmp;
        }
    }

    idx++;
    arr[high] = arr[idx];
    arr[idx] = pivotVal;

    return idx;
}

export default function quick_sort(arr: number[]): void {
    qs(arr, 0, arr.length - 1);
}
