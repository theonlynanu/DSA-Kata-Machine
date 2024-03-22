function walk(
    maze: string[],
    wall: string,
    curr: Point,
    end: Point,
    seen: boolean[][],
    path: Point[],
) {
    // Set up base cases
    if (
        curr.y < 0 ||
        curr.y >= maze.length ||
        curr.x < 0 ||
        curr.x >= maze[0].length
    ) {
        return false;
    }

    if (maze[curr.y][curr.x] === wall) {
        return false;
    }

    if (curr.y === end.y && curr.x === end.x) {
        path.push(curr);
        return true;
    }

    if (seen[curr.y][curr.x]) {
        return false;
    }

    // Pre-recursion steps
    seen[curr.y][curr.x] = true;
    path.push(curr);

    // Recursion
    const dirs = [
        [0, 1],
        [1, 0],
        [0, -1],
        [-1, 0],
    ];

    for (let i = 0; i < 4; i++) {
        const dir = dirs[i];
        const next = { x: curr.x + dir[0], y: curr.y + dir[1] } as Point;
        if (walk(maze, wall, next, end, seen, path)) {
            return true;
        }
    }

    path.pop();

    return false;
}

export default function solve(
    maze: string[],
    wall: string,
    start: Point,
    end: Point,
): Point[] {
    const path: Point[] = [];
    const seen: boolean[][] = [];

    for (let i = 0; i < maze.length; i++) {
        seen.push(new Array(maze[0].length).fill(false));
    }

    walk(maze, wall, start, end, seen, path);

    return path;
}
