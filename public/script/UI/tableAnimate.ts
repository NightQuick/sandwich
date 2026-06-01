export class Slider {
  el: HTMLDivElement | null;
  tableEl: HTMLElement | null;
  targetTop: number;
  targetHeight: number;
  currentTop: number;
  currentHeight: number;
  isVisible: boolean;
  private abortController: AbortController | null;

  constructor() {
    this.el = null;
    this.tableEl = null;
    this.targetTop = 0;
    this.targetHeight = 0;
    this.currentTop = 0;
    this.currentHeight = 0;
    this.isVisible = false;
    this.abortController = null;
  }

  lerp(a: number, b: number, t: number): number {
    return a + (b - a) * t;
  }

  animate() {
    this.currentTop = this.lerp(this.currentTop, this.targetTop, 0.16);
    this.currentHeight = this.lerp(this.currentHeight, this.targetHeight, 0.16);
    this.el!.style.top = this.currentTop + 'px';
    this.el!.style.height = this.currentHeight + 'px';
    requestAnimationFrame(() => this.animate());
  }

  create(tableEl: HTMLElement) {
    this.tableEl = tableEl;

    this.el = document.createElement('div');
    this.el.className = 'menu-slider';
    this.tableEl.prepend(this.el);

    this.abortController = new AbortController();
    const { signal } = this.abortController;

    this.tableEl.addEventListener(
      'mouseover',
      (e) => {
        const tr = (e.target as Element).closest('tr');
        if (!tr) return;

        const tableRect = this.tableEl!.getBoundingClientRect();
        const rowRect = tr.getBoundingClientRect();

        if (!this.isVisible) {
          this.currentTop = rowRect.top - tableRect.top;
          this.currentHeight = rowRect.height;
          this.isVisible = true;
        }

        this.targetTop = rowRect.top - tableRect.top;
        this.targetHeight = rowRect.height;
        this.el!.classList.add('menu-slider--visible');
      },
      { signal }
    );

    this.tableEl.addEventListener(
      'mouseout',
      (e) => {
        if (!e.relatedTarget || !this.tableEl!.contains(e.relatedTarget as Node)) {
          this.el!.classList.remove('menu-slider--visible');
          this.isVisible = false;
        }
      },
      { signal }
    );

    this.animate();
  }

  destroy() {
    this.abortController?.abort();
    this.el?.remove();
    this.el = null;
  }
}

export const slider = new Slider();
