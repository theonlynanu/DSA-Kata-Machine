type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class DoublyLinkedList<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.head = this.tail = undefined;
        this.length = 0;
    }

    prepend(item: T): void {
        if (!this.head) {
            this.head = this.tail = { value: item } as Node<T>;
            this.length++;
            return;
        }
        this.length++;

        const node = { value: item } as Node<T>;

        this.head.prev = node;
        node.next = this.head;
        this.head = node;
    }

    insertAt(item: T, idx: number): void {
        if (idx > this.length) {
            throw new Error("Index out of bounds");
        } else if (idx === this.length) {
            this.append(item);
            return;
        } else if (idx === 0) {
            this.prepend(item);
        }

        this.length++;
        const curr = this.getNodeAt(idx) as Node<T>;
        const node = { value: item } as Node<T>;

        const prev = curr?.prev;

        if (prev) prev.next = node;
        node.prev = prev;

        curr.prev = node;
    }

    append(item: T): void {
        if (!this.tail) {
            this.head = this.tail = { value: item } as Node<T>;
            this.length++;
            return;
        }

        this.length++;
        const node = { value: item } as Node<T>;

        this.tail.next = node;
        node.prev = this.tail;

        this.tail = node;
    }

    remove(item: T): T | undefined {
        let curr = this.head;

        for (let i = 0; curr && i < this.length; i++) {
            if (curr.value === item) {
                break;
            }
            curr = curr.next;
        }

        if (!curr) return;

        this.length--;
        const prev = curr.prev;
        const next = curr.next;

        if (curr === this.head) {
            this.head = next;
        }

        if (curr === this.tail) {
            this.tail = prev;
        }

        if (prev) prev.next = next;
        if (next) next.prev = prev;

        curr.next = curr.prev = undefined;
        return curr.value;
    }

    get(idx: number): T | undefined {
        return this.getNodeAt(idx)?.value;
    }

    removeAt(idx: number): T | undefined {
        const curr = this.getNodeAt(idx);

        if (!curr) return;

        this.length--;
        const prev = curr.prev;
        const next = curr.next;

        if (prev) prev.next = next;
        if (next) next.prev = prev;

        if (curr === this.head) {
            this.head = next;
        }

        if (curr === this.tail) {
            this.tail = prev;
        }

        curr.next = curr.prev = undefined;
        return curr.value;
    }

    private getNodeAt(idx: number): Node<T> | undefined {
        let curr = this.head;
        for (let i = 0; curr && i < idx; i++) {
            curr = curr.next;
        }
        return curr;
    }
}
