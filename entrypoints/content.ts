export default defineContentScript({
  matches: [
    '*://*.amazon.ae/*',
    '*://*.amazon.ca/*',
    '*://*.amazon.cn/*',
    '*://*.amazon.co.jp/*',
    '*://*.amazon.co.uk/*',
    '*://*.amazon.com/*',
    '*://*.amazon.com.au/*',
    '*://*.amazon.com.be/*',
    '*://*.amazon.com.br/*',
    '*://*.amazon.com.tr/*',
    '*://*.amazon.com.mx/*',
    '*://*.amazon.de/*',
    '*://*.amazon.es/*',
    '*://*.amazon.eg/*',
    '*://*.amazon.fr/*',
    '*://*.amazon.in/*',
    '*://*.amazon.it/*',
    '*://*.amazon.nl/*',
    '*://*.amazon.pl/*',
    '*://*.amazon.sa/*',
    '*://*.amazon.se/*',
    '*://*.amazon.sg/*',
  ],
  main() {
    const isBookPage = (): boolean => {
      const breadcrumb = document.querySelector(
        '#wayfinding-breadcrumbs_feature_div'
      );
      if (
        breadcrumb &&
        breadcrumb.textContent?.toLowerCase().includes('book')
      ) {
        return true;
      }

      // Check for meta keywords that include "book"
      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (
        metaKeywords &&
        metaKeywords.getAttribute('content')?.toLowerCase().includes('book')
      ) {
        return true;
      }

      // Check if "ISBN" or "pages" is mentioned in the product details section
      const productDetails =
        document.querySelector('#productDetailsTable') ||
        document.querySelector('#detailBullets_feature_div');
      if (
        productDetails &&
        /isbn|pages/i.test(productDetails.textContent || '')
      ) {
        return true;
      }

      // Default to false if no indicators are found
      return false;
    };

    if (isBookPage()) {
      const bookTitle = document.getElementById(
        'productTitle'
      ) as HTMLSpanElement;

      const createSearchButton = (text: string, url: string) => {
        const button = document.createElement('a');

        button.href = url;
        button.target = '_blank';
        button.role = 'button';
        button.className = 'a-button a-button-primary';
        button.style.width = '100%';
        button.style.boxSizing = 'border-box';
        button.style.margin = '0px';

        const innerSpan = document.createElement('span');
        innerSpan.className = 'a-button-inner';

        const textSpan = document.createElement('span');
        textSpan.className = 'a-button-text';
        textSpan.style.textAlign = 'center';
        textSpan.textContent = text;

        innerSpan.appendChild(textSpan);
        button.appendChild(innerSpan);

        return button;
      };

      const encodeQuery = (query: string): string =>
        encodeURIComponent(query.trim());

      const zLibraryURL = `https://z-lib.gs/s/${encodeURIComponent(
        bookTitle.innerText
      )}/?content_type=book`;
      const annaArchiveURL = `https://annas-archive.org/search?index=&page=1&q=${encodeQuery(
        bookTitle.innerText
      )}&display=&sort=`;

      const container = document.querySelector('#tmmSwatchesList');
      const exBtnContainer = document.createElement('div');
      exBtnContainer.style.paddingTop = '8px';
      exBtnContainer.style.paddingRight = '6px';
      exBtnContainer.style.paddingBottom = '12px';
      exBtnContainer.style.paddingLeft = '6px';
      exBtnContainer.style.display = 'flex';
      exBtnContainer.style.flexDirection = 'column';
      exBtnContainer.style.gap = '8px'; // Add spacing between buttons

      if (container) {
        // Create buttons
        const zLibraryButton = createSearchButton(
          'Search on ZLibrary',
          zLibraryURL
        );
        const annaArchiveButton = createSearchButton(
          "Search on Anna's Archive",
          annaArchiveURL
        );

        exBtnContainer.appendChild(zLibraryButton);
        exBtnContainer.appendChild(annaArchiveButton);
        container.appendChild(exBtnContainer);
      }
    } else {
      console.log('Not a book');
    }
  },
});
