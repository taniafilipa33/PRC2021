import requests as reqs
import urllib.parse

prefixes = '''PREFIX rdf: <http://www.w3.org/1999/02/22-rdf-syntax-ns#>
        PREFIX owl: <http://www.w3.org/2002/07/owl#>
        PREFIX rdfs: <http://www.w3.org/2000/01/rdf-schema#>
        PREFIX noInferences: <http://www.ontotext.com/explicit>
        PREFIX skos: <http://www.w3.org/2004/02/skos/core#>
        PREFIX : <http://www.semanticweb.org/comta/ontologies/tpc7#>
    '''

def createligacao():
    querylink = "http://localhost:7200/repositories/tpc7?query="
    updater = "http://localhost:7200/repositories/tpc7/statements?update="

    queryaula= '''CONSTRUCT {    ?c1 :temLigação ?c2. } WHERE {    ?l :temOrigem ?c1.    ?l :temDestino ?c2.}'''

    encoded = urllib.parse.quote(prefixes + queryaula)

    output = reqs.get(querylink + encoded)
    output.raise_for_status()
    #print(output.text)

    for l in output.text.split('.\n'):
        #print(l+"\n")
        attr = l.split()
        if len(attr) == 3: #rip estava a dar out of range  
            #for ff in attr:      
                #print(ff+"\n") #cidade -> ligacao -> cidade
                city1 = attr[0].split('#')[1][:-1]
                #print(city1)
                city2 = attr[2].split('#')[1][:-1]
                #print(city2)
                add = "INSERT DATA { :" + city1 + " :temLigação :" + city2 + " . }"
                #print(add)
                encoded2 = urllib.parse.quote(prefixes + add)
                poster = reqs.post(updater + encoded2)
                print(poster)
                # I hate python this takes 5 years to run WHY
                poster.raise_for_status()
def main():
    
    createligacao()


if __name__ == "__main__":
    main()    