import { Component, ElementRef, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SiteNavbarComponent } from '../../shared/site-navbar/site-navbar.component';
import { SiteFooterComponent } from '../../shared/site-footer/site-footer.component';
interface Stage {
  w: number;
  h: number;
}

interface Branch {
  x: number;
  y: number;
  act: boolean;
  l: number;
  tl: number;
  a: number;
  s: number;
  w: number;
}

interface Leaf {
  x: number;
  y: number;
  w: number;
  sz: number;
  h: number;
  a: number;
}

interface Apple {
  x: number;
  y: number;
  w: number;
  sz: number;
}
@Component({
  selector: 'app-tree',
  standalone: true,
  imports: [SiteNavbarComponent, SiteFooterComponent],
  templateUrl: './tree.component.html',
  styleUrl: './tree.component.css'
})
export class TreeComponent {
  points: number = 0;
  maxApples: number = 30; // أقصى عدد تفاحات

  @ViewChild('canvas', { static: false }) canvasRef!: ElementRef<HTMLCanvasElement>;

  constructor(private _ActivatedRoute: ActivatedRoute) {
    this._ActivatedRoute.paramMap.subscribe({
      next: (x) => {
        this.points = parseInt(`${x.get('points')}`);
      },
    });
  }

  private ctx!: CanvasRenderingContext2D;
  private stage: Stage = { w: window.innerWidth, h: window.innerHeight }; // حجم الشاشة
  private branches: Branch[] = [];
  private leaves: Leaf[] = [];
  private apples: Apple[] = [];
  private timer = 0;

  ngAfterViewInit() {
    const canvas = this.canvasRef.nativeElement;
    this.resizeCanvas(); // تعيين حجم الـ canvas أول مرة
    this.ctx = canvas.getContext('2d') as CanvasRenderingContext2D;

    // Initialize tree
    this.branches.push({ x: this.stage.w / 2, y: this.stage.h, act: true, l: 0, tl: this.stage.h / 2 - 100, a: Math.PI, s: 0, w: 15 });

    this.animate();

    // إعادة تعيين حجم الـ canvas عند تغيير حجم النافذة
    window.addEventListener('resize', () => this.resizeCanvas());
  }

  private resizeCanvas() {
    const canvas = this.canvasRef.nativeElement;
    this.stage.w = window.innerWidth; // تحديث العرض بناءً على حجم النافذة
    this.stage.h = window.innerHeight; // تحديث الارتفاع بناءً على حجم النافذة
    canvas.width = this.stage.w;
    canvas.height = this.stage.h;
  }

  private drawApple(x: number, y: number, w: number) {
    this.ctx.lineWidth = 2;
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x, y + w / 2);
    this.ctx.stroke();
    this.ctx.fillStyle = '#e74c3c';

    this.ctx.beginPath();
    this.ctx.arc(x - w / 3, y + w / 4 + w / 2, w / 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(x + w / 3, y + w / 4 + w / 2, w / 2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(x + w / 4, y + w / 2 + w / 4 + w / 2, w / 2.2, 0, Math.PI * 2);
    this.ctx.fill();

    this.ctx.beginPath();
    this.ctx.arc(x - w / 4, y + w / 2 + w / 4 + w / 2, w / 2.2, 0, Math.PI * 2);
    this.ctx.fill();
  }

  private engineStep() {
    this.ctx.clearRect(0, 0, this.stage.w, this.stage.h);
    this.timer++;

    if (this.timer > 10000) {
      this.branches = [{ x: this.stage.w / 2, y: this.stage.h, act: true, l: 0, tl: this.stage.h / 2 - 100, a: Math.PI, s: 0, w: 15 }];
      this.leaves = [];
      this.apples = [];
      this.timer = 5000;
    }

    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = '#e67e22';

    this.branches.forEach(b => {
      if (b.s < 5) {
        this.ctx.lineWidth = b.w;
        if (b.l < b.tl - 3) {
          b.l += (b.tl - b.l) / 8;
        } else if (b.act) {
          b.act = false;
          if (b.s === 4) {
            // توليد التفاحات بناءً على عدد النقاط
            const applesCount = Math.min(this.points, this.maxApples);
            if (this.apples.length < applesCount && Math.random() * 30 < 1) {
              this.apples.push({ x: b.x + Math.sin(b.a) * b.l, y: b.y + Math.cos(b.a) * b.l, w: 0, sz: Math.random() * 5 + 8 });
            } else {
              this.leaves.push({ x: b.x + Math.sin(b.a) * b.l, y: b.y + Math.cos(b.a) * b.l, w: 0, sz: Math.random() * 5 + 8, h: 0, a: Math.PI * 1.5 - b.a });
            }
          } else {
            for (let i = 0; i < 5; i++) {
              this.branches.push({ x: b.x + Math.sin(b.a) * b.l, y: b.y + Math.cos(b.a) * b.l, act: true, l: 0, tl: Math.random() * (150 - b.s * 35) + 20, a: b.a + Math.random() * Math.PI - Math.PI / 2, s: b.s + 1, w: b.w * 0.5 });
            }
          }
        }
        this.ctx.beginPath();
        this.ctx.moveTo(b.x, b.y);
        this.ctx.lineTo(b.x + Math.sin(b.a) * b.l, b.y + Math.cos(b.a) * b.l);
        this.ctx.stroke();
      }
    });

    this.ctx.fillStyle = '#2ecc71';
    this.leaves.forEach(l => {
      l.w += (l.sz - l.w) / 10;
      l.h += (l.sz / 2 - l.h) / 10;
      this.ctx.beginPath();
      this.ctx.ellipse(l.x, l.y, l.w, l.h, l.a, 0, Math.PI * 2);
      this.ctx.fill();
    });

    this.apples.forEach(a => {
      a.w += (a.sz - a.w) / 10;
      this.drawApple(a.x, a.y, a.w);
    });
  }

  private animate() {
    requestAnimationFrame(() => this.animate());
    this.engineStep();
  }
}

