document.addEventListener('DOMContentLoaded', () => {
    // Define the constant meta information
    const constantMeta = {
      title: "izeeter’s domain",
      image: "https://izeeter.lol/x0Cf0A",
      url: window.location.href, // Dynamically use the current page URL
    };
  
    // List of random phrases to choose from
    const randomPhrases = [
      "like actually dont lol its nothing brazy",
      "no",
      "okay maybe click it",
      "you know you have nothing better to do, right?",
      "just gooning.",
      "just messing around with some ideas",
      "don't expect much here",
    ];
  
    // Select a random phrase from the list
    const randomDescription = randomPhrases[Math.floor(Math.random() * randomPhrases.length)];

    // Function to create and add a meta tag to the head
    function createMetaTag(attributes) {
    const metaTag = document.createElement('meta');
    Object.entries(attributes).forEach(([key, value]) => {
        metaTag.setAttribute(key, value);
    });
    document.head.appendChild(metaTag);
    }

    // Create meta tags for Open Graph
    createMetaTag({ property: 'og:title', content: constantMeta.title });
    createMetaTag({ property: 'og:description', content: randomDescription });
    createMetaTag({ property: 'og:image', content: constantMeta.image });
    createMetaTag({ property: 'og:url', content: constantMeta.url });
    createMetaTag({ property: 'og:type', content: 'website' });

    // Create meta tags for Twitter
    createMetaTag({ name: 'twitter:title', content: constantMeta.title });
    createMetaTag({ name: 'twitter:description', content: randomDescription });
    createMetaTag({ name: 'twitter:image', content: constantMeta.image });

    // Set the document title dynamically
    document.title = constantMeta.title + " - " + randomDescription;
});