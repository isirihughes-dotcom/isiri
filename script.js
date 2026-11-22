// Image Gallery Functionality
let images = [];

document.addEventListener('DOMContentLoaded', function() {
    initializeGallery();
    setupNavigation();
    setupSplash();
});

function setupSplash() {
    const splash = document.getElementById('splash');
    if (!splash) return;
    function dismissSplash() {
        splash.style.display = 'none';
        navigateTo('printmaking');
    }
    splash.addEventListener('click', dismissSplash);
    splash.addEventListener('touchend', function(e) {
        e.preventDefault();
        dismissSplash();
    });
}

function initializeGallery() {
    images = getImageList();

    if (images.length === 0) {
        console.warn('No images found');
        return;
    }

    generateGalleryFeed('paintingFeed', 'painting');
    generateGalleryFeed('printmakingFeed', 'printmaking');
}

function getImageList() {
    return [
        {
            category: 'painting',
            title: 'Attending (1-13)',
            year: '2026',
            medium: 'encaustic and oil pigment on panel, single channel video',
            images: [
                { carousel: [
                    'Assets/image26.jpg',
                    'Assets/image27.jpg',
                    'Assets/image28.jpg',
                    'Assets/image29.jpg',
                    'Assets/image30.jpg'
                ], dimensions: 'Installation dimensions 580 x 60 x 2 cm' },
                { src: 'Assets/video2.mp4', small: true }
            ]
        },
        {
            category: 'painting',
            title: 'She is paper in the window panes',
            year: '2026',
            medium: 'Oil and airbrush on canvas',
            images: [
                { src: 'Assets/image22.jpg', dimensions: '183 x 122 cm' },
                { src: 'Assets/image25.jpeg', dimensions: '', hoverAlign: 'center', hoverText: `Inside the glasshouse, nothing is fully hidden\nA structure made for nurturing, and for seeing through.\n\nI dance with the versions of myself.\nsuspended between being a girl and a woman\nbetween the discomfort of becoming,\ndisplayed within a body looked onto by others.\n\nboth a sanctuary and a display case,\na place for growth,\nand for looking.\nmy body turns visible before it understands itself.\n\nWhat does it mean to grow while being watched?\n\nI'm caught in the moment, of fun, of fear, of excitement, of emergence and dissolution\nsimultaneously\n\nlike paper in the window panes I am temporary\ntransparent\ncaught in the moment just before transition settles into permanence.` }
            ]
        },
        {
            category: 'painting',
            title: 'Ask me easy questions',
            year: '2026',
            medium: 'Oil and encaustic with latex on wood panels',
            images: [
                { src: 'Assets/image1.jpg', dimensions: '121 x 93 cm' },
                { src: 'Assets/image3.jpg', dimensions: '3840 x 2160 px' }
            ]
        },
        {
            category: 'painting',
            title: 'Untitled',
            year: '2026',
            medium: 'Oil and beeswax on wood board',
            images: [
                { src: 'Assets/image27.png', dimensions: '28 x 22 cm' }
            ]
        },
        {
            category: 'painting',
            title: 'Untitled',
            year: '2026',
            medium: 'Oil and beeswax on wood board',
            images: [
                { src: 'Assets/image26.png', dimensions: '28 x 22 cm' }
            ]
        },
        {
            category: 'painting',
            title: 'Fair Understanding',
            year: '2025',
            medium: 'Oil and acrylic on canvas',
            images: [
                { src: 'Assets/image8.jpg', dimensions: '60 x 60 cm' },
                { paired: [
                    { src: 'Assets/image14.jpg', title: '30 minute portrait', year: '2025', medium: 'oil on canvas' },
                    { src: 'Assets/image13.jpg', title: 'Untitled', year: '2025', medium: 'oil on canvas' }
                ], portrait: true }
            ]
        },
        {
            category: 'printmaking',
            title: 'Ankylosing Spondilitis',
            year: '2026',
            medium: 'Drypoint on tengucho and rice paper',
            images: [
                { src: 'Assets/image5.jpg', dimensions: '206 x 22 x 96 cm' },
                { paired: [
                    { src: 'Assets/image4.jpg', dimensions: '206 x 22 x 96 cm', cropRight: '1cm' },
                    { src: 'Assets/image7.jpg', dimensions: '206 x 22 x 96 cm', hoverText: `Held in tension, the body begins to slip\nWhat should be contained strains and stretches instead\nForms drift across fragile layers, never fully aligning\nMovement unsettles them further,\nas if gravity is drawing insistently downward\n\nThe image thins, disperses, and gathers\nleft in a heap like laundry at the end of the day.\n\nInfluenced by early neuron drawings,\nthe work traces a body caught between holding together and coming undone.` }
                ]}
            ]
        },
        {
            category: 'printmaking',
            title: 'Lightning Flipbook',
            year: '2025',
            medium: '50 mezzotint etchings on Hahnemühle paper in a handmade oak box',
            images: [
                { src: 'Assets/image10.jpeg', dimensions: '29 × 23 × 16.5 cm' },
                { paired: [
                    { src: 'Assets/image11.jpg', dimensions: '' },
                    { src: 'Assets/video1.MOV', dimensions: '' }
                ], contain: true }
            ]
        },
        {
            category: 'printmaking',
            title: 'We were lovers, on paper',
            year: '2025',
            medium: 'Lithographs on BFK Rives and Hahnemuhle',
            images: [
                { src: 'Assets/image15.jpg', dimensions: '60.5 x 125.5 cm' },
                { paired: [
                    { src: 'Assets/image17.jpg', dimensions: '' },
                    { src: 'Assets/image16.jpg', dimensions: '' }
                ]}
            ]
        },
        {
            category: 'printmaking',
            title: 'Touch Fiction',
            year: '2025',
            medium: 'Lithograph on dyed BFK Rives',
            images: [
                { src: 'Assets/image19.jpg', dimensions: '70 x 119 cm' },
                { paired: [
                    { src: 'Assets/image20.jpg' },
                    { src: 'Assets/image21.jpg' }
                ], contain: true }
            ]
        }
    ];
}

