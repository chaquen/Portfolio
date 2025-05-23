import React, { useEffect, useState } from 'react';
import './ThemeSwitcher.css';

const predefinedThemes = {
  'default-blue-white-grey': {
    '--primary-color': '#003366',
    '--secondary-color': '#007BFF',
    '--background-color': '#FFFFFF',
    '--text-color': '#333333',
    '--subtle-background-color': '#F2F2F2',
    '--accent-color': '#007BFF',
  },
  'dark-mode': {
    '--primary-color': '#1A1A1A',
    '--secondary-color': '#E0E0E0',
    '--background-color': '#121212',
    '--text-color': '#FFFFFF',
    '--subtle-background-color': '#212121',
    '--accent-color': '#00FFFF',
  },
  'accent-green': { // Based on 'default-blue-white-grey'
    '--primary-color': '#003366',
    '--secondary-color': '#007BFF',
    '--background-color': '#FFFFFF',
    '--text-color': '#333333',
    '--subtle-background-color': '#F2F2F2',
    '--accent-color': '#32CD32', // Verde Vibrante
  },
  'accent-orange': { // Based on 'default-blue-white-grey'
    '--primary-color': '#003366',
    '--secondary-color': '#007BFF',
    '--background-color': '#FFFFFF',
    '--text-color': '#333333',
    '--subtle-background-color': '#F2F2F2',
    '--accent-color': '#FFA500', // Naranja
  },
};

const ThemeSwitcher = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [customBackgroundColor, setCustomBackgroundColor] = useState('#FFFFFF');
  const [customTextColor, setCustomTextColor] = useState('#333333');
  const [customAccentColor, setCustomAccentColor] = useState('#007BFF');

  const applyTheme = (themeName) => {
    const themeColors = predefinedThemes[themeName];
    if (themeColors) {
      Object.keys(themeColors).forEach(key => {
        document.documentElement.style.setProperty(key, themeColors[key]);
      });
      
      localStorage.setItem('theme', themeName);
      localStorage.removeItem('customTheme'); // Clear custom theme
      setSelectedTheme(themeName);
      // Optionally, reset custom color pickers to reflect the selected predefined theme
      // For example:
      // setCustomBackgroundColor(themeColors['--background-color'] || '#FFFFFF');
      // setCustomTextColor(themeColors['--text-color'] || '#333333');
      // setCustomAccentColor(themeColors['--accent-color'] || '#007BFF');
    }
  };

  const applyCustomColors = (bgColor, textColor, accentColor) => {
    document.documentElement.style.setProperty('--background-color', bgColor);
    document.documentElement.style.setProperty('--text-color', textColor);
    document.documentElement.style.setProperty('--accent-color', accentColor);
    // For now, we are only explicitly setting the three main ones.
    // Other related CSS variables like --primary-color, --secondary-color, 
    // and --subtle-background-color will fallback to their definitions in :root or body
    // or could be derived/set here if a more comprehensive custom theme is desired.

    localStorage.setItem('customTheme', JSON.stringify({ background: bgColor, text: textColor, accent: accentColor }));
    setSelectedTheme(''); // Clear predefined theme selection
  };

  const handleCustomBgChange = (event) => {
    const newBgColor = event.target.value;
    setCustomBackgroundColor(newBgColor);
    applyCustomColors(newBgColor, customTextColor, customAccentColor);
  };

  const handleCustomTextChange = (event) => {
    const newTextColor = event.target.value;
    setCustomTextColor(newTextColor);
    applyCustomColors(customBackgroundColor, newTextColor, customAccentColor);
  };

  const handleCustomAccentChange = (event) => {
    const newAccentColor = event.target.value;
    setCustomAccentColor(newAccentColor);
    applyCustomColors(customBackgroundColor, customTextColor, newAccentColor);
  };

  useEffect(() => {
    const savedCustomThemeString = localStorage.getItem('customTheme');
    if (savedCustomThemeString) {
      const savedCustomColors = JSON.parse(savedCustomThemeString);
      setCustomBackgroundColor(savedCustomColors.background);
      setCustomTextColor(savedCustomColors.text);
      setCustomAccentColor(savedCustomColors.accent);
      // Apply the colors directly, as applyCustomColors also saves to localStorage and clears selectedTheme
      document.documentElement.style.setProperty('--background-color', savedCustomColors.background);
      document.documentElement.style.setProperty('--text-color', savedCustomColors.text);
      document.documentElement.style.setProperty('--accent-color', savedCustomColors.accent);
      setSelectedTheme(''); // Ensure no predefined theme is selected
    } else {
      const savedTheme = localStorage.getItem('theme');
      if (savedTheme) {
        applyTheme(savedTheme);
      } else {
        applyTheme('default-blue-white-grey'); // Apply default if no theme is saved
      }
    }
  }, []); // Empty dependency array, runs once on mount

  const handleResetToDefault = () => {
    localStorage.removeItem('theme');
    localStorage.removeItem('customTheme');
    
    // Apply the default predefined theme
    applyTheme('default-blue-white-grey'); // This will also set selectedTheme state

    // Reset custom color states to the default theme's colors
    const defaultThemeColors = predefinedThemes['default-blue-white-grey'];
    if (defaultThemeColors) {
      setCustomBackgroundColor(defaultThemeColors['--background-color']);
      setCustomTextColor(defaultThemeColors['--text-color']);
      setCustomAccentColor(defaultThemeColors['--accent-color']);
    } else {
      // Fallback defaults if 'default-blue-white-grey' isn't in predefinedThemes (it should be)
      setCustomBackgroundColor('#FFFFFF');
      setCustomTextColor('#333333');
      setCustomAccentColor('#007BFF');
    }
  };

  // Helper function to format theme names for display
  const formatThemeName = (themeName) => {
    return themeName
      .replace(/-/g, ' ')
      .replace(/\b\w/g, l => l.toUpperCase());
  };

  return (
    <div className="theme-switcher-container">
      <h4>Theme Options</h4>
      <div className="predefined-themes">
        <h5>Predefined Themes</h5>
        {Object.keys(predefinedThemes).map(themeName => (
          <div key={themeName}>
            <input
              type="radio"
              id={`theme-${themeName}`}
              name="theme"
              value={themeName}
              checked={selectedTheme === themeName}
              onChange={() => applyTheme(themeName)}
            />
            <label htmlFor={`theme-${themeName}`}>{formatThemeName(themeName)}</label>
          </div>
        ))}
      </div>

      <div className="custom-colors">
        <h5>Custom Colors</h5>
        {/* <p>Custom Colors Area</p> */} {/* Placeholder text removed as per example, but functionality is there */}
        <div>
          <label htmlFor="bg-color-picker">Background Color:</label>
          <input type="color" id="bg-color-picker" value={customBackgroundColor} onChange={handleCustomBgChange} />
        </div>
        <div>
          <label htmlFor="text-color-picker">Text Color:</label>
          <input type="color" id="text-color-picker" value={customTextColor} onChange={handleCustomTextChange} />
        </div>
        <div>
          <label htmlFor="accent-color-picker">Accent Color:</label>
          <input type="color" id="accent-color-picker" value={customAccentColor} onChange={handleCustomAccentChange} />
        </div>
      </div>

      <button onClick={handleResetToDefault}>Reset to Default</button>
    </div>
  );
};

export default ThemeSwitcher;
