# Ghosthunters

> A first-person 3D Action RPG Shooter built step by step using HTML, CSS, JavaScript, and Babylon.js.

# Vision

Ghosthunters is designed like a commercial game while remaining beginner-friendly to build. Every milestone ends with a playable game before the next feature is added.

## Core Pillars

- First-Person Shooter (FPS)
- Action RPG progression
- Large areas to explore
- Mission-based gameplay
- Weapon upgrades
- Loot and inventory
- Cosmetics (weapon skins, outfits, emotes)
- Expandable architecture

# Technology

- HTML5
- CSS3
- JavaScript (ES6)
- Babylon.js

No frameworks or build tools are required at the beginning.

# Project Structure

```
Ghosthunters/
│
├── index.html
├── style.css
├── main.js      # Starts the game
├── game.js      # Creates the Babylon scene
├── player.js    # FPS controller
├── world.js     # World creation
└── assets/
    ├── models/
    ├── textures/
    ├── sounds/
    └── ui/
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

WASD - Move

Mouse - Look

Left Click - Shoot

Right Click - Aim

Shift - Sprint

Space - Jump

R - Reload

E - Interact

F - Melee

Tab - Inventory

Esc - Pause

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
