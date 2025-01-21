"use strict";
const box = document.querySelector('.box');
// Function to calculate offset for positioning
function calculateOffset(element) {
    const position = element.getBoundingClientRect();
    return {
        left: position.left + window.scrollX - 10,
        top: position.top + window.scrollY - 10,
    };
}
// Function to add a sizer and corners around the box with resizing and moving functionality
function logBoxPosition(box) {
    if (!box) {
        console.error('Box element not found');
        return;
    }
    const computedStyle = window.getComputedStyle(box);
    const container = document.querySelector('.container');
    if (!container) {
        console.error('Container element not found');
        return;
    }
    const sizer = document.createElement('div');
    sizer.classList.add('sizer');
    container.appendChild(sizer);
    // Create a borderSizer for the main border
    const borderSizer = document.createElement('div');
    sizer.appendChild(borderSizer);
    // Create four corner elements
    const corners = [];
    for (let i = 0; i < 4; i++) {
        const corner = document.createElement('div');
        corner.classList.add('sizerCorner');
        corner.style.position = 'absolute';
        corner.style.height = '15px';
        corner.style.width = '15px';
        corner.style.backgroundColor = 'white';
        corner.style.cursor = 'pointer';
        corner.style.border = '2px solid rgb(18, 143, 233)';
        corners.push(corner);
        sizer.appendChild(corner);
    }
    // Style the sizer
    borderSizer.style.position = 'absolute';
    borderSizer.style.height = computedStyle.height;
    borderSizer.style.width = computedStyle.width;
    borderSizer.style.border = '2px solid rgb(18, 143, 233)';
    // Use the calculateOffset function
    const offset = calculateOffset(box);
    borderSizer.style.left = `${offset.left}px`;
    borderSizer.style.top = `${offset.top}px`;
    // Position the corners at the border corners
    const boxWidth = parseFloat(computedStyle.width);
    const boxHeight = parseFloat(computedStyle.height);
    corners[0].style.left = `${offset.left - 7.5}px`; // Top-left
    corners[0].style.top = `${offset.top - 7.5}px`;
    corners[1].style.left = `${offset.left + boxWidth - 7.5}px`; // Top-right
    corners[1].style.top = `${offset.top - 7.5}px`;
    corners[2].style.left = `${offset.left - 7.5}px`; // Bottom-left
    corners[2].style.top = `${offset.top + boxHeight - 7.5}px`;
    corners[3].style.left = `${offset.left + boxWidth - 7.5}px`; // Bottom-right
    corners[3].style.top = `${offset.top + boxHeight - 7.5}px`;
    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // let sizerCorner:null | Element= document.querySelector('.sizerCorner')
    try {
        let isDragging = false;
        // Start drag
        sizer.addEventListener('mousedown', function (event) {
            isDragging = true;
            console.log('Drag started at:', event.clientX, event.clientY);
        });
        // Dragging
        document.addEventListener('mousemove', function (event) {
            if (isDragging) {
                console.log('Dragging at:', event.clientX, event.clientY);
            }
        });
        // End drag
        document.addEventListener('mouseup', function (event) {
            if (isDragging) {
                console.log('Drag ended at:', event.clientX, event.clientY);
                isDragging = false;
            }
        });
    }
    catch (_a) {
        (error) => { console.log(error); };
    }
    // Resizing logic
    function handleResize(event, cornerIndex) {
        event.preventDefault();
        const startX = event.clientX;
        const startY = event.clientY;
        const startWidth = parseFloat(computedStyle.width);
        const startHeight = parseFloat(computedStyle.height);
        const startLeft = parseFloat(computedStyle.left || `${box.offsetLeft}`);
        const startTop = parseFloat(computedStyle.top || `${box.offsetTop}`);
        function resize(event) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            switch (cornerIndex) {
                case 0: // Top-left
                    box.style.width = `${startWidth - dx}px`;
                    box.style.height = `${startHeight - dy}px`;
                    box.style.left = `${startLeft + dx}px`;
                    box.style.top = `${startTop + dy}px`;
                    break;
                case 1: // Top-right
                    box.style.width = `${startWidth + dx}px`;
                    box.style.height = `${startHeight - dy}px`;
                    box.style.top = `${startTop + dy}px`;
                    break;
                case 2: // Bottom-left
                    box.style.width = `${startWidth - dx}px`;
                    box.style.height = `${startHeight + dy}px`;
                    box.style.left = `${startLeft + dx}px`;
                    break;
                case 3: // Bottom-right
                    box.style.width = `${startWidth + dx}px`;
                    box.style.height = `${startHeight + dy}px`;
                    break;
            }
            // Re-position corners dynamically
            logBoxPosition(box);
        }
        function stopResize() {
            document.removeEventListener('mousemove', resize);
            document.removeEventListener('mouseup', stopResize);
        }
        document.addEventListener('mousemove', resize);
        document.addEventListener('mouseup', stopResize);
    }
    // Attach resize handlers to corners
    corners.forEach((corner, index) => {
        corner.addEventListener('mousedown', (event) => handleResize(event, index));
    });
    // corners.forEach((corner, index) => {
    //     corner.addEventListener('mousedown', (event) => {
    //     });
    // });
    // Box moving logic
    function handleMove(event) {
        event.preventDefault();
        const startX = event.clientX;
        const startY = event.clientY;
        const startLeft = parseFloat(computedStyle.left || `${box.offsetLeft}`);
        const startTop = parseFloat(computedStyle.top || `${box.offsetTop}`);
        function move(event) {
            const dx = event.clientX - startX;
            const dy = event.clientY - startY;
            box.style.left = `${startLeft + dx}px`;
            box.style.top = `${startTop + dy}px`;
            // Re-position corners dynamically
            logBoxPosition(box);
        }
        function stopMove() {
            document.removeEventListener('mousemove', move);
            document.removeEventListener('mouseup', stopMove);
        }
        document.addEventListener('mousemove', move);
        document.addEventListener('mouseup', stopMove);
    }
    // Attach move handler to the box itself
    box.addEventListener('mousedown', handleMove);
    // Event listener to remove sizer when clicking outside
    const handleClickOutside = (event) => {
        if (!box.contains(event.target) && !sizer.contains(event.target)) {
            sizer.remove();
            document.removeEventListener('click', handleClickOutside);
        }
    };
    document.addEventListener('click', handleClickOutside);
}
// Ensure the box element exists before adding event listener
// if (box) {
//     box.addEventListener('click', (event) => {
//         event.stopPropagation();
//         logBoxPosition(box);
//     });
// } else {
//     console.error('Box element not found');
// }
function logBoxPositionHover(box) {
    if (!box) {
        console.error('Box element not found');
        return;
    }
    const computedStyle = window.getComputedStyle(box);
    const container = document.querySelector('.container');
    const borderSizer = document.createElement('div');
    const sizer = document.createElement('div');
    container.appendChild(sizer);
    // Create a borderSizer for the main border
    sizer.appendChild(borderSizer);
    // Style the sizer
    borderSizer.style.position = 'absolute';
    borderSizer.style.height = computedStyle.height;
    borderSizer.style.width = computedStyle.width;
    borderSizer.style.border = '2px solid rgb(18, 143, 233)';
}
// box.addEventListener('mouseover',(event)=>{
//     event.stopPropagation();
//     logBoxPositionHover(box)
// })
box.addEventListener('click', (event) => {
    event.stopPropagation();
    logBoxPosition(box);
});
