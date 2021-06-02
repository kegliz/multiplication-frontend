import http from "./request"

const getRandomChallenge = () => {
  return http.get("/challenges/random");
};

const addAttempt = (newAttempt) => {
  return http.post("/attempts", newAttempt);
};

export default {getRandomChallenge, addAttempt};
