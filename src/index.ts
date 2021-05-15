import './style.sass';
import '@fortawesome/fontawesome-free/css/all.min.css';

/*
 * Get the url and the named anchor seperately
 */
function getUrlAndNamedAnchor(fullUrl: string) {
  const pieces = fullUrl.split('#');
  const elementId = pieces.splice(-1)[0];
  const url = pieces.join('');
  return [url, elementId];
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

document.addEventListener('DOMContentLoaded', () => {
  registerNamedAnchors();
});
