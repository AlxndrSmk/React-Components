const getDataByLink = async (link: string) => {
  try {
    if (link) {
      const response = await fetch(link);
      const data = await response.json();

      return data;
    }
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByLink;
