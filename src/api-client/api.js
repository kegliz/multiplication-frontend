import http from "./request"

const getRandomChallenge = () => {
  return http.get("/challenges/random");
};


export default {getRandomChallenge};
