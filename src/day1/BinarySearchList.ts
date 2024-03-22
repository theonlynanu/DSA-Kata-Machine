export default function bs_list(haystack: number[], needle: number): boolean {
    let low = 0;
    let high = haystack.length;

    while (low < high) {
        const m = Math.floor((low + high) / 2);
        const value = haystack[m];
        if (value === needle) {
            return true;
        } else if (value > needle) {
            high = m - 1;
        } else {
            low = m + 1;
        }
    }
    return false;
}
