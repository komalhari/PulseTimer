import React from 'react'
import { useState, useEffect } from 'react';

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const LanguageTimezone = () => {

const languages = [
  { label: "English", value: "en" },
  { label: "Spanish", value: "es" },
  { label: "French", value: "fr" },
  { label: "German", value: "de" },
  { label: "Hindi", value: "hi" },
  { label: "Chinese (Simplified)", value: "zh" },
  { label: "Chinese (Traditional)", value: "zh-TW" },
  { label: "Japanese", value: "ja" },
  { label: "Korean", value: "ko" },
  { label: "Portuguese", value: "pt" },
  { label: "Russian", value: "ru" },
  { label: "Arabic", value: "ar" },
  { label: "Italian", value: "it" },
  { label: "Dutch", value: "nl" },
  { label: "Bengali", value: "bn" },
  { label: "Turkish", value: "tr" },
  { label: "Vietnamese", value: "vi" },
  { label: "Polish", value: "pl" },
  { label: "Thai", value: "th" },
  { label: "Urdu", value: "ur" },
  { label: "Indonesian", value: "id" },
  { label: "Persian (Farsi)", value: "fa" },
  { label: "Hebrew", value: "he" },
  { label: "Swahili", value: "sw" },
  { label: "Ukrainian", value: "uk" },
  { label: "Tamil", value: "ta" },
  { label: "Telugu", value: "te" },
  { label: "Marathi", value: "mr" },
  { label: "Malayalam", value: "ml" },
  { label: "Kannada", value: "kn" },
  { label: "Nepali", value: "ne" },
];

const timezones = [
  { label: "UTC", value: "UTC" },
  { label: "Nepal Standard Time (UTC+05:45)", value: "Asia/Katmandu" },
  { label: "India Standard Time (UTC+05:30)", value: "Asia/Kolkata" },
  { label: "Bangladesh Standard Time (UTC+06:00)", value: "Asia/Dhaka" },
  { label: "China Standard Time (UTC+08:00)", value: "Asia/Shanghai" },
  { label: "Japan Standard Time (UTC+09:00)", value: "Asia/Tokyo" },
  { label: "Australian Eastern Time (UTC+10:00)", value: "Australia/Sydney" },
  { label: "Central European Time (UTC+01:00)", value: "Europe/Berlin" },
  { label: "Greenwich Mean Time (UTC+00:00)", value: "Europe/London" },
  { label: "Eastern European Time (UTC+02:00)", value: "Europe/Kyiv" },
  { label: "Moscow Standard Time (UTC+03:00)", value: "Europe/Moscow" },
  { label: "Gulf Standard Time (UTC+04:00)", value: "Asia/Dubai" },
  {
    label: "Eastern Time (US & Canada) (UTC-05:00)",
    value: "America/New_York",
  },
  { label: "Central Time (US & Canada) (UTC-06:00)", value: "America/Chicago" },
  { label: "Mountain Time (US & Canada) (UTC-07:00)", value: "America/Denver" },
  {
    label: "Pacific Time (US & Canada) (UTC-08:00)",
    value: "America/Los_Angeles",
  },
  { label: "Brasília Time (UTC-03:00)", value: "America/Sao_Paulo" },
  {
    label: "Argentina Time (UTC-03:00)",
    value: "America/Argentina/Buenos_Aires",
  },
  {
    label: "South Africa Standard Time (UTC+02:00)",
    value: "Africa/Johannesburg",
  },
];

const sortedTimezones = [...timezones].sort((a, b) =>
  a.label.localeCompare(b.label)
);


 const defaultLanguage = "en";
  const defaultTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;

  const matchedTimezone =
    timezones.find((tz) => tz.value === defaultTimezone)?.value || "UTC";

  const [language, setLanguage] = useState(() => defaultLanguage);

  const [timezone, setTimezone] = useState(() => matchedTimezone);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedLang = localStorage.getItem("user-language");
      if (storedLang) {
        setLanguage(storedLang);
      }
      const storedTimezone = localStorage.getItem("user-timezone");
      if (storedTimezone) {
        setTimezone(storedTimezone);
      }
    }
  }, []);
  
  useEffect(() => {
    if (timezone) {
      localStorage.setItem("user-timezone", timezone);
    }
    if (language) {
      localStorage.setItem("user-language", language);
    }
  }, [timezone, language]);

  return (
    <>
    
     <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select Language
                      </label>

                      <Select
                        defaultValue={language}
                        onValueChange={setLanguage}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a timezone" />
                        </SelectTrigger>
                        <SelectContent>
                          {languages.map((lang) => (
                            <SelectItem key={lang.value} value={lang.value}>
                              {lang.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Select Timezone
                      </label>
                      <Select
                        defaultValue={timezone}
                        onValueChange={setTimezone}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Choose a country" />
                        </SelectTrigger>
                        <SelectContent>
                          {sortedTimezones.map((tz) => (
                            <SelectItem key={tz.value} value={tz.value}>
                              {tz.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
    
    
    
    </>
  )
}

export default LanguageTimezone