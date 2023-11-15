const getDataByLink = async (link: string) => {
  try {
    if (link) {
      const responce = await fetch(link);
      const data = await responce.json();

      return data;
    }
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByLink;
