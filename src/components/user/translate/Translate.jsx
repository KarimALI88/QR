import React, { useContext, useState } from "react";
import { AppContext } from "../../../context/AppContext";
import { useTranslation } from "react-i18next";

const Translate = ({ closeNavbar }) => {
  const { language, setLanguage } = useContext(AppContext);
  const { i18n } = useTranslation();

  const changeLang = (lang) => {
    i18n.changeLanguage(lang);
    document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"; // Set text direction
  };

  return (
    <div className="p-4">
        <button onClick={() => changeLang(i18n.language == "ar" ? "en" : "ar")}>
          {i18n.language == "en" ? (
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fe/Flag_of_Egypt.svg/800px-Flag_of_Egypt.svg.png"
              alt="arabic language"
              className="w-[40px] h-[30px]"
            />
          ) : (
            <img
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFwAAABcCAMAAADUMSJqAAAAb1BMVEX////IEC4BIWnIDy7GACHdiZH35OUAAF7EAAXKy9cAHGcAE2R6epjDAADICywAHmjU1d/rvcDFABLinKHlqKzc3eXXensAAFrEAAzko6fFABjtw8YACmIAF2UADmNyc5Hy8/fVb2/afoYAAFXwztFmaVTcAAADpElEQVRoge2Z7ZLqIAyGU9tdaz1aW/VYt677ef/XuAUKBEgo3V3PzJkxvxyFp+ElSSHCHrTtltWCseUK4KHIpBUPAKslN7Ja7gD6Is+yfHOGFtGfOXoyvHoe2E27HdjdASArD8j3+mdw5bdiC6el+9qODD0RXi2PA3sj2BspiPmg6BdSmTR4dRnYjWIrOYT0rfV9t6boSfBqLfR+2iJggR7ExkwKvJZ6d1ssxadaRlz3BHiN9LYwtLkjPVRmGl6thd6lQKHww2Gplbn4vk/C64vQROlt3QSxCZvM0/1Uz4PXJ8EWfmco9HZAfn30dnUCLuObcBEqckFeJYjDVQyG4lYw/tR5W+FWgijcz3mbMMAF0e5UpcErKexm66W6EBYWdPi7lSACD3NeLVxMBiuak7jgVAIeHp0KasiVf3wUziz6qiaCHkTpbioBB5+YBs6Wd0wlYOB0ztsFazgWr0PiXWseLnO+iaSIgbNpVnNwOudxclv4OHhDDabgozNBeqDkQ/BRd2qZBNx7zwd6+3C2ElQhHOU8cuToliQH7ry+8VJDOJ/zLJxLig8f/kEnnfca8OBMOq98+CpeLhg4UwnAhYNeXhnmPIavfbsqOYvBkDI+vFED8MZcAxT8Ce3ldaD/Ffb2ycAf3+TvdmmvLwQIks2T5XftDv81+GOqvWv4e/IUKFNtZA/05CmQp1pmLHkKZDe0O/wOv8Pv8P8PftOSe9OXxU1fczd9Qd/h/x7OHKFHO6iT9CMD/1Qn6Z47QtOH/9HO6ojfsJ7v1YCeOfyT1xY9tRzyctv1EVkO4sq9FY+nri3UhUv73Qr2U0NfuIJBkxcueVU0TuXaKfKqaJTRy5u4KspLrjNJyUlfcs3GGCdil1ysyV4ut+1j13O9xFLo3jXR67kzoRMT2ibeWHAceeojjYX6ROodbYkYCTMjIdkSCQeX/XQzBzuT+bq7bagwvCbbUGYKltGDhxtUNmkNNL3YDgWAC6+RJmcTg2mtP34aaloSSZHWtHQWjCuBbbeGeie3W7mp4D/exuCMRjGzaOCEm9fidqc3psXt5Dza8nnNeUf3blQGcLC6OZ8KJ0qSrASXGvw0y6nylvKHiNHdVgLYkV9/568c7KKsBPY7d0GLefAFLa63FTjn58CZShDE4E/++AtgZPjPh3uVQOCK8VGRV3gqPKwEud3gIOfnwsNKMK13OtyJdwEFPufnw/1KEMn5b8CdM8G5VZrkBRcnM+GO7/sv4Sh/pe4AOYMAAAAASUVORK5CYII="
              alt="arabic language"
              className="w-[40px] h-[30px]"
            />
          )}
        </button>
    </div>
  );
};

export default Translate;
