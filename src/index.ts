import './style.sass';
import '@fortawesome/fontawesome-free/css/all.min.css';

/*
 * Get the url and the named anchor seperately
 */
function getUrlAndNamedAnchor(fullUrl: string) {
  const pieces = fullUrl.split('#');
  if (pieces.length > 1) {
    return [pieces[0], pieces[1]];
  }
  return [pieces[0], null];
}

/*
 * Find anchor tags that link to other places
 * on the same page and smooth out the scrolling
 */
function registerNamedAnchors() {
  const [currentUrl, _] = getUrlAndNamedAnchor(window.location.href);

  const links = document.getElementsByTagName('a');
  // For each a element
  Array.from(links).forEach((link) => {
    // If it's a named anchor and it's for this page
    if (link.href && link.href.includes('#')) {
      const [url, elementId] = getUrlAndNamedAnchor(link.href);
      if (url === currentUrl) {
        const targetElement = document.getElementById(elementId);
        // Make it smoothly scroll when clicked
        link.addEventListener('click', (event: MouseEvent) => {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top,
            behavior: 'smooth',
          });
          event.preventDefault();
        });
      }
    }
  });
}

/*
 * Make all images in ".expandable-images" elements part of seperate image display groups
 * that can be clicked, expanded, and then cycled through
 */
function makeImagesExpandable() {
  // The shared shadowbox for images
  const shadowBox = document.getElementById('image-shadowbox');
  const closeBoxFunction = () => {
    shadowBox.style.display = 'none';
    document.body.style.overflow = null;
  };
  document.getElementById('close').addEventListener('click', closeBoxFunction);
  shadowBox.addEventListener('click', closeBoxFunction);
  // Each grouping of images
  const imageGroups = document.getElementsByClassName('expandable-images');

  Array.from(imageGroups).forEach((grouping) => {
    const imagesInGroup = grouping.getElementsByTagName('img');
    for (let i = 0; i < imagesInGroup.length; i += 1) {
      // Create variables that represent what image to go to when the
      // user hits the next or last button while handling looping around
      let lastImage: HTMLElement;
      let nextImage: HTMLElement;
      if (i === 0) {
        lastImage = imagesInGroup[imagesInGroup.length - 1];
      } else {
        lastImage = imagesInGroup[i - 1];
      }

      if (i === (imagesInGroup.length - 1)) {
        nextImage = imagesInGroup[0];
      } else {
        nextImage = imagesInGroup[i + 1];
      }
      // A variable that represents the current image itself
      const image = imagesInGroup[i];
      // Add a pointer cursor when the user hovers over the image to display
      image.style.cursor = 'pointer';

      // When the user clicks on the image to display...
      image.addEventListener('click', () => {
        // Display the shadowBox
        const url = `url(${image.src})`;
        document.getElementById('center-image').style.backgroundImage = url;
        shadowBox.style.display = 'flex';
        // Disable scrolling
        document.body.style.overflow = 'hidden';

        // Handle the previous button
        document.getElementById('prev').onclick = (e) => {
          e.stopPropagation();
          // "Click" on the image that would be next
          lastImage.click();
        };
        // handle the next button
        document.getElementById('next').onclick = (e) => {
          e.stopPropagation();
          // "Click" on the image that would be next
          nextImage.click();
        };
      });
    }
  });
}

document.addEventListener('DOMContentLoaded', () => {
  registerNamedAnchors();
  makeImagesExpandable();
});
