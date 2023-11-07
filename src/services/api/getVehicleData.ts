const getVehicleData = async (id: string) => {
  const serverUrl = 'https://swapi.dev/api';
  try {
    const responce = await fetch(`${serverUrl}/vehicles/${id}`);
    if (responce.status === 404) {
      window.location.href = `/not-found`;
      return;
    }
    const data = await responce.json();
    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getVehicleData;
