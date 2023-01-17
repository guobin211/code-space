export class AnimateBall {
  node: HTMLDivElement | undefined;
  // 初始位置
  left = 0;
  top = 0;
  // 目标点
  pLeft = 0;
  pTop = 0;
  // 当前位置
  nLeft = 0;
  nTop = 0;
  raf = 0;
  // 偏移量
  px = 0;
  py = 0;
  speed = 16;

  constructor() {
    if (typeof document !== 'undefined') {
      const node = document.createElement('div');
      node.className = 'animate-ball';
      node.style.width = '10px';
      node.style.height = '10px';
      node.style.borderRadius = '5px';
      node.style.background = '#FFD934';
      node.style.zIndex = '1003';
      node.style.position = 'fixed';
      node.style.display = 'none';
      document.body.appendChild(node);
      this.node = node;
    }
  }

  start(from: Position, to: DOMRect) {
    this.left = from.x;
    this.top = from.y;
    this.nLeft = this.left;
    this.nTop = this.top;
    this.pLeft = to.left + to.width / 2;
    this.pTop = to.top + to.height / 2;
    const dx = this.pLeft - this.left;
    const dy = this.pTop - this.top;
    const step = Math.sqrt(dx * dx + dy * dy) / this.speed;
    this.px = (this.pLeft - this.left) / step;
    this.py = (this.pTop - this.top) / step;
    this.hiddenNode();
    this.showNode(from.x, from.y);
    this.move();
  }

  showNode(left: number, top: number) {
    if (this.node) {
      this.node.style.left = `${left}px`;
      this.node.style.top = `${top}px`;
      this.node.style.display = 'block';
    }
  }

  hiddenNode() {
    if (this.node) {
      this.node.style.display = 'none';
    }
  }

  move() {
    const { left, top } = this.getNextStyle();
    if (this.node && top > this.pTop) {
      this.node.style.left = `${left}px`;
      this.node.style.top = `${top}px`;
      this.nLeft = left;
      this.nTop = top;
    } else {
      this.hiddenNode();
      cancelAnimationFrame(this.raf);
      return;
    }
    this.raf = requestAnimationFrame(() => {
      this.move();
    });
  }

  getNextStyle() {
    const left = this.nLeft + this.px;
    const top = this.nTop + this.py;
    return {
      left,
      top,
    };
  }
}

export interface Position {
  x: number;
  y: number;
}
