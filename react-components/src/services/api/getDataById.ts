const getDataById = async (id) => {
  try {
    const responce = await fetch(`https://swapi.dev/api/people/${id}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataById;
