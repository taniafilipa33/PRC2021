const fs = require("fs");

fs.readFile("lista.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var writer = "";
  let link = "";
  let st = "";
  let ha = "###  ";
  var lines = data.split("\r\n");
  console.log(lines);
  let i = 1;
  lines.forEach((line) => {
    var topicos = line.split(",");
    if (i < 10) {
      link = "www.semanticweb.org/comta/ontologies/aferição#Receitas0" + i;
    } else {
      link = "www.semanticweb.org/comta/ontologies/aferição#Receitas" + i;
    }
    st =
      "<" +
      link +
      "> rdf:type owl:NamedIndividual ,\n " +
      "<http://www.semanticweb.org/comta/ontologies/aferição#Condominio> ,\n" +
      "<http://www.semanticweb.org/comta/ontologies/aferição#LivroReceitasDespesas> ;\n" +
      '<http://www.semanticweb.org/comta/ontologies/aferição#data> "' +
      topicos[2] +
      '" ;' +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#description> '" +
      topicos[5] +
      "' ;" +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#entidade> '" +
      topicos[4] +
      "' ;" +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#número> '" +
      topicos[0] +
      "' ;" +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#tipo> '" +
      topicos[1] +
      "' ;" +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#valor> " +
      topicos[3] +
      " .\n\n";
    link = ha + link;
    writer = writer + link + "\n" + st;
    st = "";
    link = "";
    i = i + 1;
  });
  console.log("\n\n\n\n\n" + writer); // para ser usado na onlogia
});

fs.readFile("mapa.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var writer = "";
  let link = "";
  let st = "";
  let ha = "###  ";
  var lines = data.split("\r\n");
  console.log(lines);
  let i = 1;
  var a = [
    "Jan",
    "Fev",
    "Mar",
    "Abr",
    "Mai",
    "Jun",
    "Jul",
    "Ago",
    "Set",
    "Out",
    "Nov",
    "Dez",
  ];
  lines.forEach((line) => {
    var topicos = line.split(",");
    let mes = -1;
    let meses = "";
    topicos.forEach((t) => {
      if (t == 1) meses = meses + ",\n'" + a[mes] + "'";
      mes = mes + 1;
    });

    if (i < 10) {
      link = "www.semanticweb.org/comta/ontologies/aferição#Mapa0" + i;
    } else {
      link = "www.semanticweb.org/comta/ontologies/aferição#Mapa" + i;
    }
    st =
      "<" +
      link +
      "> rdf:type owl:NamedIndividual ,\n " +
      "<http://www.semanticweb.org/comta/ontologies/aferição#Condominio> ,\n" +
      "<http://www.semanticweb.org/comta/ontologies/aferição#MapaPagamento> ;\n" +
      '<http://www.semanticweb.org/comta/ontologies/aferição#fração> "' +
      topicos[0] +
      '" ;' +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#mes> " +
      meses +
      " \n.\n\n";
    link = ha + link;
    writer = writer + link + "\n" + st;
    st = "";
    link = "";
    i = i + 1;
  });
  console.log("\n\n\n\n\n" + writer); // para ser usado na onlogia
});

fs.readFile("fracoes.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  var writer = "";
  let link = "";
  let st = "";
  let ha = "###  ";
  var lines = data.split("\r\n");
  console.log(lines);
  let i = 1;

  lines.forEach((line) => {
    var topicos = line.split(",");
    if (i < 10) {
      link = "http://www.semanticweb.org/comta/ontologies/aferição#Fração0" + i;
    } else {
      link = "http://www.semanticweb.org/comta/ontologies/aferição#Fração" + i;
    }
    st =
      "<" +
      link +
      "> rdf:type owl:NamedIndividual ,\n " +
      "<http://www.semanticweb.org/comta/ontologies/aferição#Condominio> ,\n" +
      "<http://www.semanticweb.org/comta/ontologies/aferição#Fração> ;\n" +
      '<http://www.semanticweb.org/comta/ontologies/aferição#descrição> "' +
      topicos[0] +
      '" ;' +
      "\n<http://www.semanticweb.org/comta/ontologies/aferição#mensalidade> " +
      topicos[3] +
      " ;" +
      '\n<http://www.semanticweb.org/comta/ontologies/aferição#numFração> "' +
      topicos[1] +
      '" ;' +
      '\n<http://www.semanticweb.org/comta/ontologies/aferição#permilagem> "' +
      topicos[2] +
      '"\n.\n\n';
    link = ha + link;
    writer = writer + link + "\n" + st;
    st = "";
    link = "";
    i = i + 1;
  });
  console.log("\n\n\n\n\n" + writer); // para ser usado na onlogia
});
