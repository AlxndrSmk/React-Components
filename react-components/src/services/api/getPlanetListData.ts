const getPlanetListData = async (endpoint: string, page: number) => {
  const serverUrl = import.meta.env.VITE_API_SERVER_URL;
  console.log(endpoint, page);

  try {
    const responce = await fetch(`${serverUrl}/planets?search=${endpoint}&page=${page}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getPlanetListData;
