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
    const getLanguageAndZLibraryDomain = (
      url: string
    ): { language: string; zLibraryDomain: string } => {
      const domain = new URL(url).hostname;
      const countryCode = domain.split('.')[1];

      const regionMap: Record<
        string,
        { language: string; zLibraryDomain: string }
      > = {
        ae: { language: 'ar', zLibraryDomain: 'z-lib.fm' }, // Arabic (UAE)
        ca: { language: 'en', zLibraryDomain: 'z-library.sk' }, // English (Canada)
        cn: { language: 'zh', zLibraryDomain: 'z-lib.gs' }, // Chinese (China)
        jp: { language: 'ja', zLibraryDomain: 'z-lib.fm' }, // Japanese (Japan)
        'co.jp': { language: 'ja', zLibraryDomain: 'z-lib.fm' }, // Japanese (Japan)
        uk: { language: 'en', zLibraryDomain: 'z-library.sk' }, // English (UK)
        us: { language: 'en', zLibraryDomain: 'z-library.sk' }, // English (US)
        'com.au': { language: 'en', zLibraryDomain: 'z-library.sk' }, // English (Australia)
        'com.br': { language: 'pt', zLibraryDomain: 'z-lib.gs' }, // Portuguese (Brazil)
        'com.tr': { language: 'tr', zLibraryDomain: 'z-lib.fm' }, // Turkish (Turkey)
        'com.mx': { language: 'es', zLibraryDomain: 'z-lib.gs' }, // Spanish (Mexico)
        de: { language: 'de', zLibraryDomain: 'z-lib.fm' }, // German (Germany)
        es: { language: 'es', zLibraryDomain: 'es.1lib.sk' }, // Spanish (Spain)
        fr: { language: 'fr', zLibraryDomain: 'z-lib.gs' }, // French (France)
        in: { language: 'hi', zLibraryDomain: 'z-library.sk' }, // Hindi (India)
        it: { language: 'it', zLibraryDomain: 'it.1lib.sk' }, // Italian (Italy)
        nl: { language: 'nl', zLibraryDomain: 'z-lib.fm' }, // Dutch (Netherlands)
        pl: { language: 'pl', zLibraryDomain: 'z-lib.gs' }, // Polish (Poland)
        sa: { language: 'ar', zLibraryDomain: 'z-lib.fm' }, // Arabic (Saudi Arabia)
        se: { language: 'sv', zLibraryDomain: 'z-lib.fm' }, // Swedish (Sweden)
        sg: { language: 'en', zLibraryDomain: 'z-library.sk' }, // English (Singapore)
        eg: { language: 'ar', zLibraryDomain: 'z-lib.fm' }, // Arabic (Egypt)
      };

      return (
        regionMap[countryCode] || {
          language: 'en',
          zLibraryDomain: 'z-library.sk',
        }
      ); // Default to English (US)
    };

    const isBookPage = (): boolean => {
      const bookKeywords = [
        'book',
        'livre',
        'Buch',
        'libro',
        'livro',
        '書籍',
        'книга',
        'buch',
        'tome',
        'cahier',
      ];

      const breadcrumb = document.querySelector(
        '#wayfinding-breadcrumbs_feature_div'
      );
      if (breadcrumb) {
        const breadcrumbText = breadcrumb.textContent?.toLowerCase();
        if (bookKeywords.some((keyword) => breadcrumbText?.includes(keyword))) {
          return true;
        }
      }

      const metaKeywords = document.querySelector('meta[name="keywords"]');
      if (metaKeywords) {
        const keywordsContent = metaKeywords
          .getAttribute('content')
          ?.toLowerCase();
        if (
          bookKeywords.some((keyword) => keywordsContent?.includes(keyword))
        ) {
          return true;
        }
      }

      const productDetails =
        document.querySelector('#productDetailsTable') ||
        document.querySelector('#detailBullets_feature_div');
      if (
        productDetails &&
        /isbn|pages/i.test(productDetails.textContent || '')
      ) {
        return true;
      }

      return false;
    };

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

    if (isBookPage()) {
      const bookTitle = document.getElementById(
        'productTitle'
      ) as HTMLSpanElement;
      const { zLibraryDomain } = getLanguageAndZLibraryDomain(
        window.location.href
      );
      const encodedBookTitle = encodeURIComponent(bookTitle.innerText.trim());

      const zLibraryURL = `https://${zLibraryDomain}/s/${encodedBookTitle}/?content_type=book`;
      const annaArchiveURL = `https://annas-archive.org/search?index=&page=1&q=${encodedBookTitle}&display=&sort=`;

      const container = document.querySelector('#tmmSwatchesList');
      const exBtnContainer = document.createElement('div');
      exBtnContainer.style.paddingTop = '8px';
      exBtnContainer.style.paddingRight = '6px';
      exBtnContainer.style.paddingBottom = '12px';
      exBtnContainer.style.paddingLeft = '6px';
      exBtnContainer.style.display = 'flex';
      exBtnContainer.style.flexDirection = 'column';
      exBtnContainer.style.gap = '8px';

      if (container) {
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
