import http from "./axiosConfig"

const _getRandomChallenge = () => {
  return http.get("/challenges/random");
};

const _addAttempt = (newAttempt) => {
  return http.post("/attempts", newAttempt);
};

const _getLastAttempts = (userAlias) => {
  return http.get("/attempts", {params: { alias: userAlias}});
};

const addAttempt = async (newAttempt) => {
  const { data } = await _addAttempt(newAttempt);
  return data;
};

const getLastAttempts = async ({queryKey}) => {
  console.log('key: ' +JSON.stringify(queryKey));
  const [_key, { userAlias }] = queryKey;
  const { data } = await _getLastAttempts(userAlias);
  return data;
};

const getRandomChallenge = async () => {
  const { data } = await _getRandomChallenge();
  return data;
};

export default {getRandomChallenge, addAttempt, getLastAttempts};
