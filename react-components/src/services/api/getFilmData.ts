const getFilmData = async (id: string) => {
  const serverUrl = import.meta.env.VITE_API_SERVER_URL;
  try {
    const responce = await fetch(`${serverUrl}/films/${id}`);
    if (responce.status === 404) {
      window.location.href = `/film-not-found`;
      return;
    }
    const data = await responce.json();
    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getFilmData;
