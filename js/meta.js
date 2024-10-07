document.addEventListener('DOMContentLoaded', () => {
    // Constant meta information
    const constantMeta = {
      title: "izeeter’s domain",
      image: "https://izeeter.lol/x0Cf0A", // Ensure this URL is correct and accessible
      url: window.location.href, // Use the current page URL dynamically
    };
  
    // Your updated list of random phrases for the meta description
    const randomPhrases = [
      "like actually dont lol its nothing brazy",
      "no",
      "okay maybe click it",
      "you know you have nothing better to do, right?",
      "just gooning.",
      "just messing around with some ideas",
      "don't expect much here",
    ];
  
    // Select a random phrase for the description
    const randomDescription = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];
  
    // Set the document title dynamically
    document.title = `${constantMeta.title} - ${randomDescription}`;
  
    // Helper function to create and inject a meta tag
    function createMetaTag(attributes) {
      const metaTag = document.createElement('meta');
      Object.entries(attributes).forEach(([key, value]) => {
        metaTag.setAttribute(key, value);
      });
      document.head.appendChild(metaTag);
    }
  
    // Create and inject Open Graph meta tags
    createMetaTag({ property: 'og:title', content: constantMeta.title });
    createMetaTag({ property: 'og:description', content: randomDescription });
    createMetaTag({ property: 'og:image', content: constantMeta.image }); // Explicitly set og:image
    createMetaTag({ property: 'og:url', content: constantMeta.url });
    createMetaTag({ property: 'og:type', content: 'website' });
  
    // Create and inject Twitter meta tags
    createMetaTag({ name: 'twitter:title', content: constantMeta.title });
    createMetaTag({ name: 'twitter:description', content: randomDescription });
    createMetaTag({ name: 'twitter:image', content: constantMeta.image });
  
    // Log to confirm that the image tag has been set
    console.log(`Meta tags have been set: ${randomDescription} - ${constantMeta.image}`);
  });
  