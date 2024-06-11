class Carousel {
    private images: HTMLImageElement[];
    private currentIndex: number;
    private totalImages: number;
    private prevButton: HTMLButtonElement;
    private nextButton: HTMLButtonElement;
    private controls: NodeListOf<HTMLLIElement>;
    private autoSlideTimeout: any;
  
    constructor() {
      this.images = Array.from(document.querySelectorAll('.image'));
      this.currentIndex = 2; 
      this.totalImages = this.images.length;
      this.prevButton = document.querySelector('.button:first-child')!;
      this.nextButton = document.querySelector('.button:last-child')!;
      this.controls = document.querySelectorAll('.control');
      this.autoSlideTimeout = null;
  
      this.prevButton.addEventListener('click', () => {
        this.prevImage();
        this.resetAutoSlide();
      });
  
      this.nextButton.addEventListener('click', () => {
        this.nextImage();
        this.resetAutoSlide();
      });
  
      this.controls.forEach((control, index) => {
        control.addEventListener('click', () => {
          this.moveToImage(index);
          this.resetAutoSlide();
        });
      });
  
      this.updateUI();
      this.startAutoSlide();
    }
  
    startAutoSlide(): void {
      this.autoSlideTimeout = setTimeout(() => this.nextImage(), 3000);
    }
  
    resetAutoSlide(): void {
      if (this.autoSlideTimeout) {
        clearTimeout(this.autoSlideTimeout);
      }
      this.startAutoSlide();
    }
  
    updateUI(): void {
      this.images.forEach((img, index) => {
        img.classList.remove('active', 'prev', 'next', 'hidden');
  
        if (index === this.currentIndex) {
          img.style.left = '50%';
          img.style.width = '45%';
          img.style.zIndex = '2';
          img.style.opacity = '1';
          img.style.transform = 'translateX(-50%)';
        } else if (index === (this.currentIndex - 1 + this.totalImages) % this.totalImages) {
          img.style.left = '35%';
          img.style.width = '35%';
          img.style.zIndex = '1';
          img.style.opacity = '0.9';
          img.style.transform = 'translateX(-50%)';
        } else if (index === (this.currentIndex + 1) % this.totalImages) {
          img.style.left = '65%';
          img.style.width = '35%';
          img.style.zIndex = '1';
          img.style.opacity = '0.9';
          img.style.transform = 'translateX(-50%)';
        } else if (index === (this.currentIndex - 2 + this.totalImages) % this.totalImages) {
          img.style.left = '25%';
          img.style.width = '25%';
          img.style.zIndex = '';
          img.style.opacity = '0.4';
          img.style.transform = 'translateX(-50%)';
        } else if (index === (this.currentIndex + 2) % this.totalImages) {
          img.style.left = '75%';
          img.style.width = '25%';
          img.style.zIndex = '';
          img.style.opacity = '0.4';
          img.style.transform = 'translateX(-50%)';
        } else {
          img.style.opacity = '0';
        }
      });
  
      this.controls.forEach((control, index) => {
        if (index === this.currentIndex) {
          control.classList.add('active');
        } else {
          control.classList.remove('active');
        }
      });
    }
  
    nextImage(): void {
      this.currentIndex = (this.currentIndex + 1) % this.totalImages;
      this.updateUI();
      this.resetAutoSlide();
    }
  
    prevImage(): void {
      this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
      this.updateUI();
      this.resetAutoSlide();
    }
  
    moveToImage(index: number): void {
      this.currentIndex = index;
      this.updateUI();
      this.resetAutoSlide();
    }
  }
  
  new Carousel();
  