const zoomContainer = document.getElementById('zoomContainer') as HTMLElement;
if (!zoomContainer) {
  throw new Error("Element with ID 'zoomContainer' not found.");
}

let scale: number = 1; // Initial zoom scale
let translateX: number = 0;
let translateY: number = 0;

let scrollX: number = 0; // Horizontal scroll position
let scrollY: number = 0; // Vertical scroll position

// Prevent default browser zoom behavior and handle custom zoom/scroll
window.addEventListener(
  'wheel',
  (event: WheelEvent) => {
    if (event.ctrlKey) {
      event.preventDefault(); // Stop browser zoom
      customZoom(event); // Call custom zoom function
    } else {
      customScroll(event); // Handle vertical or horizontal scrolling
    }
  },
  { passive: false } // Allow preventDefault to work
);

function customZoom(event: WheelEvent): void {
  // Calculate zoom factor
  const zoomFactor = event.deltaY < 0 ? 1.1 : 0.9;

  // Get cursor position relative to the zoom container
  const rect = zoomContainer.getBoundingClientRect();
  const cursorX = event.clientX - rect.left;
  const cursorY = event.clientY - rect.top;

  // Adjust scale and translation
  const newScale = scale * zoomFactor;
  translateX = cursorX - (cursorX - translateX) * (newScale / scale);
  translateY = cursorY - (cursorY - translateY) * (newScale / scale);
  scale = newScale;

  // Apply transformations
  zoomContainer.style.transform = `translate(${translateX - scrollX}px, ${translateY - scrollY}px) scale(${scale})`;
}

function customScroll(event: WheelEvent): void {
  event.preventDefault(); // Prevent default scroll behavior

  if (event.shiftKey) {
    // Shift + Scroll: Horizontal scrolling
    scrollX += event.deltaY;
  } else {
    // Normal Scroll: Vertical scrolling
    scrollY += event.deltaY;
  }

  // Apply scroll positions
  zoomContainer.style.transform = `
    translate(${translateX - scrollX}px, ${translateY - scrollY}px) scale(${scale})`;
}
