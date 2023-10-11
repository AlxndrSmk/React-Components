const getDataByValue = async (endpoint, page) => {
  try {
    console.log(endpoint, page);
    const responce = await fetch(`https://swapi.dev/api/people/?search=${endpoint}&page=${page}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByValue;
