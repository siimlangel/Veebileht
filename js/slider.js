

class Slider {
    constructor(carouselSlide, carouselImages, prevBtn, nextBtn, counter) {
        this.carouselSlide = carouselSlide;
        this.carouselImages = carouselSlide.children;
        this.counter = counter;
        this.prevBtn = prevBtn;
        this.nextBtn = nextBtn;
        this.size = carouselImages[0].clientWidth;
    }


    show() {

        // Liigutab pildi nähtavale
        this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';

        // Kui next vajutatakse siis inkrementeeri counterit suuremaks ja liiguta pilte edasi
        this.nextBtn.addEventListener('click', () => {
            // Et liiga kiiresti clickides slider katki ei läheks
            if (this.counter >= this.carouselImages.length - 1) return;
            this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
            this.counter++;
            this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
        });
        // Kui next vajutatakse siis inkrementeeri counterit väiksemaks ja liiguta pilte edasi
        this.prevBtn.addEventListener('click', () => {
            // Et liiga kiiresti clickides slider katki ei läheks
            if (this.counter <= 0) return;
            this.carouselSlide.style.transition = "transform 0.4s ease-in-out";
            this.counter--;
            this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
        });

        // Kui jõuab viimase pildini siis pane counter tagasi essa pici peale
        // Kui jõuab essani siis liiguta viimase pici peale
        this.carouselSlide.addEventListener('transitionend', () => {
            
            if (this.carouselImages[this.counter].className === 'lastClone') {
                this.carouselSlide.style.transition = "none";
                this.counter = this.carouselImages.length - 2;
                this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
        
            if (this.carouselImages[this.counter].className === 'firstClone') {
                this.carouselSlide.style.transition = "none";
                this.counter = this.carouselImages.length - this.counter;
                this.carouselSlide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
        });
    }

}

// Võtab kõik sliderid docist ja kõik nupud 
const carouselSlides = document.querySelectorAll('.carousel-slide');
const prevBtns = document.querySelectorAll('.prevBtn');
const nextBtns = document.querySelectorAll('.nextBtn');

const sliders = [];

// Instanciateb iga slideri
for (let i = 0; i < carouselSlides.length; i++) {
    sliders.push(new Slider(carouselSlides[i], carouselSlides[i].children, prevBtns[i], nextBtns[i], 1));
}

// Paneb kõik sliderid tööle
for (const slider of sliders) {
    slider.show();
}

