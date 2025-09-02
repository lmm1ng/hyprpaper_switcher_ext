<img src="assets/extension_icon.png" alt="Hyprpaper Switcher icon" width="96" />

# Hyprpaper Switcher (Vicinae Extension)

Switch Hyprpaper wallpapers from a fast, searchable list with rich previews and metadata.

## Features

- Browse wallpapers from your chosen folder
- Live preview in the detail pane (full image)
- Useful metadata: file path, dimensions, and size
- One-tap apply via `hyprctl hyprpaper`
- Simple settings view to pick/change your wallpapers directory

## Requirements

- Linux with Hyprland
- Hyprpaper available via `hyprctl hyprpaper`
- The Hyprland instance signature file at `/tmp/hyprland_instance_signature`
- Images in one of: jpg, jpeg, png, webp

## Commands

- `papersw` — Open the wallpaper browser and set a wallpaper
- `papersw_settings` — Set or update the wallpapers folder path

## Quick start (development)

```bash
npm install
npm run dev
```

This starts the extension in Vicinae dev mode. Follow Vicinae’s docs for how to connect a dev extension if needed.

## Build (production)

```bash
npm run build
```

This produces a production bundle that can be distributed/installed per Vicinae guidelines.

## Usage

1. Open `papersw_settings` and set your wallpapers directory

2. Launch `papersw`

3. Search or scroll, preview the image, then choose “Set” to apply it

Notes:

- The extension reads Hyprland’s signature from `/tmp/hyprland_instance_signature` and runs:
  - `hyprctl hyprpaper unload all`
  - `hyprctl hyprpaper preload <path>`
  - `hyprctl hyprpaper wallpaper ", <path>"`
- Errors are surfaced via toasts (e.g., missing path, unreadable signature, unsupported images)

## Troubleshooting

- “Cannot load Hyprland signature” — ensure Hyprland is running and the signature file exists
- “Failed to get images from provided path” — verify the directory exists and contains supported images
- Wallpaper doesn’t change — confirm `hyprctl hyprpaper` works from your shell and Hyprpaper is enabled in your Hyprland setup

## License

MIT
