const getData = async (endpoint) => {
  try {
    const responce = await fetch(`https://pokeapi.co/api/v2/ability/${endpoint}`);
    const data = await responce.json();

    console.log(data);
    return data;
  } catch (error) {
    console.log(error);
  } finally {
  }
};

export default getData;
