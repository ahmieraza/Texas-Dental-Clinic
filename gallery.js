// Gallery Filtering for Masonry Layout
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing gallery...');
    
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.masonry-item');

    console.log('Gallery.js loaded');
    console.log('Filter buttons found:', filterBtns.length);
    console.log('Gallery items found:', galleryItems.length);

    // Test click on first item
    if (galleryItems.length > 0) {
        console.log('Adding click listeners to gallery items...');
    }

    filterBtns.forEach((btn, index) => {
        console.log(`Adding listener to filter button ${index}:`, btn.getAttribute('data-filter'));
        btn.addEventListener('click', () => {
            console.log('Filter button clicked:', btn.getAttribute('data-filter'));
            
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            btn.classList.add('active');
            
            // Get filter value
            const filterValue = btn.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                // Using display instead of hidden class works better with CSS column-count
                if (filterValue === 'all') {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.animation = 'fadeIn 0.5s ease forwards';
                    }, 10);
                } else {
                    const category = item.getAttribute('data-category');
                    if (category === filterValue) {
                        item.style.display = 'block';
                        setTimeout(() => {
                            item.style.animation = 'fadeIn 0.5s ease forwards';
                        }, 10);
                    } else {
                        item.style.display = 'none';
                        item.style.animation = 'none';
                    }
                }
            });
        });
    });

    // Redirect to detail page
    galleryItems.forEach((item, index) => {
        console.log(`Adding click listener to gallery item ${index}:`, item.getAttribute('data-id'));
        
        item.addEventListener('click', (e) => {
            console.log('Gallery item clicked:', item.getAttribute('data-id'));
            
            // Prevent redirection if the user is dragging the before/after slider
            if (e.target.classList.contains('ba-range')) return;
            
            const id = item.getAttribute('data-id');
            if (id) {
                console.log('Redirecting to detail page with ID:', id);
                window.location.href = `detail.html?id=${id}`;
            } else {
                console.log('No data-id found for this item');
            }
        });
    });
});

// Before/After Slider Logic
const baSliders = document.querySelectorAll('.ba-slider');

baSliders.forEach(slider => {
    const range = slider.querySelector('.ba-range');
    const afterImg = slider.querySelector('.ba-img-after');
    const sliderButton = slider.querySelector('.ba-slider-button');

    // Update the slider position on input
    range.addEventListener('input', (e) => {
        const val = e.target.value;
        
        // Update the clip path of the top (after) image
        afterImg.style.clipPath = `polygon(0 0, ${val}% 0, ${val}% 100%, 0 100%)`;
        
        // Move the center divider button
        sliderButton.style.left = `${val}%`;
    });
});
