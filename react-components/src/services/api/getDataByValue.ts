const getDataByValue = async (endpoint) => {
  try {
    console.log(endpoint);
    const responce = await fetch(`https://swapi.dev/api/people/?search=${endpoint}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByValue;
