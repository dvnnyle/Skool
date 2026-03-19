import MatchPairQuizPage from './MatchPairQuizPage'

const lanPairs = [
  { id: 1, term: 'class Lån', description: 'En registrering av utlån i UniSystem.' },
  { id: 2, term: 'BokID', description: 'Identifiserer boka som er lånt ut.' },
  { id: 3, term: 'BrukerType', description: 'Forteller om låneren er Student eller Ansatt.' },
  { id: 4, term: 'Alle felt er string', description: 'ID-er, navn og type lagres som tekst.' },
  { id: 5, term: 'Lån(string bokID, string brukerID, string brukerNavn, string brukerType)', description: 'Konstruktøren til Lån-klassen.' },
  { id: 6, term: 'Kopierer parameterverdier inn i feltene', description: 'Det konstruktøren faktisk gjør i objektet.' },
  { id: 7, term: 'UniSystem.aMain.Lån', description: 'Fullt navn med namespace for Lån-klassen.' },
  { id: 8, term: 'Bindeledd mellom bok og låner', description: 'Lån kobler BokID med StudentID eller AnsattID.' },
]

function MatchPairUniLan() {
  return (
    <MatchPairQuizPage
      title="UniSystem Lån - Match Pairs"
      pairs={lanPairs}
      storageId="matchpairunilan"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniLan