const extractFileName = (fileName) => {
    const regex = /[^_]+$/;
    const match = fileName.match(regex);
    return match ? match[0] : fileName; 
  };
export default extractFileName;