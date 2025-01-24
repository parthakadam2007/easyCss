let selectedElement = null; // To track the currently selected element

// Attach event listeners to each draggable element
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('draggable')) {
        selectedElement = e.target;
    }
});

// Alignment Functions
const alignElement = (position) => {
    if (!selectedElement) return;
    const parent = selectedElement.parentNode.getBoundingClientRect();
    const element = selectedElement.getBoundingClientRect();

    switch (position) {
        case 'top':
            selectedElement.style.top = '0px';
            break;
        case 'bottom':
            selectedElement.style.top = `${parent.height - element.height}px`;
            break;
        case 'left':
            selectedElement.style.left = '0px';
            break;
        case 'right':
            selectedElement.style.left = `${parent.width - element.width}px`;
            break;
        case 'vertical-center':
            selectedElement.style.top = `${(parent.height - element.height) / 2}px`;
            break;
        case 'horizontal-center':
            selectedElement.style.left = `${(parent.width - element.width) / 2}px`;
            break;
    }
};

// Rotation and Flip Functions
const rotateElement = (angle) => {
    if (!selectedElement) return;
    selectedElement.style.transform = `rotate(${angle}deg)`;
};

const flipElement = (axis) => {
    if (!selectedElement) return;
    const currentTransform = selectedElement.style.transform || '';
    if (axis === 'vertical') {
        selectedElement.style.transform = `${currentTransform} scaleY(-1)`;
    } else if (axis === 'horizontal') {
        selectedElement.style.transform = `${currentTransform} scaleX(-1)`;
    }
};

// Layout Functions
const resizeElement = (dimension, value) => {
    if (!selectedElement) return;
    selectedElement.style[dimension] = value + 'px';
};

// Appearance Functions
const setOpacity = (value) => {
    if (!selectedElement) return;
    selectedElement.style.opacity = value;
};

const setCornerRadius = (value) => {
    if (!selectedElement) return;
    selectedElement.style.borderRadius = value + 'px';
};

// Stroke Functions
const setBorderColor = (color) => {
    if (!selectedElement) return;
    selectedElement.style.borderColor = color;
};

const setBorderStyle = (style) => {
    if (!selectedElement) return;
    selectedElement.style.borderStyle = style;
};

// Effects
const applyShadow = (color, x, y, blur) => {
    if (!selectedElement) return;
    selectedElement.style.boxShadow = `${x}px ${y}px ${blur}px ${color}`;
};

// Filters
const applyFilter = (type, value) => {
    if (!selectedElement) return;
    const currentFilter = selectedElement.style.filter || '';
    const newFilter = `${currentFilter} ${type}(${value})`;
    selectedElement.style.filter = newFilter;
};

// Event Listeners for Buttons
document.querySelector('.top').onclick = () => alignElement('top');
document.querySelector('.bottom').onclick = () => alignElement('bottom');
document.querySelector('.left').onclick = () => alignElement('left');
document.querySelector('.right').onclick = () => alignElement('right');
document.querySelector('.verticalcenter').onclick = () => alignElement('vertical-center');
document.querySelector('.horizontalcenter').onclick = () => alignElement('horizontal-center');

document.querySelector('.rotate90').onclick = () => {
    if (!selectedElement) return;
    const currentRotation = selectedElement.style.transform.match(/rotate\((\d+)deg\)/);
    const currentAngle = currentRotation ? parseInt(currentRotation[1]) : 0;
    const newAngle = currentAngle + 90;
    selectedElement.style.transform = `rotate(${newAngle}deg)`;
};

document.querySelector('.flip-vertical').onclick = () => flipElement('vertical');
document.querySelector('.flip-horihontal').onclick = () => flipElement('horizontal');
// Function to load current properties of the selected element
const loadElementProperties = () => {
    if (!selectedElement) return;

    // Load position
    document.querySelector('.xposition').textContent = `X: ${selectedElement.style.left || 0}`;
    document.querySelector('.yposition').textContent = `Y: ${selectedElement.style.top || 0}`;

    // Load size
    document.querySelector('.width').textContent = `Width: ${selectedElement.style.width || selectedElement.offsetWidth}px`;
    document.querySelector('.height').textContent = `Height: ${selectedElement.style.height || selectedElement.offsetHeight}px`;

    // Load appearance
    document.querySelector('.opacity').textContent = `Opacity: ${selectedElement.style.opacity || 1}`;
    document.querySelector('.corner-radius').textContent = `Corner Radius: ${selectedElement.style.borderRadius || 0}px`;

    // Load border
    document.querySelector('.border-color').textContent = `Border Color: ${selectedElement.style.borderColor || 'none'}`;
    document.querySelector('.border-width').textContent = `Border Width: ${selectedElement.style.borderWidth || 'none'}`;
    document.querySelector('.border-style').textContent = `Border Style: ${selectedElement.style.borderStyle || 'none'}`;

    // Load shadow
    document.querySelector('.shadow-color').textContent = `Shadow: ${selectedElement.style.boxShadow || 'none'}`;

    // Load filters
    document.querySelector('.filter-blur').textContent = `Blur: ${selectedElement.style.filter.match(/blur\(([^)]+)\)/)?.[1] || '0px'}`;
    document.querySelector('.filter-brightness').textContent = `Brightness: ${selectedElement.style.filter.match(/brightness\(([^)]+)\)/)?.[1] || '1'}`;
    document.querySelector('.filter-contrast').textContent = `Contrast: ${selectedElement.style.filter.match(/contrast\(([^)]+)\)/)?.[1] || '1'}`;
    document.querySelector('.filter-grayscale').textContent = `Grayscale: ${selectedElement.style.filter.match(/grayscale\(([^)]+)\)/)?.[1] || '0%'}`;
    document.querySelector('.filter-sepia').textContent = `Sepia: ${selectedElement.style.filter.match(/sepia\(([^)]+)\)/)?.[1] || '0%'}`;
};

// Attach event listener to load properties when an element is selected
document.addEventListener('click', (e) => {
    if (e.target.classList.contains('draggable')) {
        selectedElement = e.target;
        loadElementProperties();
    }
});
document.querySelector('.width').onclick = () => resizeElement('width', 200);
document.querySelector('.height').onclick = () => resizeElement('height', 200);

document.querySelector('.opacity').onclick = () => setOpacity(0.5);
document.querySelector('.corner-radius').onclick = () => setCornerRadius(10);

document.querySelector('.border-color').onclick = () => setBorderColor('red');
document.querySelector('.solid').onclick = () => setBorderStyle('solid');
document.querySelector('.dotted').onclick = () => setBorderStyle('dotted');
document.querySelector('.dashed').onclick = () => setBorderStyle('dashed');

document.querySelector('.shadow-color').onclick = () => applyShadow('rgba(0, 0, 0, 0.5)', 5, 5, 10);
document.querySelector('.filter-blur').onclick = () => applyFilter('blur', '5px');
document.querySelector('.filter-brightness').onclick = () => applyFilter('brightness', '1.5');
document.querySelector('.filter-contrast').onclick = () => applyFilter('contrast', '2');
document.querySelector('.filter-grayscale').onclick = () => applyFilter('grayscale', '100%');
document.querySelector('.filter-sepia').onclick = () => applyFilter('sepia', '100%');

