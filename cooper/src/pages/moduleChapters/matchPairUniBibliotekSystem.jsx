import MatchPairQuizPage from './MatchPairQuizPage'

const bibliotekPairs = [
  { id: 1, term: 'BibliotekSystem', description: 'Styrer boker og utlån i bibliotekdelen av programmet.' },
  { id: 2, term: 'List<Bok> BokListe', description: 'En liste som kan lagre mange Bok-objekter.' },
  { id: 3, term: 'RegistrerBok(Bok bok)', description: 'Legger bok-objektet inn i BokListe.' },
  { id: 4, term: 'if (BokListe.Count == 0)', description: 'Sjekker om listen over registrerte boker er tom.' },
  { id: 5, term: 'foreach (Bok bok in BokListe)', description: 'Går gjennom alle boker i listen, en om gangen.' },
  { id: 6, term: 'LånListe.Add(nyttLån)', description: 'Lagrer det nye lånet i systemets utlånsliste.' },
  { id: 7, term: 'Lån? funnetLån = null', description: 'Variabelen kan være tom helt til riktig lån er funnet.' },
  { id: 8, term: 'break', description: 'Stopper løkken med en gang riktig lån er funnet.' },
]

function MatchPairUniBibliotekSystem() {
  return (
    <MatchPairQuizPage
      title="UniSystem BibliotekSystem - Match Pairs"
      pairs={bibliotekPairs}
      storageId="matchpairunibiblioteksystem"
      promptTerm="syntax"
      promptDescription="description"
    />
  )
}

export default MatchPairUniBibliotekSystem