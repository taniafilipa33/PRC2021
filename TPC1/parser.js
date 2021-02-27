var fs = require("fs");
var db = require("./db.json");
var toWrite = "";

db["uc"].forEach((uc) => {
  toWrite =
    toWrite +
    "\n### http://www.semanticweb.org/comta/ontologies/tcp1#" +
    uc.sigla +
    "\n" +
    ":" +
    uc.sigla +
    " " +
    "rdf:type owl:NamedIndividual" +
    " ," +
    "\n" +
    "\t\t\t " +
    ":UnidadeCurricular ;" +
    "\n" +
    "\t" +
    ":anoLetivo '" +
    uc.anoLetivo +
    "' ;" +
    "\n" +
    "\t" +
    ':designacao "' +
    uc.designacao +
    '" .' +
    "\n\n";
});

db["docente"].forEach((docente) => {
  toWrite =
    toWrite +
    "\n### http://www.semanticweb.org/comta/ontologies/tpc1#" +
    docente.sigla +
    "\n" +
    ":" +
    docente.sigla +
    " " +
    "rdf:type owl:NamedIndividual" +
    " ," +
    "\n" +
    "\t\t\t " +
    ":Professor ;" +
    "\n" +
    "\t" +
    ":ensina ";
  docente.uc.forEach((ola) => {
    toWrite = toWrite + ":" + ola + " ,\n\t\t\t";
  });
  toWrite = toWrite.slice(0, -5);
  toWrite =
    toWrite + ";" + "\n" + "\t" + ':nome "' + docente.nome + '" .' + "\n\n";
});

db["aluno"].forEach((aluno) => {
  toWrite =
    toWrite +
    "\n### http://www.semanticweb.org/comta/ontologies/tpc1#" +
    aluno.id +
    "\n" +
    ":" +
    aluno.id +
    " " +
    "rdf:type owl:NamedIndividual" +
    " ," +
    "\n" +
    "\t\t\t " +
    ":Aluno ;" +
    "\n" +
    "\t" +
    ":frequenta ";
  aluno.UC.forEach((ola) => {
    toWrite = toWrite + ":" + ola + " ,\n\t\t\t    ";
  });
  toWrite = toWrite.slice(0, -9);
  toWrite =
    toWrite + ";" + "\n" + "\t" + ':nome "' + aluno.nome + '" .' + "\n\n";
});

fs.appendFileSync("ontologia.ttl", toWrite, function (err) {
  if (err) console.log(err);
});
