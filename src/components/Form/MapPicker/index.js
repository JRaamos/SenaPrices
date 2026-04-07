import { useCallback, useEffect, useRef, useState } from "react";

import { theme } from "ui/theme-color";
import { DisableLayer, MapContainer, Wrapper } from "./styled";


export default function MapPicker({
  initialCenter = { lat: -23.5505, lng: -46.6333 },
  initialRadius = 1000,
  initialZoom = 13,
  value,
  coordinate,
  coordinates,
  onChange,
  onSelect,
  disabled,
}) {
  const safeValue = value ?? coordinate ?? coordinates
  const safeOnChange = typeof onChange === 'function' ? onChange : onSelect
  const mapRef = useRef(null);
  const mapInstance = useRef(null);
  const markerRef = useRef(null);
  const circleRef = useRef(null);
  const clickListenerRef = useRef(null);

  const [radius, setRadius] = useState(initialRadius);

  const emitChange = useCallback((position, r) => {
    safeOnChange?.({
      lat: position.lat(),
      lng: position.lng(),
      radius: r,
    });
  }, [safeOnChange])

  const selectedPosition = useCallback((map, position) => {
    if (!markerRef.current) {
        markerRef.current = new window.google.maps.Marker({
      map,
      position,
      draggable: true,
        });

        markerRef.current.addListener("dragend", () => {
          const pos = markerRef.current.getPosition();
          circleRef.current.setCenter(pos);
          emitChange(pos, radius);
        });

        circleRef.current = new window.google.maps.Circle({
          map,
          radius,
          fillColor: theme.palette.primary.main,
          fillOpacity: 0.2,
          strokeColor: theme.palette.primary.main,
        });
      }

      markerRef.current.setPosition(position);
      circleRef.current.setCenter(position);
  }, [emitChange]);

  const handleRadiusChange = useCallback((e) => {
    const value = Number(e.target.value);
    setRadius(value);

    if (circleRef.current) {
      circleRef.current.setRadius(value);
      const pos = circleRef.current.getCenter();
      emitChange(pos, value);
    }
  }, [emitChange])

  useEffect(() => {
    if (!window.google || mapInstance.current) return;

    const map = new window.google.maps.Map(mapRef.current, {
      center: safeValue?.lat ? safeValue : initialCenter,
      zoom: initialZoom,
    });

    mapInstance.current = map;

  }, [initialCenter, initialZoom, safeValue]);

  useEffect(() => {
    if(!safeValue || !mapInstance.current) return;
    const position = new window.google.maps.LatLng(safeValue.lat, safeValue.lng);
    selectedPosition(mapInstance.current, position);  
    setRadius(safeValue?.radius || initialRadius);
    circleRef.current.setRadius(safeValue?.radius || initialRadius);
  }, [safeValue, initialRadius, selectedPosition]);

  const clickEvent = useCallback((e) => {
    const position = e.latLng;
    selectedPosition(mapInstance?.current, position);  
    emitChange(position, radius);
  }, [selectedPosition, emitChange])

  useEffect(() => {
    if (!mapInstance?.current || disabled) {
      return undefined
    }

    if (clickListenerRef.current) {
      window.google.maps.event.removeListener(clickListenerRef.current)
    }

    clickListenerRef.current = mapInstance.current.addListener("click", clickEvent);

    return () => {
      if (clickListenerRef.current) {
        window.google.maps.event.removeListener(clickListenerRef.current)
        clickListenerRef.current = null
      }
    }
  }, [clickEvent, disabled])

  return (
    <Wrapper>
      { disabled && <DisableLayer /> }
      <MapContainer ref={mapRef} /> 
      {/* <Slider
          min={100}
          max={10000}
          step={100}
          value={radius}
          onChange={handleRadiusChange} /> */}
    </Wrapper>
  );
}
