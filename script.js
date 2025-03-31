// List of image URLs
const imageUrls = [
    'https://via.placeholder.com/150',
    'https://via.placeholder.com/150/0000FF',
    'https://via.placeholder.com/150/FF0000',
    'https://via.placeholder.com/150/00FF00',
    'https://via.placeholder.com/150/FFFF00'
];

// Function to download a single image
function downloadImage(url) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;

        img.onload = () => {
            resolve(img);
        };

        img.onerror = () => {
            reject(`Failed to load image from URL: ${url}`);
        };
    });
}

// Main function to download all images
function downloadImages() {
    // Show loading spinner
    document.getElementById('loading').style.display = 'block';
    document.getElementById('error').style.display = 'none';
    document.getElementById('output').innerHTML = ''; // Clear any previous images

    // Use Promise.all to download all images in parallel
    Promise.all(imageUrls.map(downloadImage))
        .then(images => {
            // Hide loading spinner
            document.getElementById('loading').style.display = 'none';

            // Append each image to the output div
            const outputDiv = document.getElementById('output');
            images.forEach(image => {
                outputDiv.appendChild(image);
            });
        })
        .catch(error => {
            // Hide loading spinner and show error message
            document.getElementById('loading').style.display = 'none';
            document.getElementById('error').textContent = `Error: ${error}`;
            document.getElementById('error').style.display = 'block';
        });
}

// Trigger the download of images when the page loads
window.onload = downloadImages;
