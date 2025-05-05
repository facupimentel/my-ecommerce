const sumCb = (req, res) => {
  const result = sum();
  return res.json200(result);
};

const sumProcess = (req, res) => {
  const childProcess = fork("./src/helpers/sumFork.helper.js"); // creamos un subproceso, sirve para no bloquear otros endpoints mientras uno todavia se ejecuta
  childProcess.send("start"); // con esto lo activamos
  childProcess.on("message", (result) => res.json200(result));
};

export {sumCb, sumProcess}