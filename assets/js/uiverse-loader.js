/**
 * Uiverse Component Loader - Godspeed Bulldogs
 * Fast, reusable utility for implementing Uiverse.io components
 * 
 * Usage:
 * UIverse.load('puppy-card', { title: 'Bella', price: '$7,500' }, '#container');
 * UIverse.loadBulk('puppy-card', [...data], '#grid');
 * 
 * @version 1.0.0
 * @author Godspeed Bulldogs Development Team
 */

(function(window) {
  'use strict';

  const UIverse = {
    // Template cache for performance
    templateCache: {},
    
    // Base path for templates
    templatePath: '/templates/uiverse/',
    
    /**
     * Load a single component
     * @param {string} componentName - Name of component template file (without .html)
     * @param {object} data - Data to populate template
     * @param {string|Element} container - Container selector or element
     * @param {boolean} append - If true, append to container. If false, replace content
     * @returns {Promise}
     */
    load: async function(componentName, data = {}, container = null, append = true) {
      try {
        // Get template
        const template = await this.getTemplate(componentName);
        
        // Process data with defaults
        const processedData = this.processData(componentName, data);
        
        // Render HTML
        const html = this.render(template, processedData);
        
        // Insert into DOM if container provided
        if (container) {
          const element = typeof container === 'string' 
            ? document.querySelector(container) 
            : container;
          
          if (element) {
            if (append) {
              element.insertAdjacentHTML('beforeend', html);
            } else {
              element.innerHTML = html;
            }
          }
        }
        
        return html;
      } catch (error) {
        console.error(`[UIverse] Error loading component "${componentName}":`, error);
        return null;
      }
    },
    
    /**
     * Load multiple components at once
     * @param {string} componentName - Component template name
     * @param {array} dataArray - Array of data objects
     * @param {string|Element} container - Container selector or element
     * @param {boolean} replace - If true, replace container content first
     * @returns {Promise}
     */
    loadBulk: async function(componentName, dataArray = [], container = null, replace = true) {
      try {
        const element = typeof container === 'string' 
          ? document.querySelector(container) 
          : container;
        
        if (!element) {
          throw new Error(`Container "${container}" not found`);
        }
        
        // Clear container if replace is true
        if (replace) {
          element.innerHTML = '';
        }
        
        // Load all components
        const promises = dataArray.map(data => 
          this.load(componentName, data, element, true)
        );
        
        return await Promise.all(promises);
      } catch (error) {
        console.error(`[UIverse] Error loading bulk components:`, error);
        return null;
      }
    },
    
    /**
     * Get template from cache or fetch from server
     * @param {string} componentName
     * @returns {Promise<string>}
     */
    getTemplate: async function(componentName) {
      // Check cache first
      if (this.templateCache[componentName]) {
        return this.templateCache[componentName];
      }
      
      // Fetch template
      const response = await fetch(`${this.templatePath}${componentName}.html`);
      
      if (!response.ok) {
        throw new Error(`Template "${componentName}.html" not found (${response.status})`);
      }
      
      const template = await response.text();
      
      // Cache it
      this.templateCache[componentName] = template;
      
      return template;
    },
    
    /**
     * Process data with component-specific defaults
     * @param {string} componentName
     * @param {object} data
     * @returns {object}
     */
    processData: function(componentName, data) {
      const defaults = this.getDefaults(componentName);
      const processed = { ...defaults, ...data };
      
      // Add computed properties based on component type
      switch(componentName) {
        case 'puppy-card':
          processed.statusClass = this.getStatusClass(processed.status);
          processed.link = processed.link || '#';
          processed.id = processed.id || `puppy-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
          break;
        
        case 'glass-card':
          processed.linkText = processed.linkText || 'Learn More →';
          break;
        
        case 'hover-expand':
          processed.defaultText = processed.defaultText || 'HOVER';
          processed.hoverText = processed.hoverText || 'CLICK';
          processed.link = processed.link || '#';
          break;
      }
      
      return processed;
    },
    
    /**
     * Get default values for component
     * @param {string} componentName
     * @returns {object}
     */
    getDefaults: function(componentName) {
      const defaults = {
        'puppy-card': {
          title: 'Puppy Name',
          subtitle: 'Color • Gender',
          price: '$7,500',
          status: 'Available',
          image: '/assets/images/bulldogs/gallery/placeholder.jpg',
          link: '#'
        },
        'glass-card': {
          icon: '🐾',
          title: 'Title',
          description: 'Description goes here...',
          link: null,
          linkText: 'Learn More →'
        },
        'hover-expand': {
          defaultText: 'HOVER',
          hoverText: 'CLICK',
          link: '#'
        }
      };
      
      return defaults[componentName] || {};
    },
    
    /**
     * Get status CSS class
     * @param {string} status
     * @returns {string}
     */
    getStatusClass: function(status) {
      const statusMap = {
        'Available': 'available',
        'Reserved': 'reserved',
        'Coming Soon': 'coming-soon',
        'Sold': 'sold'
      };
      return statusMap[status] || 'available';
    },
    
    /**
     * Simple template renderer (supports {{variable}} syntax)
     * @param {string} template
     * @param {object} data
     * @returns {string}
     */
    render: function(template, data) {
      return template.replace(/\{\{(\w+)\}\}/g, (match, key) => {
        return data.hasOwnProperty(key) ? data[key] : match;
      });
    },
    
    /**
     * Preload templates for faster rendering
     * @param {array} componentNames - Array of component names to preload
     * @returns {Promise}
     */
    preload: async function(componentNames = []) {
      const promises = componentNames.map(name => this.getTemplate(name));
      return await Promise.all(promises);
    },
    
    /**
     * Clear template cache
     */
    clearCache: function() {
      this.templateCache = {};
      console.log('[UIverse] Template cache cleared');
    }
  };
  
  // Expose to window
  window.UIverse = UIverse;
  
  // Auto-initialize on DOMContentLoaded
  document.addEventListener('DOMContentLoaded', function() {
    console.log('[UIverse] Loader initialized');
    
    // Preload common templates
    UIverse.preload(['puppy-card', 'glass-card', 'hover-expand']);
  });
  
})(window);



