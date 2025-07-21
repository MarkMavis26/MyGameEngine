function Enemy(scope, x, y) {
    var enemy = this;
    // Create the initial state
    enemy.state = {
        position: {
            x: x,
            y: y
        },
        moveSpeed: 1
    };

    // Set up any other constants
    var height = 20,
        width = 20;

    // Draw the player on the canvas
    enemy.render = function enemyRender() {
        scope.context.fillStyle = '#FF0000';
        scope.context.fillRect(
            enemy.state.position.x,
            enemy.state.position.y,
            width, height
        );
    };

    enemy.update = function enemyUpdate() {
        if (!scope.state.entities || !scope.state.entities.player) return;

        var player = scope.state.entities.player;

        var dx = player.state.position.x - enemy.state.position.x;
        var dy = player.state.position.y - enemy.state.position.y;

        var distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < enemy.state.moveSpeed) {
            // Close enough to stop
            enemy.state.position.x = player.state.position.x;
            enemy.state.position.y = player.state.position.y;
            return; // Stop moving
        }

        // Normalize direction vector
        var dirX = dx / distance;
        var dirY = dy / distance;

        // Move enemy toward player
        enemy.state.position.x += dirX * enemy.state.moveSpeed;
        enemy.state.position.y += dirY * enemy.state.moveSpeed;
    };

}
module.exports = Enemy;