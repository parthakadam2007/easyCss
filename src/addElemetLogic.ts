   // Select the header preview and output text area
   const headerPreview = document.getElementById('headerPreview');
   const outputBox = document.getElementById('output');
   const contextMenu = document.getElementById('contextMenu');
   let targetElement = null; // Tracks the element being edited
   let parentElement = null; // Tracks the parent element
   let childElement = null; // Tracks the child element
   let zIndexCounter = 1000; // Initialize z-index counter

   // Update the output box with the generated HTML and inline CSS
   function updateOutput() {
       const elements = [...headerPreview.children];
       console.log('elements',elements)
       const headerContent = elements.map(el => {
           const clone = el.cloneNode(true); // Clone the element
           clone.removeAttribute('contenteditable'); // Remove editing capability
           clone.style.position = 'absolute'; // Retain absolute positioning
           return clone.outerHTML; // Convert to HTML string
       }).join('\n    ');
       console.log('headerCon',headerContent)

       const headerStyle = `
           width: 100%;
           min-height: 150px;
           background-color: #f4f4f4;
           padding: 20px;
           position: relative;
       `.trim();

       const generatedCode = `
<header style="${headerStyle}">
${headerContent}
</header>`;
       outputBox.value = generatedCode.trim(); // Display the code
   }

   

   function addTextBox() {
   const newTextBox = document.createElement('div'); // Create a new div
   newTextBox.classList.add('draggable'); // Add the draggable class
   newTextBox.style.position = 'absolute';
   newTextBox.style.top = '50px';
   newTextBox.style.left = '50px';
   newTextBox.style.width = '150px';
   newTextBox.style.height = '50px';
   newTextBox.style.border = '1px solid #000';
   newTextBox.style.backgroundColor = '#fff';
   newTextBox.style.color = '#000';
   newTextBox.style.padding = '10px';
   newTextBox.style.overflow = 'hidden';
   newTextBox.contentEditable = 'true'; // Make it editable

   makeDraggable(newTextBox); // Make the text box draggable
   headerPreview.appendChild(newTextBox); // Add to the preview
   updateOutput(); // Update the output code
}
   // Function to add a shape
   function addShape(type) {
       const newShape = document.createElement('div'); // Create a new div
       newShape.classList.add('draggable', 'shape'); // Add relevant classes
       newShape.style.position = 'absolute'; // Set initial position
       newShape.style.top = '50px';
       newShape.style.left = '50px';

       // Style the shape based on the type
       if (type === 'circle') {
           newShape.style.width = '50px';
           newShape.style.height = '50px';
           newShape.style.borderRadius = '50%'; // Make it a circle
           newShape.style.backgroundColor = 'blue';
       } else if (type === 'square') {
           newShape.style.width = '50px';
           newShape.style.height = '50px';
           newShape.style.backgroundColor = 'blue';
       } else if (type === 'rectangle') {
           newShape.style.width = '100px';
           newShape.style.height = '50px';
           newShape.style.backgroundColor = 'blue';
       } else if (type === 'triangle') {
           newShape.style.width = '0';
           newShape.style.height = '0';
           newShape.style.borderLeft = '25px solid transparent';
           newShape.style.borderRight = '25px solid transparent';
           newShape.style.borderBottom = '50px solid blue';
           newShape.style.backgroundColor = 'transparent';
           
       }

       makeDraggable(newShape); // Make the shape draggable
       headerPreview.appendChild(newShape); // Add to the preview
       updateOutput(); // Update the output code
   }
   

   // Function to make an element draggable
   function makeDraggable(el) {
   el.addEventListener('mousedown', function (event) {
       const rect = el.getBoundingClientRect();
       const startX = (event.clientX - rect.left) / scale; // Adjust for scale
       const startY = (event.clientY - rect.top) / scale; // Adjust for scale

       function onMouseMove(e) {
           // Calculate position considering scale and translations
           const newLeft = (e.clientX - startX * scale - translateX + scrollX) / scale;
           const newTop = (e.clientY - startY * scale - translateY + scrollY) / scale;

           el.style.left = `${newLeft}px`;
           el.style.top = `${newTop}px`;
           updateOutput(); // Update output to reflect the new position
       }

       function onMouseUp() {
           document.removeEventListener('mousemove', onMouseMove);
           document.removeEventListener('mouseup', onMouseUp);
       }

       document.addEventListener('mousemove', onMouseMove);
       document.addEventListener('mouseup', onMouseUp);
   });

   // Show context menu on right-click
   el.addEventListener('contextmenu', function (event) {
       event.preventDefault(); // Prevent default menu
       targetElement = el; // Set the target element
       contextMenu.style.top = `${event.clientY}px`; // Position the menu
       contextMenu.style.left = `${event.clientX}px`;
       contextMenu.style.display = 'block'; // Show the menu
   });
}


   // Apply selected colors to the target element
   function applyColors() {
       if (targetElement) {
           const bgColor = document.getElementById('bgColor').value;
           const textColor = document.getElementById('textColor').value;
           targetElement.style.backgroundColor = bgColor;
           targetElement.style.color = textColor;
           contextMenu.style.display = 'none';
           updateOutput();
       }
   }


   // Hide the context menu when clicking outside
   document.addEventListener('click', function (e) {
       if (!contextMenu.contains(e.target)) {
           contextMenu.style.display = 'none';
       }
   });
   
   // zoomContainer.addEventListener('keydown',(event)=>{
   //   if(KeyboardEvent==)
   //     console.log( event.target)

     

   // })
   // Delete the selected element on Ctrl + Delete
   function deleteElement(){
   
       if (targetElement) {
           targetElement.remove(); // Remove the selected element
           targetElement = null; // Clear the reference
           contextMenu.style.display = 'none'; // Hide the context menu if visible
           updateOutput(); // Update the output code
       } else {
           console.log('No element selected to delete.');
       }
   }
   // Track the highest and lowest z-index values


