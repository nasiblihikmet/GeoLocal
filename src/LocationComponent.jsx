import  { useState, useEffect } from 'react';

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const onSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      setLocation({ latitude, longitude });
    };

    const onError = (error) => {
      if (error.code === 1) {
        setError('Location services are off. Please enable location in browser settings.');
      } else {
        setError(error.message);
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.watchPosition(onSuccess, onError);
    } else {
      setError('Browser does not support location services.');
    }

    // Bileşen kullanımdan çıktığında konum izlemesini durdurmak için temizleme işlevi
    return () => navigator.geolocation && navigator.geolocation.clearWatch();
  }, []);

  return (
    <div>
      {error && <p>Hata: {error}</p>}
      {location && (
        <p>
         Location: Latitude: {location.latitude}, Longitude: {location.longitude}
        </p>
      )}
    </div>
  );
};

export default LocationComponent;
