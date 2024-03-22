type Node<T> = {
    value: T;
    prev?: Node<T>;
    next?: Node<T>;
};

export default class Queue<T> {
    public length: number;
    private head?: Node<T>;
    private tail?: Node<T>;

    constructor() {
        this.length = 0;
        this.head = this.tail = undefined;
    }

    enqueue(item: T): void {
        const node = { value: item } as Node<T>;
        this.length++;
        if (!this.head) {
            this.head = this.tail = node;
            return;
        }

        this.head.prev = node;
        node.next = this.head;

        this.head = node;
    }

    deque(): T | undefined {
        if (!this.tail) {
            return undefined;
        }

        this.length--;
        const ret = this.tail;
        if (!this.tail.prev) {
            this.head = this.tail = undefined;
            return ret.value;
        }

        this.tail = this.tail.prev;
        ret.prev = undefined;
        return ret.value;
    }

    peek(): T | undefined {
        return this.tail?.value;
    }
}
