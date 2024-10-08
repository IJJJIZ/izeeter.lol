// File: js/copyClipboard.js
document.addEventListener("DOMContentLoaded", () => {
    // Select all <pre><code> blocks on the page
    const codeBlocks = document.querySelectorAll('pre code');

    // Loop through each code block and add a copy image button
    codeBlocks.forEach((block) => {
        // Create a container div for the code block and the image button
        const container = document.createElement('div');
        container.classList.add('code-container');

        // Create the image element for the copy button
        const copyButton = document.createElement('img');
        copyButton.classList.add('copy-button');
        copyButton.src = '../imgs/copy.png'; // Default "Copy" image
        copyButton.alt = 'Copy Code';
        copyButton.width = 24; // Adjust the size if necessary
        copyButton.height = 24;

        // Insert the container before the <pre> element
        block.parentNode.parentNode.insertBefore(container, block.parentNode);

        // Move the <pre> element inside the container
        container.appendChild(block.parentNode);

        // Add the image button to the container
        container.appendChild(copyButton);

        // Attach the copy functionality to the image button
        copyButton.addEventListener('click', () => {
            // Select the content of the <code> block
            const codeContent = block.textContent;

            // Copy the code content to the clipboard using Clipboard API
            navigator.clipboard.writeText(codeContent).then(() => {
                // Change the image to indicate successful copy
                copyButton.src = '../imgs/copy.png'; // Change to "Copied" image
                setTimeout(() => {
                    copyButton.src = '../imgs/copy.png'; // Revert to original "Copy" image after 2 seconds
                }, 2000);
            }).catch((err) => {
                console.error('Failed to copy: ', err);
            });
        });
    });
});
