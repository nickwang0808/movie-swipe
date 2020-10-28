const posterStyleMaker = (url: string) => {
  return {
    backgroundImage: `linear-gradient(25deg, rgba(255, 255, 255, 0) 52%, rgba(255, 255, 255, 0.2) 53%, rgba(255, 255, 255, 0.2) 100%), url(${url})`,
  };
};

export default posterStyleMaker;
