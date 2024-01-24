// Display OS uptime

const osUptime = (x) => {
  const hours = Math.floor(x / 3600);
  const minutes = Math.floor((x % 3600) / 60);
  const seconds = Math.floor(x % 60);
  return `${hours}h ${minutes}m ${seconds}s`;
};

export default osUptime;
