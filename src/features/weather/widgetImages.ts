// Weather background image selector for cards and detail pages
export function getWidgetImage(weatherMain: string) {
  const map: Record<string, string> = {
    Clear: "https://openweathermap.org/img/widget_images/clear_sky.jpg",
    Clouds: "https://openweathermap.org/img/widget_images/overcast_clouds.jpg",
    Rain: "https://openweathermap.org/img/widget_images/rain.jpg",
    Thunderstorm:
      "https://openweathermap.org/img/widget_images/thunderstorm.jpg",
    Snow: "https://openweathermap.org/img/widget_images/snow.jpg",
    Fog: "https://openweathermap.org/img/widget_images/fog.jpg",
  };
  return (
    map[weatherMain] ||
    "https://openweathermap.org/img/widget_images/clear_sky.jpg"
  );
}
