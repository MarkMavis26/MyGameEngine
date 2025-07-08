/** Game Loop Module
 * Handles updating the game state and re-rendering the canvas
 * at the configured FPS.
 */
function gameLoop(scope) {
    var loop = this;

    // Initialize timer variables
    var fps = scope.constants.targetFps, // Target FPS
        fpsInterval = 1000 / fps,        // Interval between frames in ms
        before = window.performance.now(), // Starting timestamp

        cycles = {
            new: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0
            },
            old: {
                frameCount: 0,
                startTime: before,
                sinceStart: 0 // fixed typo here
            }
        },
        resetInterval = 5,  // seconds
        resetState = 'new'; // initial cycle

    loop.fps = 0; // Expose FPS to other modules

    loop.main = function mainLoop(tframe) {
        // Request next animation frame
        loop.stopLoop = window.requestAnimationFrame(loop.main);

        // Calculate elapsed time
        var now = tframe,
            elapsed = now - before;

        if (elapsed > fpsInterval) {
            // Adjust before time for next frame
            before = now - (elapsed % fpsInterval);

            // Increment frame counts
            for (var calc in cycles) {
                ++cycles[calc].frameCount;
                cycles[calc].sinceStart = now - cycles[calc].startTime;
            }

            // Calculate FPS
            var activeCycle = cycles[resetState];
            loop.fps = Math.round(1000 / (activeCycle.sinceStart / activeCycle.frameCount) * 100) / 100;

            // Reset frame counts if needed
            var targetResetInterval = (cycles.new.frameCount === cycles.old.frameCount
                ? resetInterval * fps
                : (resetInterval * 2) * fps);

            if (activeCycle.frameCount > targetResetInterval) {
                cycles[resetState].frameCount = 0;
                cycles[resetState].startTime = now;
                cycles[resetState].sinceStart = 0;

                resetState = (resetState === 'new' ? 'old' : 'new');
            }

            // Update and render
            scope.update(now);
            scope.render();
        }
    };

    // Start the loop
    loop.main();

    return loop;
}

module.exports = gameLoop;
