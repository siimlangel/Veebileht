


class Slideshow {

    constructor(slide, images, counter) {
        this.slide = slide;
        this.images = slide.children;
        this.counter = counter;
        this.size = images[0].clientWidth;
        this.interval = 5000;
    }

    // Liiguta slide edasi iga interval ms tagant paremale
    scrollRight() {
        
        
        setInterval(() => {
            this.slide.style.transition = "transform 0.8s ease-in-out";
            this.counter++;
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            
            
        }, this.interval);
    }
    // Liiguta slide edasi iga interval ms tagant vasakule
    scrollLeft() {
        setInterval(() => {
            
            this.slide.style.transition = "transform 0.8s ease-in-out";
            this.counter--;
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
            
        }, this.interval);
    }

    // Et resizedes liiguks pildid õigesse kohta
    // Seda oli norm mähis teha 
    resize() {
        window.addEventListener("resize", () => {
            this.slide.style.width = window.innerWidth;
            this.size = this.images[0].clientWidth;
            this.slide.style.transition = "0s";
            this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)'; 
        });
    }

    

    checkEnd() {
        
        // Liigutab pildi nähtavale
        this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';

        // Kui jõuab viimase pildini siis pane counter tagasi essa pici peale
        // Kui jõuab essani siis liiguta viimase pici peale
        this.slide.addEventListener('transitionend', () => {
            if(this.counter < 0) this.counter = 0;
    
            if (this.images[this.counter].id === 'lastClone') {
                this.slide.style.transition = "none";
                this.counter = this.images.length - 2;
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
        
            if (this.images[this.counter].id === 'firstClone') {
                this.slide.style.transition = "none";
                this.counter = this.images.length - this.counter;
                this.slide.style.transform = 'translateX(' + (-this.size * this.counter) + 'px)';
            }
        });
    }

}

// Võtab kõik slideshowd docist
const slides = document.querySelectorAll('.slideshow-slide');


const slideshows = [];

// Instanciateb iga slideshow
for (let i = 0; i < slides.length; i++) {
    slideshows.push(new Slideshow(slides[i], slides[i].children, 1));
    
}

// Paneb kõik slideshowid tööle
for (const slideshow of slideshows) {
    slideshow.resize();
    slideshow.checkEnd();
    slideshow.scrollLeft();
}