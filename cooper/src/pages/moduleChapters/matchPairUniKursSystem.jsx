import MatchPairQuizPage from './MatchPairQuizPage'

const kursSystemPairs = [
  { id: 1, term: 'KursSystem', description: 'Holder styr på kurs og påmeldte studenter.' },
  { id: 2, term: 'List<Kurs> KursListe', description: 'En liste som lagrer mange Kurs-objekter.' },
  { id: 3, term: 'OpprettKurs(Kurs kurs)', description: 'Legger et kurs inn i KursListe.' },
  { id: 4, term: 'if (kurs.Studenter.Count < kurs.MaksPlasser)', description: 'Sjekker om kurset fortsatt har ledige plasser.' },
  { id: 5, term: 'foreach (Kurs kurs in KursListe)', description: 'Går gjennom kursene ett om gangen.' },
  { id: 6, term: 'Find(s => s.StudentID == studentID)', description: 'Finner studenten med riktig StudentID i listen.' },
  { id: 7, term: 'Remove(funnet)', description: 'Fjerner studenten fra kurslisten når den er funnet.' },
  { id: 8, term: 'public void', description: 'Metoden kan brukes utenfra og returnerer ingen verdi.' },
]

function MatchPairUniKursSystem() {
  return (
    <MatchPairQuizPage
      title="UniSystem KursSystem - Match Pairs"
      pairs={kursSystemPairs}
      storageId="matchpairunikurssystem"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniKursSystem