import View from './View.js';
import icons from 'url:../../../src/img/icons.svg'; // parcel 2

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;

      const goToPage = +btn.dataset.goto;

      handler(goToPage);
    });
  }

  _generateMarkup() {
    const currentPage = this._data.page;
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    const prevButton = `
    <button data-goto="${
      currentPage - 1
    }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>${currentPage - 1}</span>
    </button>
    `;
    const nextButton = `
    <button data-goto="${
      currentPage + 1
    }" class="btn--inline pagination__btn--next">
      <span>${currentPage + 1}</span>
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-right"></use>
      </svg>
    </button>
    `;

    // page 1, with other pages
    if (currentPage === 1 && numPages > 1) {
      return nextButton;
    }

    // last page
    if (currentPage === numPages && numPages > 1) {
      return prevButton;
    }

    // other page
    if (currentPage < numPages) {
      return `${prevButton}${nextButton}`;
    }

    return '';
  }
}

export default new PaginationView();
