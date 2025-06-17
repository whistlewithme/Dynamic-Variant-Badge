# Variant Badge for Shopify Product Pages

## Overview

`variantBadge` is a lightweight JavaScript utility that displays a badge on Shopify product pages, showing the currently selected product variant(s). The badge appears over the product image and fades out after a short duration. This helps users quickly see their current selection, improving the shopping experience.

## Features
- **Dynamic Badge:** Shows the selected variant(s) as a badge overlay on the product image.
- **Fade Animation:** Badge fades in when a selection is made and fades out after 1 second.
- **Debounced Updates:** Handles rapid user interactions efficiently, updating the badge only after the user stops clicking for a short moment.
- **Console Logging:** Logs the current badge text to the browser console for debugging.
- **No Dependencies:** Pure JavaScript, no external libraries required.

## How It Works
- The script looks for radio button groups with the class `.product-form__input` (Shopify's default for variant selectors).
- When a user selects a variant, the badge updates to show the current selection.
- The badge is styled and positioned absolutely in the top-right corner of the product image container (`.product__media-wrapper`).
- The script uses debouncing to avoid redundant updates and logs.

## Installation & Usage
1. **Copy the entire contents of `variant-badge.js`.**
2. **Paste it directly into your browser's console on the Shopify product page.**
   - Open the product page in your browser.
   - Press `F12` or `Ctrl+Shift+I` (Windows/Linux) or `Cmd+Option+I` (Mac) to open Developer Tools.
   - Go to the `Console` tab.
   - Paste the script and press `Enter`.
3. **Ensure your product form uses Shopify's default structure:**
   - Variant options are grouped in elements with the class `.product-form__input`.
   - Each option uses radio buttons (`<input type="radio">`).
   - The product image container uses the class `.product__media-wrapper`.

## Customization
- You can adjust the badge's appearance by editing the `config.badgeStyle` object in the script.
- To change the fade duration, modify the `setTimeout` value in the `updateBadge` function.

## Notes
- The script is designed for Shopify's default product form structure. If your theme uses different classes or markup, you may need to adjust the selectors in the script.
- The badge will only appear when at least one variant is selected.
- The script is self-initializing and requires no manual setup after inclusion.
