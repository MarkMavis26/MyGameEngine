import pygame
import sys

# Constants
SCREEN_WIDTH, SCREEN_HEIGHT = 800, 600
FPS = 60

# Initialize Pygame
pygame.init()
screen = pygame.display.set_mode((SCREEN_WIDTH, SCREEN_HEIGHT))
pygame.display.set_caption("My Python Game Engine")
clock = pygame.time.Clock()

# Game Loop
running = True
while running:
    # Handle Events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Update Game State
    # (we'll add physics and entities later)

    # Render
    screen.fill((30, 30, 30))  # Dark gray background

    # Flip the display
    pygame.display.flip()

    # Cap the frame rate
    clock.tick(FPS)

# Clean up
pygame.quit()
sys.exit()
