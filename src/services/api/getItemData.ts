const getitemData = async (id: string, itemsName: string) => {
  const serverUrl = 'https://swapi.dev/api';
  try {
    const responce = await fetch(`${serverUrl}/${itemsName}/${id}`);
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

export default getitemData;
