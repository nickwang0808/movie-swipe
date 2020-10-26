const posterStyleMaker = (url: string) => {
  return {
    backgroundImage: `url(${url})`,
    // background: `linear-gradient(25deg, rgba(255, 255, 255, 0) 51.03%, rgba(255, 255, 255, 0.3) 58.85%, rgba(255, 255, 255, 0.3) 99.3%), linear-gradient(360deg, rgba(0, 0, 0, 0.8) 0%, rgba(0, 0, 0, 0) 10%), url(${url})`,
  };
};

export default posterStyleMaker;
