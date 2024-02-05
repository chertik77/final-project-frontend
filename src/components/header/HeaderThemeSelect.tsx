import React, { useState, useEffect } from "react";
// import sprite from 'sprite.svg';

const HeaderThemeSelect: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [list, setList] = useState<boolean>(false);

  useEffect(() => {
    document.body.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme: string): void => {
    setTheme(newTheme);
    setList(false);
  };

  const toggleList = (): void => {
    setList(!list);
  };

  return (
    <div className="relative">
      <div
        className="flex items-center justify-between w-68 h-21 text-themeTitleTextColor text-14 font-semibold tracking-wide cursor-pointer transition-opacity hover:opacity-70"
        onClick={toggleList}
      >
        Theme
        <svg className="fill-current stroke-current w-16 h-17">
          <use href={`${"sprite"}#icon-chevron-down`} />
        </svg>
      </div>
      {list && (
        <ul className="absolute top-0 right-0 flex flex-col justify-between p-18 border-1 border-greenGreenBlueColor bg-themeListBgColor rounded-8 shadow-boxShadow w-100 h-107 font-semibold text-14">
          <li
            className={`cursor-pointer ${
              theme === 'light' ? 'text-greenGreenBlueColor' : 'text-popupTextColor'
            } transition-opacity hover:opacity-70`}
            onClick={() => handleThemeChange('light')}
          >
            Light
          </li>
          <li
            className={`cursor-pointer ${
              theme === 'dark' ? 'text-greenGreenBlueColor' : 'text-popupTextColor'
            } transition-opacity hover:opacity-70`}
            onClick={() => handleThemeChange('dark')}
          >
            Dark
          </li>
          <li
            className={`cursor-pointer ${
              theme === 'violet' ? 'text-greenGreenBlueColor' : 'text-popupTextColor'
            } transition-opacity hover:opacity-70`}
            onClick={() => handleThemeChange('violet')}
          >
            Violet
          </li>
        </ul>
      )}
    </div>
  );
};

export default HeaderThemeSelect;






// // export const HeaderThemeSelect = () => {
// //   return <div>HeaderThemeSelect</div>
// // }

// // export default HeaderThemeSelect;
