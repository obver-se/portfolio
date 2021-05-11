import "./style.sass";
import '@fortawesome/fontawesome-free/css/all.min.css';
/*import './index.pug';
import './404.pug';*/

/*
 * Get the url and the named anchor seperately
 */
function getUrlAndNamedAnchor(fullUrl: string) {
  let pieces = fullUrl.split("#");
  let elementId = pieces.splice(-1)[0];
  let url = pieces.join('');
  return [url, elementId];
}

/* 
 * Find anchor tags that link to other places 
 * on the same page and smooth out the scrolling 
 */
function registerNamedAnchors() {
  const [currentUrl, _] = getUrlAndNamedAnchor(window.location.href);

  let links = document.getElementsByTagName("a");
  for (let linkIndex in links) {
    let link = links[linkIndex];
    // If it's a named anchor and it's for this page
    if (link.href && link.href.includes("#")) {
      const [url, elementId] = getUrlAndNamedAnchor(link.href);
      if (url == currentUrl) {
        let targetElement = document.getElementById(elementId);
        // Make it smoothly scroll when clicked
        link.onclick = function(event) {
          window.scrollTo({
            top: targetElement.getBoundingClientRect().top,
            behavior: 'smooth',
          });
          event.preventDefault();
        }
      }
    }
  }
}

registerNamedAnchors();
