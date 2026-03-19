import MatchPairQuizPage from './MatchPairQuizPage'

const studentPairs = [
  { id: 1, term: 'Student', description: 'En modellklasse for studentdata i UniSystem.' },
  { id: 2, term: 'StudentID', description: 'Feltet som lagrer den unike identiteten til studenten.' },
  { id: 3, term: 'Navn og Epost er string', description: 'Tekstverdier i C# lagres som string.' },
  { id: 4, term: 'Student(string id, string navn, string epost)', description: 'Oppretter og initialiserer et Student-objekt.' },
  { id: 5, term: 'UniSystem.aMain.Student', description: 'Det fullstendige typenavnet til Student-klassen.' },
  { id: 6, term: 'List<Student> Studenter', description: 'Viser at Kurs lagrer studentobjekter i en liste.' },
  { id: 7, term: 'BrukerID kan være StudentID', description: 'Viser koblingen mellom Student og Lån.' },
  { id: 8, term: 'Lik struktur som Ansatt', description: 'Begge klassene har samme grunnmønster med ID, navn og e-post.' },
]

function MatchPairUniStudent() {
  return (
    <MatchPairQuizPage
      title="UniSystem Student - Match Pairs"
      pairs={studentPairs}
      storageId="matchpairunistudent"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniStudent