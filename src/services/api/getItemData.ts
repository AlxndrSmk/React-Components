const getitemData = async (id: string, itemsName: string) => {
  const serverUrl = 'https://swapi.dev/api';
  try {
    const response = await fetch(`${serverUrl}/${itemsName}/${id}`);
    if (response.status === 404) {
      window.location.href = `/not-found`;
      return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getitemData;
