document.addEventListener('DOMContentLoaded', () => {
    // Parse URL parameters
    const urlParams = new URLSearchParams(window.location.search);
    const itemId = urlParams.get('id');
    const container = document.getElementById('detailContainer');
    const pageHeaderTitle = document.getElementById('pageHeaderTitle');

    console.log('Detail page loaded. Item ID:', itemId);
    console.log('Gallery data available:', typeof galleryData !== 'undefined');
    
    if (typeof galleryData !== 'undefined') {
        console.log('Available items:', Object.keys(galleryData));
    }

    if (!itemId || !galleryData[itemId]) {
        console.log('Item not found or no ID provided');
        container.innerHTML = `
            <div class="not-found">
                <h2>Item Not Found</h2>
                <p>Sorry, the gallery item you are looking for does not exist.</p>
                <p>Item ID: ${itemId || 'No ID provided'}</p>
                <a href="gallery.html" class="btn btn-primary" style="margin-top: 1rem;">Back to Gallery</a>
            </div>
        `;
        return;
    }

    const data = galleryData[itemId];
    console.log('Loading data for:', data.title);
    
    // Update header
    pageHeaderTitle.textContent = data.title;
    
    // Build HTML content
    const html = `
        <a href="gallery.html" class="back-btn" style="margin-bottom: 2rem;">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            Back to Gallery
        </a>
        
        <img src="${data.image}" alt="${data.title}" class="detail-image">
        
        <span class="detail-category">${data.category}</span>
        <h2 class="detail-title">${data.title}</h2>
        
        <div class="detail-text">
            <p>${data.detail}</p>
        </div>
    `;

    container.innerHTML = html;
});