function generateGalleryFeed(feedId, category) {
    const galleryFeed = document.getElementById(feedId);
    if (!galleryFeed) return;
    galleryFeed.innerHTML = '';

    const isVideo = src => /\.(mov|mp4|webm|ogg)$/i.test(src);

    const mediaHTML = (src, alt, cropRight, portrait, contain, hoverText, hoverAlign) => {
        const classes = ['item-image-wrapper', portrait ? 'item-image-wrapper--portrait' : '', contain ? 'item-image-wrapper--contain' : '', hoverText ? 'item-image-wrapper--has-text' : ''].filter(Boolean).join(' ');
        const wrapper = `<div class="${classes}" ${cropRight ? `style="clip-path: inset(0 ${cropRight} 0 0)"` : ''}>`;
        const media = isVideo(src)
            ? `<video src="${src}" autoplay loop muted playsinline></video>`
            : `<img src="${src}" alt="${alt}">`;
        const overlayClass = `hover-overlay${hoverAlign === 'left' ? ' hover-overlay--left' : hoverAlign === 'center' ? ' hover-overlay--center' : ''}`;
        const overlay = hoverText
            ? `<div class="${overlayClass}"><p class="hover-text">${hoverText.replace(/\n/g, '<br>')}</p></div>`
            : '';
        return wrapper + media + overlay + '</div>';
    };

    images.filter(a => a.category === category).forEach((artwork) => {
        artwork.images.forEach((image, imageIndex) => {
            if (image.carousel) {
                const captionParts = [`<em>${artwork.title || 'Untitled'}</em>${artwork.year ? ', ' + artwork.year : ''}`];
                if (artwork.medium) captionParts.push(artwork.medium);
                if (image.dimensions) captionParts.push(image.dimensions);
                const caption = imageIndex === 0 ? captionParts.join(', ') : '';
                galleryFeed.appendChild(buildCarousel(image.carousel, artwork.title, caption));
                return;
            }

            if (image.paired) {
                const galleryItem = document.createElement('div');
                galleryItem.className = `gallery-item gallery-item--paired${image.contain ? ' gallery-item--contain' : ''}`;
                galleryItem.innerHTML = image.paired.map(img => {
                    const media = mediaHTML(img.src, img.title || artwork.title, img.cropRight, image.portrait, image.contain, img.hoverText, img.hoverAlign);
                    const caption = img.title
                        ? `<div class="item-details paired-caption"><p class="item-meta"><em>${img.title}</em>${img.year ? ', ' + img.year : ''}${img.medium ? ', ' + img.medium : ''}</p></div>`
                        : '';
                    return `<div class="paired-col${image.contain ? ' paired-col--contain' : ''}">${media}${caption}</div>`;
                }).join('');
                galleryFeed.appendChild(galleryItem);
                return;
            }

            const galleryItem = document.createElement('div');
            galleryItem.className = `gallery-item${image.small ? ' gallery-item--small' : ''}`;

            const showDetails = imageIndex === 0;
            const titlePart = `<em>${artwork.title || 'Untitled'}</em>${artwork.year ? ', ' + artwork.year : ''}`;
            const parts = [titlePart];
            if (artwork.medium) parts.push(artwork.medium);
            parts.push(image.dimensions || '—');
            const metaLine = parts.join(', ');

            const detailsHTML = showDetails
                ? `<div class="item-details"><p class="item-meta">${metaLine}</p></div>`
                : '';

            galleryItem.innerHTML = mediaHTML(image.src, artwork.title, null, null, null, image.hoverText, image.hoverAlign) + detailsHTML;

            galleryFeed.appendChild(galleryItem);
        });
    });
}

