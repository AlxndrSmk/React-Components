const getListData = async (searchString: string, pageNumber: number, pathName: string) => {
  const serverUrl = 'https://swapi.dev/api';

  try {
    const response = await fetch(
      `${serverUrl}/${pathName}?search=${searchString}&page=${pageNumber}`
    );
    const data = await response.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getListData;
