# Ghosthunters

> A first-person 3D Action RPG Shooter built step by step using HTML, CSS, JavaScript, and Babylon.js.

## Vision

Ghosthunters is a first-person shooter with RPG progression, missions, exploration and weapon customization. The project is intentionally developed one feature at a time so it always remains playable.

## Core Pillars

- First-Person Shooter (FPS)
- Action RPG progression
- Large areas to explore
- Mission-based gameplay
- Weapon upgrades
- Loot and inventory
- Cosmetics (weapon skins, outfits, emotes)
- Expandable architecture


## Design Goals

- Keep the code beginner-friendly.
- Build one feature at a time.
- Test every milestone.
- Keep the project playable after every change.
- Expand only when needed.

# Technology

- HTML5
- CSS3
- JavaScript (no frameworks)
- Babylon.js

## JavaScript Philosophy

This project **does not use ES modules (`import` / `export`)**.

Reason:
- The game should run by simply opening `index.html`.
- No local web server is required.
- JavaScript files are loaded with normal `<script>` tags.

# Project Structure

```text
Ghosthunters/
│
├── index.html        # Loads Babylon.js and all scripts
├── style.css         # Global styles
│
├── main.js           # Starts the game
├── game.js           # Creates and manages the scene
├── player.js         # Player and FPS camera
├── world.js          # World creation
│
└── assets/
    ├── models/
    ├── textures/
    ├── sounds/
    └── ui/
```

## File Responsibilities

### index.html
- Game canvas
- Loads Babylon.js
- Loads project JavaScript files

### style.css
- Fullscreen layout
- Canvas styling

### main.js
- Create Babylon engine
- Start the game
- Render loop
- Window resize

### game.js
- Create scene
- Create lighting
- Create player
- Create world
- Manage high-level game setup

### player.js
Current:
- FPS camera

Future:
- Movement
- Sprint
- Jump
- Shooting
- Health
- Inventory

### world.js
Current:
- Ground

Future:
- Buildings
- Trees
- Roads
- Props
- Mission locations

## File Flow

```text
index.html
    │
    ▼
main.js
    │
    ▼
game.js
  │      │
  ▼      ▼
world.js player.js
```

# Coding Standards

- Keep files focused on one responsibility.
- Use const/let instead of var.
- camelCase for variables and functions.
- PascalCase for classes.
- Prefer reusable functions.
- Keep code readable over clever.
- Add one feature at a time.
- Test after every milestone.
- Refactor only when necessary.

# Player Controls

- W A S D - Move
- Mouse - Look
- Left Click - Fire
- Right Click - Aim
- Shift - Sprint
- Space - Jump
- R - Reload
- E - Interact
- F - Melee
- Tab - Inventory
- Esc - Pause

# Gameplay Loop

1. Accept a mission.
2. Explore an area.
3. Defeat enemies.
4. Collect loot.
5. Gain XP and coins.
6. Upgrade weapons.
7. Unlock new missions and regions.

# RPG Systems

- Player level
- XP
- Skills
- Inventory
- Weapon upgrades
- Loot
- Currency
- Cosmetic customization

# Game Design Rules

- Fun comes before realism.
- Simplicity over complexity.
- Build one feature at a time.
- Finish features before starting new ones.
- Avoid unnecessary dependencies.
- Every new system must improve gameplay.

# World

Planned regions:

- Training Base
- Desert Outpost
- City District
- Forest Facility
- Snow Mountains
- Harbor
- Industrial Zone
- Secret Research Lab

# Mission Types

- Elimination
- Rescue
- Defense
- Escort
- Capture
- Exploration
- Boss Battle
# Development Roadmap

## Milestone 1 - Foundation
- Babylon.js setup
- FPS camera
- Player movement
- Jump
- Sprint
- Ground and lighting

## Milestone 2 - Combat
- Shooting
- Weapon system
- Enemy AI
- Health
- Damage
- Enemy death

## Milestone 3 - RPG
- XP
- Levels
- Inventory
- Loot
- Weapon upgrades
- Save system

## Milestone 4 - Missions
- Mission board
- Objectives
- Rewards
- Progress tracking

## Milestone 5 - World
- Multiple explorable areas
- NPCs
- Collectibles
- Side missions
- Bosses

## Milestone 6 - Polish
- UI improvements
- Sound
- Visual effects
- Performance optimization
- Architecture ready for future multiplayer

# Development Philosophy

Build slowly. Build cleanly. Keep the game playable at all times. Every new feature should extend the existing systems instead of replacing them.

## Development Rules

- One feature at a time.
- One small change at a time.
- Keep files focused on one responsibility.
- Use `const` and `let`.
- Avoid unnecessary complexity.
- Only create new files when they are actually needed.
- Never rewrite working systems without a good reason.

Future save data:

- Player
- Weapons
- Inventory
- XP
- Missions
- Settings
