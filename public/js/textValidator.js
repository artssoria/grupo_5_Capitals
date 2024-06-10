document.addEventListener('DOMContentLoaded', (event) => {
    const maxLength = 80; 
    const paragraphs = document.querySelectorAll('[id^="textParagraph"]');

    paragraphs.forEach(paragraph => {
        const originalText = paragraph.textContent;

        if (originalText.length > maxLength) {
            const truncatedText = originalText.substring(0, maxLength) + '...';
            paragraph.textContent = truncatedText;
        }
    });

});