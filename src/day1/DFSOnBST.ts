function walk(curr: BinaryNode<number> | undefined, needle: number): boolean {
    // Base cases
    if (!curr) {
        return false;
    }

    if (curr.value === needle) return true;

    if (curr.left) {
        if (walk(curr.left, needle)) return true;
    }
    if (curr.right) {
        if (walk(curr.right, needle)) return true;
    }

    return false;
}

export default function dfs(head: BinaryNode<number>, needle: number): boolean {
    return walk(head, needle);
}
