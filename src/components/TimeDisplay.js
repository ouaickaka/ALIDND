import React, { useEffect, useState } from 'react';
import '../styles/main.css';

// Component to display the current time and date based on user's timezone
const TimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [timezone, setTimezone] = useState(null); // Initially set to null to indicate no timezone yet
  const [error, setError] = useState(false); // Track if there's an error fetching the IP

  // Fetch user's timezone based on IP
  useEffect(() => {
    const fetchTimezone = async () => {
      try {
        // Try fetching the timezone using ipinfo API
        const response = await fetch('https://ipinfo.io/json?token=d8f79fa5a4d66c');
        if (response.ok) {
          const data = await response.json();
          setTimezone(data.timezone); // Set the timezone based on IP location
        } else {
          throw new Error('Failed to fetch timezone from ipinfo'); // Trigger fallback if response is not OK
        }
      } catch (error) {
        console.error('Error fetching timezone from ipinfo:', error);
        setError(true); // Set error to true if there's an issue with the fetch
        // Fallback to browser locale
        setTimezone(Intl.DateTimeFormat().resolvedOptions().timeZone);
      }
    };

    fetchTimezone();
  }, []);

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  // Format time based on the user's timezone
  const formattedTime = timezone
    ? currentTime.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
        timeZone: timezone,
      })
    : '';

  // Format date based on the user's timezone
  const formattedDate = timezone
    ? currentTime.toLocaleDateString('en-US', {
        day: '2-digit',
        month: 'long',
        year: 'numeric',
        timeZone: timezone,
      })
    : '';

  // Only show component if the timezone is available
  if (!timezone) return null;

  return (
    <div className="time-display">
      <p>{`${formattedDate} + ${formattedTime}`}</p>
    </div>
  );
};

export default TimeDisplay;
