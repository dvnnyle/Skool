import MatchPairQuizPage from './MatchPairQuizPage'

const kursPairs = [
  { id: 1, term: 'Kurs', description: 'Et kurs med kapasitet, studiepoeng og studentliste.' },
  { id: 2, term: 'int', description: 'Datatype for heltall som studiepoeng og plasser.' },
  { id: 3, term: 'List<Student> Studenter', description: 'Lagrer studentobjektene som er påmeldt kurset.' },
  { id: 4, term: 'MaksPlasser vs LedigePlasser', description: 'Total kapasitet sammenlignet med hvor mange plasser som er igjen.' },
  { id: 5, term: 'Kurs(string kode, string navn, int studiepoeng, int maksPlasser)', description: 'Oppretter kurs og setter startverdier.' },
  { id: 6, term: 'LedigePlasser = MaksPlasser', description: 'Alle plasser er ledige når kurset opprettes.' },
  { id: 7, term: 'namespace UniSystem.aMain', description: 'Samler Kurs med de andre modellklassene.' },
  { id: 8, term: 'Direkte Student-relasjon', description: 'Kurs viser koblingen til Student gjennom en liste.' },
]

function MatchPairUniKurs() {
  return (
    <MatchPairQuizPage
      title="UniSystem Kurs - Match Pairs"
      pairs={kursPairs}
      storageId="matchpairunikurs"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniKurs