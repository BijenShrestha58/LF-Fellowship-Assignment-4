var Carousel = /** @class */ (function () {
    function Carousel() {
        var _this = this;
        this.images = Array.prototype.slice.call(document.querySelectorAll('.image'));
        this.currentIndex = 2;
        this.totalImages = this.images.length;
        this.prevButton = document.querySelector('.button:first-child');
        this.nextButton = document.querySelector('.button:last-child');
        this.controls = document.querySelectorAll('.control');
        this.autoSlideTimeout = null;
        this.prevButton.addEventListener('click', function () {
            _this.prevImage();
            _this.resetAutoSlide();
        });
        this.nextButton.addEventListener('click', function () {
            _this.nextImage();
            _this.resetAutoSlide();
        });
        this.controls.forEach(function (control, index) {
            control.addEventListener('click', function () {
                _this.moveToImage(index);
                _this.resetAutoSlide();
            });
        });
        this.updateUI();
        this.startAutoSlide();
    }
    Carousel.prototype.startAutoSlide = function () {
        var _this = this;
        this.autoSlideTimeout = setTimeout(function () { return _this.nextImage(); }, 3000);
    };
    Carousel.prototype.resetAutoSlide = function () {
        if (this.autoSlideTimeout) {
            clearTimeout(this.autoSlideTimeout);
        }
        this.startAutoSlide();
    };
    Carousel.prototype.updateUI = function () {
        var _this = this;
        this.images.forEach(function (img, index) {
            img.classList.remove('active', 'prev', 'next', 'hidden');
            if (index === _this.currentIndex) {
                img.style.left = '50%';
                img.style.width = '45%';
                img.style.zIndex = '2';
                img.style.opacity = '1';
                img.style.transform = 'translateX(-50%)';
            }
            else if (index === (_this.currentIndex - 1 + _this.totalImages) % _this.totalImages) {
                img.style.left = '35%';
                img.style.width = '35%';
                img.style.zIndex = '1';
                img.style.opacity = '0.9';
                img.style.transform = 'translateX(-50%)';
            }
            else if (index === (_this.currentIndex + 1) % _this.totalImages) {
                img.style.left = '65%';
                img.style.width = '35%';
                img.style.zIndex = '1';
                img.style.opacity = '0.9';
                img.style.transform = 'translateX(-50%)';
            }
            else if (index === (_this.currentIndex - 2 + _this.totalImages) % _this.totalImages) {
                img.style.left = '25%';
                img.style.width = '25%';
                img.style.zIndex = '0';
                img.style.opacity = '0.4';
                img.style.transform = 'translateX(-50%)';
            }
            else if (index === (_this.currentIndex + 2) % _this.totalImages) {
                img.style.left = '75%';
                img.style.width = '25%';
                img.style.zIndex = '0';
                img.style.opacity = '0.4';
                img.style.transform = 'translateX(-50%)';
            }
            else {
                img.style.opacity = '0';
            }
        });
        this.controls.forEach(function (control, index) {
            if (index === _this.currentIndex) {
                control.classList.add('active');
            }
            else {
                control.classList.remove('active');
            }
        });
    };
    Carousel.prototype.nextImage = function () {
        this.currentIndex = (this.currentIndex + 1) % this.totalImages;
        this.updateUI();
        this.resetAutoSlide();
    };
    Carousel.prototype.prevImage = function () {
        this.currentIndex = (this.currentIndex - 1 + this.totalImages) % this.totalImages;
        this.updateUI();
        this.resetAutoSlide();
    };
    Carousel.prototype.moveToImage = function (index) {
        this.currentIndex = index;
        this.updateUI();
        this.resetAutoSlide();
    };
    return Carousel;
}());
new Carousel();
