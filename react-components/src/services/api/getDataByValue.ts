const getDataByValue = async (endpoint) => {
  try {
    const responce = await fetch(`https://pokeapi.co/api/v2/pokemon/${endpoint}`);
    const data = await responce.json();
    console.log('data', data);

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByValue;
