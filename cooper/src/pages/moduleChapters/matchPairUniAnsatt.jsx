import MatchPairQuizPage from './MatchPairQuizPage'

const ansattPairs = [
  { id: 1, term: 'class Ansatt', description: 'En mal for objekter som representerer ansatte.' },
  { id: 2, term: 'public', description: 'Gjør klassen eller feltet tilgjengelig fra andre deler av programmet.' },
  { id: 3, term: 'string', description: 'Datatype som brukes for tekst som ID, navn og e-post.' },
  { id: 4, term: 'Epost', description: 'Feltet som lagrer e-postadressen til den ansatte.' },
  { id: 5, term: 'Ansatt(string id, string navn, string epost)', description: 'Konstruktøren som oppretter objektet og fyller feltene.' },
  { id: 6, term: 'AnsattID = id', description: 'Kopierer parameterverdien inn i objektets felt.' },
  { id: 7, term: 'namespace UniSystem.aMain', description: 'Navneplass som grupperer modellklassene i prosjektet.' },
  { id: 8, term: 'BrukerID kan være AnsattID', description: 'Viser hvordan Ansatt henger sammen med Lån-klassen.' },
]

function MatchPairUniAnsatt() {
  return (
    <MatchPairQuizPage
      title="UniSystem Ansatt - Match Pairs"
      pairs={ansattPairs}
      storageId="matchpairuniansatt"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniAnsatt