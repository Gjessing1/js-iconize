# JS Iconize Plugin for Obsidian
A simple plugin to add emoji or Lucide icons to your files and folders in Obsidian, helping you visually organize your vault.

## Features
- **File & Folder Icons**: Assign icons to any file or folder.
- **Lucide Icon Library**: Access and search all of Obsidian's built-in Lucide icons by name.
- **Emoji Support**: Use any emoji as an icon, and search common emojis by keyword (e.g. "tree" → 🌲).
- **Custom SVG**: Paste raw `<svg>` markup to use your own icon.
- **Integrated Icon Picker**: A single, clean interface for finding the perfect icon.
    - Paste an emoji, SVG markup, or a Lucide icon name directly.
    - Unified search for both emojis and Lucide icons.
    - A "Recently used" list for quick access to your favorite icons.
- **Follows renames**: Icons stay attached when files or folders are renamed or moved.
- **Simple Management**: Easily change or remove an icon at any time.

## How to Use
1.  In the file explorer, **right-click** on the file or folder you want to add an icon to.
2.  Select **"Change icon"** from the context menu. The icon picker will open.
3.  In the picker, you have a few options:
    - **Paste an emoji, SVG or icon name**: Paste an emoji (or use your system's emoji picker: `Windows Key + .` on Windows, `Control + Command + Space` on macOS), raw `<svg>` markup, or a Lucide name like `lucide-star`, then press Enter or click **Set Icon**.
    - **Search**: Type a name or keyword like "book", "calendar", or "smile". Matching emojis are shown first, followed by Lucide icons.
    - **Select a Recent Icon**: Click on any icon in the "Recently used" section.
4.  Click the icon you want, and it will be applied instantly.

### Removing an Icon
To remove an icon, right-click the file/folder, select "Change icon", and click the **"Remove Icon"** button in the picker.

## Settings
The plugin settings page currently has only one option:
- **Clear recent icons**: This button will clear the list of recently used icons that is displayed at the top of the icon picker.

### Acknowledgements

This plugin was developed with inspiration from the original [Obsidian Iconize plugin](https://github.com/FlorianWoelki/obsidian-iconize) by Florian Woelki. All credit for the foundational concept and original implementation.
This version aims to provide a simplified and focused alternative written entirely in javascript.
