const getData = async (endpoint) => {
  try {
    const responce = await fetch(`https://pokeapi.co/api/v2/ability/${endpoint}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getData;
