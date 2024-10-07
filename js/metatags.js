// metaTags.js
const metaContent = {
    "default": {
        "title": "bro dont go here",
        "description": "like actually dont lol its nothing brazy",
        "image": "https://izeeter.lol/x0Cf0A",
        "url": "https://why.izeeter.lol",
    }
    // Add other pages here
};

function getMetaContent(pageKey = "default") {
    return metaContent[pageKey] || metaContent["default"];
}

function setMetaTags(pageKey = "default") {
    const metaTags = getMetaContent(pageKey);

    const setMetaProperty = (property, content) => {
        let meta = document.querySelector(`meta[${property}="${content}"]`);
        if (!meta) {
            meta = document.createElement('meta');
            meta.setAttribute(property, content);
            document.head.appendChild(meta);
        }
        return meta;
    };

    // Open Graph Meta Tags
    setMetaProperty('property', 'og:title').content = metaTags.title;
    setMetaProperty('property', 'og:description').content = metaTags.description;
    setMetaProperty('property', 'og:image').content = metaTags.image;
    setMetaProperty('property', 'og:url').content = metaTags.url;
    setMetaProperty('property', 'og:type').content = 'website';

    // Twitter Card Meta Tags
    setMetaProperty('name', 'twitter:title').content = metaTags.title;
    setMetaProperty('name', 'twitter:description').content = metaTags.description;
    setMetaProperty('name', 'twitter:image').content = metaTags.image;

    // Set the document title dynamically
    document.title = metaTags.title;
}

// Export the function for external use in other scripts
export { setMetaTags };
