const getDataByLink = async (link) => {
  try {
    const responce = await fetch(link);
    const data = await responce.json();

    console.log('dataByLink', data);
    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByLink;
