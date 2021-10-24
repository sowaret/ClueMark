export const generateJoinKey = () => Math.floor(Math.random() * Date.now());
export const send = (ws, data) => ws.send(JSON.stringify(data));