// Function to bring an element to the front
function bringToFront() {
   if (targetElement) {
       zIndexCounter++; // Increment global z-index
       targetElement.style.zIndex = zIndexCounter; // Assign new z-index
       contextMenu.style.display = 'none'; // Hide context menu
       console.log(`Element brought to front with zIndex: ${zIndexCounter}`);
   } else {
       console.log("No element selected to bring to the front.");
   }
}

// Function to send an element to the back
function sendToBack() {
   if (targetElement) {
       targetElement.style.zIndex = 1; // Set a low z-index value
       contextMenu.style.display = 'none'; // Hide context menu
       console.log("Element sent to back with zIndex: 1");
   } else {
       console.log("No element selected to send to the back.");
   }
}

// Open the custom image dialog
function openImageDialog(): void {
    const imageDialog = document.getElementById('imageDialog') as HTMLElement;
    const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;

    if (imageDialog && imageUrlInput) {
        imageDialog.style.display = 'block'; // Show the dialog
        imageUrlInput.value = ''; // Clear any previous value
    }
}

// Close the custom image dialog
function closeImageDialog(): void {
    const imageDialog = document.getElementById('imageDialog') as HTMLElement;
    if (imageDialog) {
        imageDialog.style.display = 'none'; // Hide the dialog
    }
}

// Add the image from the dialog input
function addImageFromDialog(): void {
    const imageUrlInput = document.getElementById('imageUrl') as HTMLInputElement;
    const imageUrl = imageUrlInput?.value;

    if (imageUrl) {
        const newImage = document.createElement('img'); // Create a new image element
        newImage.src = imageUrl;
        newImage.alt = "User-added image";
        Object.assign(newImage.style, {
            position: 'absolute',
            top: '50px',
            left: '50px',
            width: '150px', // Default size, can be resized by the user
            height: 'auto',
        });

        newImage.classList.add('draggable'); // Add draggable class
        makeDraggable(newImage); // Make the image draggable
        headerPreview?.appendChild(newImage); // Add the image to the preview
        updateOutput(); // Update the output code
    }

    closeImageDialog(); // Close the dialog after adding the image
}


   

   // Make existing elements draggable
   document.querySelectorAll('.draggable').forEach(makeDraggable);

   // Update the output initially
   updateOutput();