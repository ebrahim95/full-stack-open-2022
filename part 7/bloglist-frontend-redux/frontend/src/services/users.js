import axios from "axios";
const baseUrl = "/api/users";

const users = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// eslint-disable-next-line import/no-anonymous-default-export
export default { users };
