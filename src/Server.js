const ip = process.env.REACT_APP_IP;
const port = process.env.REACT_APP_PORT;

export const baseIp = `http://localhost:${port}`;
console.log("baseIp", baseIp);
