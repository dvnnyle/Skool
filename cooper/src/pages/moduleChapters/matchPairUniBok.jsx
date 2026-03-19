import MatchPairQuizPage from './MatchPairQuizPage'

const bokPairs = [
  { id: 1, term: 'Bok', description: 'En datastruktur som lagrer bokinformasjon og antall eksemplarer.' },
  { id: 2, term: 'string og int', description: 'Datatypene som brukes i Bok-klassen.' },
  { id: 3, term: 'AntallEksemplarer vs TilgjengeligeEksemplarer', description: 'Total beholdning sammenlignet med hvor mange som er ledige nå.' },
  { id: 4, term: 'TilgjengeligeEksemplarer = antallEksemplarer', description: 'Alle registrerte eksemplarer er ledige når boka opprettes.' },
  { id: 5, term: 'namespace UniSystem.aMain', description: 'Plasserer Bok sammen med de andre modellklassene.' },
  { id: 6, term: 'Lån bruker BokID', description: 'Viser koblingen mellom Bok og Lån.' },
  { id: 7, term: 'new Bok("B1", "C#", "X", 2024, 3)', description: 'Gir 3 som startverdi for TilgjengeligeEksemplarer.' },
  { id: 8, term: 'Enkel modellklasse', description: 'Klassen lagrer mest data og lite egen logikk.' },
]

function MatchPairUniBok() {
  return (
    <MatchPairQuizPage
      title="UniSystem Bok - Match Pairs"
      pairs={bokPairs}
      storageId="matchpairunibok"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniBok