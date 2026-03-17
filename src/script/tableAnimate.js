export class Slider {
  constructor(tableId) {
    this.el = null;
    this.tableId = tableId;
    this.targetTop = 0;
    this.targetHeight = 0;
    this.currentTop = 0;
    this.currentHeight = 0;
    this.isVisible = false;
  }

  lerp(a, b, t) {
    return a + (b - a) * t;
  }

  animate() {
    this.currentTop = this.lerp(this.currentTop, this.targetTop, 0.16);
    this.currentHeight = this.lerp(this.currentHeight, this.targetHeight, 0.16);
    this.el.style.top = this.currentTop + 'px';
    this.el.style.height = this.currentHeight + 'px';
    requestAnimationFrame(() => this.animate());
  }

  create() {
    const table = document.getElementById(this.tableId);

    this.el = document.createElement('div');
    this.el.className = 'menu-slider';
    table.prepend(this.el);

    table.addEventListener('mouseover', (e) => {
      const tr = e.target.closest('tr');
      if (!tr) return;

      const tableRect = table.getBoundingClientRect();
      const rowRect = tr.getBoundingClientRect();

      if (!this.isVisible) {
        this.currentTop = rowRect.top - tableRect.top;
        this.currentHeight = rowRect.height;
        this.isVisible = true;
      }

      this.targetTop = rowRect.top - tableRect.top;
      this.targetHeight = rowRect.height;
      this.el.classList.add('menu-slider--visible');
    });

    table.addEventListener('mouseout', (e) => {
      if (!e.relatedTarget || !table.contains(e.relatedTarget)) {
        this.el.classList.remove('menu-slider--visible');
        this.isVisible = false;
      }
    });

    this.animate();
  }
}
export const slider = new Slider('menu-switcher');