function buildCarousel(srcs, alt, caption) {
    const galleryItem = document.createElement('div');
    galleryItem.className = 'gallery-item gallery-item--carousel';
    galleryItem.innerHTML = `
        <div class="carousel">
            <div class="carousel-track">
                ${srcs.map(src => `<div class="carousel-slide"><img src="${src}" alt="${alt}" loading="lazy"></div>`).join('')}
            </div>
        </div>
        <div class="carousel-controls">
            <button class="carousel-btn carousel-btn--prev" aria-label="Previous image">&#8249;</button>
            <p class="carousel-counter item-meta"></p>
            <button class="carousel-btn carousel-btn--next" aria-label="Next image">&#8250;</button>
        </div>
        ${caption ? `<div class="item-details"><p class="item-meta">${caption}</p></div>` : ''}`;

    const track = galleryItem.querySelector('.carousel-track');
    const prev = galleryItem.querySelector('.carousel-btn--prev');
    const next = galleryItem.querySelector('.carousel-btn--next');
    const counter = galleryItem.querySelector('.carousel-counter');

    const currentIndex = () => Math.round(track.scrollLeft / track.clientWidth);
    const goTo = i => track.scrollTo({ left: i * track.clientWidth, behavior: 'smooth' });

    const update = () => {
        const i = currentIndex();
        counter.textContent = `${i + 1} / ${srcs.length}`;
        prev.disabled = i === 0;
        next.disabled = i === srcs.length - 1;
    };

    prev.addEventListener('click', () => goTo(currentIndex() - 1));
    next.addEventListener('click', () => goTo(currentIndex() + 1));
    track.addEventListener('scroll', update, { passive: true });
    update();

    return galleryItem;
}

function navigateTo(section) {
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.getElementById(section).classList.add('active');
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    document.querySelectorAll('.nav-link').forEach(l => {
        l.classList.toggle('active', l.getAttribute('data-section') === section);
    });
}

function setupNavigation() {
    document.querySelectorAll('[data-section]').forEach(el => {
        el.addEventListener('click', function(e) {
            e.preventDefault();
            navigateTo(this.getAttribute('data-section'));
        });
    });

    const logo = document.getElementById('logoHome');
    if (logo) {
        logo.addEventListener('click', function() {
            const splash = document.getElementById('splash');
            if (splash) splash.style.display = 'flex';
        });
    }
}
