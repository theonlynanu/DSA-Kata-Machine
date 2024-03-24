type Node<T> = {
    value: T;
    next?: Node<T>;
};

export default class SinglyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    prepend(item: T): void {
        const node = { value: item } as Node<T>;

        if (!this.head) {
            this.length++;
            this.head = this.tail = node;
            return;
        }

        this.length++;

        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx >= this.length) {
            throw new Error("Index out of bounds");
        } else if (idx === 0) {
            this.prepend(item);
            return;
        } else if (idx === this.length - 1) {
            this.append(item);
            return;
        }

        this.length++;

        let curr = this.head;

        //Retrieves node BEFORE index (so returns node 4 if index given is 5)
        for (let i = 0; curr && i < idx - 1; i++) {
            curr = curr.next;
        }

        // This is just to make TypeScript happy, as these edge cases should have
        // been covered by our initial checks
        const prev = curr as Node<T>;
        curr = curr?.next as Node<T>;
        const next = curr.next;

        prev.next = curr;
        curr.next = next;
    }

    append(item: T): void {
        const node = { value: item } as Node<T>;

        if (!this.tail) {
            this.length++;
            this.head = this.tail = node;
            return;
        }
        this.length++;
        this.tail.next = node;
        this.tail = node;
    }
    remove(item: T): T | undefined {
        let curr = this.head;
        let prev: Node<T> | undefined;

        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) break;
            prev = curr;
            curr = curr.next;
        }

        if (!curr) return undefined;

        this.length--;
        const next = curr.next;

        if (curr === this.head || !prev) {
            this.head = next;
            curr.next = undefined;
            return curr.value;
        }

        prev.next = next;
        curr.next = undefined;
        return curr.value;
    }

    get(idx: number): T | undefined {
        if (idx >= this.length) {
            throw new Error("Index is out of bounds");
        } else if (idx === this.length - 1) {
            return this.tail?.value;
        } else if (idx === 0) {
            return this.head?.value;
        }

        let curr: Node<T> | undefined = this.head;

        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }

        return curr?.value;
    }

    removeAt(idx: number): T | undefined {
        if (idx >= this.length) {
            throw new Error("Index is out of bounds");
        } else if (idx === 0 && this.head) {
            this.length--;
            const curr = this.head;
            this.head = curr.next;
            curr.next = undefined;
            return curr.value;
        }

        let prev: Node<T> | undefined;
        let curr: Node<T> | undefined = this.head;

        for (let i = 0; i < idx && curr; ++i) {
            prev = curr;
            curr = curr.next;
        }

        if (!curr) return undefined;
        this.length--;
        const next = curr.next;

        if (!prev) {
            this.head = curr?.next;
            curr.next = undefined;
            return curr.value;
        }

        prev.next = next;
        curr.next = undefined;
        return curr.value;
    }
}
