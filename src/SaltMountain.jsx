import React, { useEffect, useRef } from 'react';

const SaltMountain = () => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return undefined;

        const ctx = canvas.getContext('2d', { alpha: true });
        if (!ctx) return undefined;

        // Mantemos o canvas com a mesma resolução visual, mas simulamos
        // células maiores. Isso reduz drasticamente a quantidade de cálculos.
        const width = 400;
        const height = 400;
        const cellSize = 4;
        const cols = Math.floor(width / cellSize);
        const rows = Math.floor(height / cellSize);
        const totalCells = cols * rows;

        canvas.width = width;
        canvas.height = height;

        // Uint8Array é muito mais leve que uma matriz 2D de arrays.
        let grid = new Uint8Array(totalCells);
        let nextGrid = new Uint8Array(totalCells);

        const saltColors = [
            'transparent',
            'rgba(255, 255, 255, 0.9)',
            'rgba(135, 206, 250, 0.7)',
            'rgba(255, 182, 193, 0.7)',
            'rgba(65, 105, 225, 0.7)',
            'rgba(255, 223, 0, 0.7)',
        ];

        const prefersReducedMotion = window.matchMedia(
            '(prefers-reduced-motion: reduce)'
        ).matches;

        // 30 FPS já é mais do que suficiente para uma animação de fundo.
        // Para quem prefere menos movimento, reduzimos ainda mais.
        const targetFps = prefersReducedMotion ? 12 : 30;
        const frameInterval = 1000 / targetFps;

        let animationFrameId = null;
        let lastFrameTime = 0;
        let isVisible = false;
        let pageIsVisible = !document.hidden;

        const getIndex = (x, y) => y * cols + x;

        const spawnParticle = () => {
            const centerX = Math.floor(cols / 2);
            const spawnX = Math.max(
                0,
                Math.min(cols - 1, centerX + Math.floor(Math.random() * 5 - 2))
            );

            const index = getIndex(spawnX, 0);

            if (grid[index] !== 0) return;

            let particleType = 1;
            if (Math.random() > 0.9) {
                particleType = Math.floor(Math.random() * 4) + 2;
            }

            grid[index] = particleType;
        };

        const updateSimulation = () => {
            nextGrid.fill(0);

            // Percorre de baixo para cima para manter o comportamento estável.
            for (let y = rows - 1; y >= 0; y -= 1) {
                for (let x = 0; x < cols; x += 1) {
                    const currentIndex = getIndex(x, y);
                    const state = grid[currentIndex];

                    if (state === 0) continue;

                    if (y === rows - 1) {
                        nextGrid[currentIndex] = state;
                        continue;
                    }

                    const belowIndex = getIndex(x, y + 1);
                    const direction = Math.random() > 0.5 ? 1 : -1;
                    const firstDiagonalX = x + direction;
                    const secondDiagonalX = x - direction;

                    if (grid[belowIndex] === 0 && nextGrid[belowIndex] === 0) {
                        nextGrid[belowIndex] = state;
                        continue;
                    }

                    if (firstDiagonalX >= 0 && firstDiagonalX < cols) {
                        const diagonalIndex = getIndex(firstDiagonalX, y + 1);

                        if (
                            grid[diagonalIndex] === 0 &&
                            nextGrid[diagonalIndex] === 0
                        ) {
                            nextGrid[diagonalIndex] = state;
                            continue;
                        }
                    }

                    if (secondDiagonalX >= 0 && secondDiagonalX < cols) {
                        const diagonalIndex = getIndex(secondDiagonalX, y + 1);

                        if (
                            grid[diagonalIndex] === 0 &&
                            nextGrid[diagonalIndex] === 0
                        ) {
                            nextGrid[diagonalIndex] = state;
                            continue;
                        }
                    }

                    nextGrid[currentIndex] = state;
                }
            }

            const previousGrid = grid;
            grid = nextGrid;
            nextGrid = previousGrid;
        };

        const renderSimulation = () => {
            ctx.clearRect(0, 0, width, height);

            for (let y = 0; y < rows; y += 1) {
                for (let x = 0; x < cols; x += 1) {
                    const particle = grid[getIndex(x, y)];
                    if (particle === 0) continue;

                    ctx.fillStyle = saltColors[particle];
                    ctx.fillRect(
                        x * cellSize,
                        y * cellSize,
                        cellSize,
                        cellSize
                    );
                }
            }
        };

        const stopAnimation = () => {
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
                animationFrameId = null;
            }
        };

        const animate = (timestamp) => {
            if (!isVisible || !pageIsVisible) {
                animationFrameId = null;
                return;
            }

            const elapsed = timestamp - lastFrameTime;

            if (elapsed >= frameInterval) {
                lastFrameTime = timestamp - (elapsed % frameInterval);

                spawnParticle();
                updateSimulation();
                renderSimulation();
            }

            animationFrameId = requestAnimationFrame(animate);
        };

        const startAnimation = () => {
            if (
                animationFrameId === null &&
                isVisible &&
                pageIsVisible
            ) {
                lastFrameTime = performance.now();
                animationFrameId = requestAnimationFrame(animate);
            }
        };

        // A simulação só roda enquanto o canvas está realmente na viewport.
        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible = entry.isIntersecting;

                if (isVisible) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            {
                threshold: 0.05,
                rootMargin: '100px 0px',
            }
        );

        const handleVisibilityChange = () => {
            pageIsVisible = !document.hidden;

            if (pageIsVisible) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        observer.observe(canvas);
        document.addEventListener('visibilitychange', handleVisibilityChange);

        // Desenha o estado inicial para evitar um canvas vazio antes da entrada.
        renderSimulation();

        return () => {
            stopAnimation();
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibilityChange);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            aria-hidden="true"
            style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
            }}
        />
    );
};

export default SaltMountain;
