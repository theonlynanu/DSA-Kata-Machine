type TrieNode<T = string> = {
    value: T;
    children: (TrieNode<string> | undefined)[];
    isWord: boolean;
};

export default class Trie {
    private head: TrieNode<string>;
    constructor() {
        this.head = {
            value: "",
            children: [],
            isWord: false,
        } as TrieNode<string>;
    }

    insert(item: string): void {
        let curr = this.head;

        // This insertion loop is messy, but it was my immediate first thought
        for (let i = 0; i < item.length; i++) {
            const char = item[i];
            const charIdx = this.getIdx(char);

            // Something about this if statement bugs the hell out of me
            if (curr.children[charIdx] === undefined) {
                const charNode = {
                    value: char,
                    children: [],
                    isWord: false,
                } as TrieNode<string>;

                curr.children[charIdx] = charNode;
                curr = charNode;
            } else {
                // You'd think I wouldn't have to assert that it isn't undefined
                // given the condition above, but I guess that isn't the case
                // (if I'm missing something please let me know)
                curr = curr.children[charIdx] as TrieNode<string>;
            }
        }
        curr.isWord = true;
    }

    delete(item: string): void {
        // Choosing not to prune the tree here, may improve later!
        let curr: TrieNode<string> | undefined = this.head;

        // Pruning the tree would require deleting every parent node that has
        // no other children - this is probably possible recursively but I
        // suspect my TrieNode type isn't the best for this
        for (let i = 0; curr && i < item.length; i++) {
            curr = curr.children[this.getIdx(item[i])];
        }

        if (!curr) return;

        curr.isWord = false;
    }

    find(partial: string): any {
        let curr: TrieNode<string> | undefined = this.head;
        for (let i = 0; curr && i < partial.length; i++) {
            curr = curr.children[this.getIdx(partial[i])];
        }
        if (!curr) return [];
        const out: string[] = [];
        this.searchNodes(curr, partial.slice(0, -1), out);

        return out;
    }

    private searchNodes(
        node: TrieNode<string>,
        stringPath: string,
        words: string[],
    ): void {
        stringPath = stringPath + node.value;
        if (node.isWord) {
            words.push(stringPath);
        }

        const nextVals: number[] = [];

        for (let i = 0; i < 26; i++) {
            if (node.children[i]) {
                nextVals.push(i);
            }
        }

        if (nextVals.length === 0) {
            stringPath = stringPath.slice(0, -1);
            return;
        }

        for (let i = 0; i < nextVals.length; i++) {
            const nextNode = node.children[nextVals[i]];
            if (nextNode) {
                this.searchNodes(nextNode, stringPath, words);
            }
        }

        stringPath = stringPath.slice(0, -1);
        return;
    }

    private getIdx(char: string): number {
        if (char.length !== 1) {
            throw new Error("getIdx can only take in a single character");
        }
        const idx = char.toLowerCase().charCodeAt(0);
        if (idx < 97 || idx > 122) {
            throw new Error("character must be a member of the alphabet");
        }

        return idx - 97;
    }
}
