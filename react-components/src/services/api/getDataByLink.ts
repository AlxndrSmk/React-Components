const getDataByLink = async (link: string) => {
  const serverUrl = import.meta.env.VITE_API_SERVER_URL;
  try {
    const responce = await fetch(`${serverUrl}${link}`);
    const data = await responce.json();

    return data;
  } catch (error) {
    console.log('msg', error);
  }
};

export default getDataByLink;
