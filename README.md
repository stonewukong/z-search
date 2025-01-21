# Z-Search

I made this browser extension because I was tired of jumping tabs to find books on ZLibrary and Anna’s Archive after browsing on Amazon. Now, with this extension, you get two simple buttons right on the page—one for ZLibrary and one for Anna’s Archive. It’s made my life so much easier, and I hope it helps you too.

## Features

- **Regional ZLibrary Domains**: The extension dynamically selects the correct ZLibrary domain based on the region (e.g., `z-lib.gs`, `z-library.sk`, `1lib.sk`).
- **Direct Links to ZLibrary & Anna's Archive**: Provides easy one-click access to search the book on ZLibrary and Anna's Archive.

## Supported Amazon Domains

The extension supports a wide range of Amazon websites across different countries and regions:

- Amazon UAE (`amazon.ae`)
- Amazon Canada (`amazon.ca`)
- Amazon China (`amazon.cn`)
- Amazon Japan (`amazon.co.jp`)
- Amazon UK (`amazon.co.uk`)
- Amazon US (`amazon.com`)
- Amazon Australia (`amazon.com.au`)
- Amazon Brazil (`amazon.com.br`)
- Amazon Turkey (`amazon.com.tr`)
- Amazon Mexico (`amazon.com.mx`)
- Amazon Germany (`amazon.de`)
- Amazon Spain (`amazon.es`)
- Amazon France (`amazon.fr`)
- Amazon India (`amazon.in`)
- Amazon Italy (`amazon.it`)
- Amazon Netherlands (`amazon.nl`)
- Amazon Poland (`amazon.pl`)
- Amazon Saudi Arabia (`amazon.sa`)
- Amazon Sweden (`amazon.se`)
- Amazon Singapore (`amazon.sg`)
- Amazon Egypt (`amazon.eg`)

## Build Instructions

Follow these steps to build an exact copy of the extension:

### Prerequisites

1. Install [Node.js](https://nodejs.org/) (version 20.x or higher).
2. Install [pnpm](https://pnpm.io/)
3. Operating System: Works on macOS, Windows, and Linux.

### Steps

1. Clone the repository:

   ```bash
   git clone https://github.com/stonewukong/z-search.git
   cd z-search
   ```

2. Install dependencies:

   ```bash
   pnpm install
   ```

3. Build the extension:

   ```bash
   pnpm build // For chrome
   pnpm build:firefox // For firefox

   // For zip file
   pnpm zip
   pnpm zip:firefox
   ```

   The built extension files will be available in the .output/ directory.

4. Load the extension in Firefox:

   Chrome

   - Open chrome://extensions/.
   - Enable "Developer mode" (top-right corner).
   - Click "Load unpacked" and select the .output/chrome-mv3 directory.

   Firefox

   - Open Firefox and go to about:debugging.
   - Select "This Firefox" > "Load Temporary Add-on".
   - Choose the manifest.json file inside the .output/ folder or load the zip file

## License

Licensed under the GNU Affero General Public License Version 3.0.
