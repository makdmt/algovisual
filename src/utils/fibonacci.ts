export function fibonacci(n: number) {
    let prePrev = 1
    let prev = 1;
    const fibonacciSeq = Array(n + 1);

    if (n < 0 || n > 19) return;
    if (n === 0) return [1];
    if (n === 1) return [1, 1];

    fibonacciSeq[0] = 1;
    fibonacciSeq[1] = 1;

    for (let i = 2; i <= n; i++) {
        fibonacciSeq[i] = prePrev + prev;
        prePrev = prev;
        prev = fibonacciSeq[i];
    }

    return fibonacciSeq;
}
