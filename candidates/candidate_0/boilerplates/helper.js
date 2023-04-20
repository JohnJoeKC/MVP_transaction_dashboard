function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(amount);
  }
  
  function createElement(tag, attributes, ...children) {
    const element = document.createElement(tag);
    
    for (const [attr, value] of Object.entries(attributes || {})) {
      element.setAttribute(attr, value);
    }
    
    for (const child of children) {
      if (typeof child === 'string') {
        element.appendChild(document.createTextNode(child));
      } else {
        element.appendChild(child);
      }
    }
    
    return element;
  }
  