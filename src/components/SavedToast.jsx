import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useTheme } from '../context/ThemeContext';

function SavedToast({ showSaved, isMobile }) {
  const { theme } = useTheme();

  // Toast styling functions
  const getThemeColor = (colorProp) => {
    const computedStyle = getComputedStyle(document.documentElement);
    const value = computedStyle.getPropertyValue(colorProp).trim();
    return value;
  };

  const accent = getThemeColor('--a');
  const neutral = getThemeColor('--n');
  const success = getThemeColor('--su');
  const warningContent = getThemeColor('--wac');

  const getShadowColor = (currentTheme) => {
    return currentTheme === 'cordovanChalkTheme'
      ? `rgba(41, 37, 36, 0.3)`
      : `rgba(240, 239, 205, 0.2)`;
  };

  const positionValue = isMobile ? 'top-center' : 'top-right';

  useEffect(() => {
    if (showSaved) {
      toast.success('saved!', {
        position: positionValue,
        style: {
          border: `1px solid oklch(${warningContent})`,
          borderRadius: '10px',
          fontSize: '1rem',
          fontWeight: 'bold',
          padding: '8px',
          color: `oklch(${accent})`,
          backgroundColor: `oklch(${neutral})`,
          boxShadow: `0px 0px 11px -3px ${getShadowColor(theme)}`,
        },
        iconTheme: {
          primary: `oklch(${success})`,
          secondary: `oklch(${neutral})`,
        },
      });
    }
  }, [
    showSaved,
    accent,
    neutral,
    success,
    warningContent,
    positionValue,
    theme,
  ]);

  // This component doesn't render anything visible
  return null;
}

export default SavedToast;
