import { motion } from 'framer-motion'
import NavigationMenu from './widget/navigationMenu'
import Footer from './widget/footer'
import './UniSystemCode.css'
import hljs from 'highlight.js/lib/core'
import csharp from 'highlight.js/lib/languages/csharp'
import 'highlight.js/styles/vs2015.min.css'

hljs.registerLanguage('csharp', csharp)

// ─── File contents ──────────────────────────────────────────────────────────

const FILES = [
  {
    id: 'program',
    path: 'Program.cs',
    group: 'entry',
    description:
      'Inngangspunktet for hele programmet. Inneholder hoved-menyen i en while-løkke og leser all brukerinput. Oppretter instanser av KursSystem og BibliotekSystem og delegerer arbeid til dem.',
    code:
`#nullable disable
using System;
using System.Data.Common;
using UniSystem.aMain;
using UniSystem.aSystemer;

class Program
{
    static void Main()
    {
        // ANSI color codes
        const string RESET  = "\\u001b[0m";  // nullstill alle farger
        const string YELLOW = "\\u001b[33m";  // meny-overskrifter
        const string CYAN   = "\\u001b[36m";  // tittel og telleverdier
        const string GREEN  = "\\u001b[32m";  // suksessmeldinger
        const string RED    = "\\u001b[31m";  // feilmeldinger

        KursSystem kursSystem = new KursSystem();                 // én instans deles gjennom hele programmet
        BibliotekSystem bibliotekSystem = new BibliotekSystem();   // samme prinsipp

        Console.WriteLine($"{CYAN}=== Kurssystem ==={RESET}");

        bool running = true;  // settes til false ved valg "0" for å avslutte
        while (running)
        {
            Console.WriteLine($"\\n{YELLOW}--- Meny ---{RESET}");
            Console.WriteLine("[1] Opprett kurs");
            Console.WriteLine("[2] Vis alle kurs");
            Console.WriteLine("[3] Melde på/av student til kurs");
            Console.WriteLine("[4] Registrer bok");
            Console.WriteLine("[5] Lån ut bok / liste over bøker");
            Console.WriteLine("[6] Lever inn bok");
            Console.WriteLine("[0] Avslutt");
            Console.Write("\\nVelg et alternativ: ");

            string valg = Console.ReadLine();  // input leses alltid som string

            // ── Valg 1: Opprett nytt kurs ───────────────────────────────────
            // Leser inn fire felter fra brukeren, bygger et Kurs-objekt,
            // og delegerer lagring til kursSystem.OpprettKurs().
            if (valg == "1")
            {
                Console.WriteLine($"\\n{YELLOW}--- Opprett nytt kurs ---{RESET}");

                Console.Write("Skriv inn kurskode: ");
                string kurskode = Console.ReadLine();

                Console.Write("Skriv inn kursnavn: ");
                string kursnavn = Console.ReadLine();

                Console.Write("Skriv inn antall studiepoeng: ");
                int studiepoeng = int.Parse(Console.ReadLine());  // krasjer ved ugyldig input – bruk TryParse i prod

                Console.Write("Skriv inn maks antall plasser: ");
                int maksPlasser = int.Parse(Console.ReadLine());  // samme risiko her

                Kurs nyttKurs = new Kurs(kurskode, kursnavn, studiepoeng, maksPlasser);  // bygger objekt med inndata
                kursSystem.OpprettKurs(nyttKurs);  // delegerer til systemklassen – Program.cs lagrer ingenting selv

                Console.WriteLine($"\\n{GREEN}Kurset ble opprettet!{RESET}");
            }
            else if (valg == "0")
            {
                running = false;  // bryter ut av while-løkken
                Console.WriteLine("\\nTakk for nå!");
            }
            else if (valg == "2")
            {
                kursSystem.VisAlleKurs();  // delegerer visning – ikke noe output-kode her
            }
            else if (valg == "3")
            {
                Console.WriteLine($"{YELLOW}---Kurspåmelding---{RESET}");
                Console.WriteLine("[1] Melde på kurs");
                Console.WriteLine("[2] Melda av kurs");
                string valg2 = Console.ReadLine();

                if (valg2 == "1")
                {
                    Console.Write("Student ID: ");
                    string id = Console.ReadLine();

                    Console.Write("Navn: ");
                    string navn = Console.ReadLine();

                    Console.Write("E-post: ");
                    string epost = Console.ReadLine();

                    Student student = new Student(id, navn, epost);  // bygger Student-objekt av inndata

                    Console.Write("Kurskode: ");
                    string kode = Console.ReadLine();

                    kursSystem.MeldStudentPåKurs(student, kode);  // sender ferdig objekt + kurskode til systemet
                }
                else if (valg2 == "2")
                {
                    Console.WriteLine("Student ID: ");
                    string studentID = Console.ReadLine();

                    Console.WriteLine("Kurskode: ");
                    string kode = Console.ReadLine();

                    kursSystem.MeldStudentAvKurs(studentID, kode);
                }
            }
            else if (valg == "4")
            {
                Console.WriteLine($"\\n{YELLOW}--- Registrer bok ---{RESET}");

                Console.Write("Bok ID: ");
                string id = Console.ReadLine();

                Console.Write("Tittel: ");
                string tittel = Console.ReadLine();

                Console.Write("Forfatter: ");
                string forfatter = Console.ReadLine();

                Console.Write("År: ");
                int år = int.Parse(Console.ReadLine());

                Console.Write("Antall eksemplarer: ");
                int antall = int.Parse(Console.ReadLine());

                Bok nyBok = new Bok(id, tittel, forfatter, år, antall);
                bibliotekSystem.RegistrerBok(nyBok);

                Console.WriteLine($"\\n{GREEN}Boken ble registrert!{RESET}");
            }
            else if (valg == "5")
            {
                Console.WriteLine($"\\n{YELLOW}--- Lån ut bok ---{RESET}");
                bibliotekSystem.VisAlleBøker();

                Console.Write("\\nBok ID: ");
                string bokID = Console.ReadLine();

                Console.WriteLine("\\n[1] Student");
                Console.WriteLine("[2] Ansatt");
                Console.Write("Velg brukertype: ");
                string brukerType = Console.ReadLine();

                // Deklarert UTENFOR if/else-blokkene slik at variablene er
                // tilgjengelige i scope der LånUtBok() kalles nedenfor.
                string brukerID;
                string brukerNavn;
                string type;

                if (brukerType == "1")
                {
                    Console.Write("Student ID: ");
                    brukerID = Console.ReadLine();
                    Console.Write("Navn: ");
                    brukerNavn = Console.ReadLine();
                    type = "Student";
                }
                else if (brukerType == "2")
                {
                    Console.Write("Ansatt ID: ");
                    brukerID = Console.ReadLine();
                    Console.Write("Navn: ");
                    brukerNavn = Console.ReadLine();
                    type = "Ansatt";
                }
                else
                {
                    Console.WriteLine($"{RED}Ugyldig brukertype{RESET}");
                    continue;  // hopper tilbake til while-toppen – hindrer at
                               // uinitialiserte variabler sendes til LånUtBok()
                }

                bibliotekSystem.LånUtBok(bokID, brukerID, brukerNavn, type);  // alle variabler garantert satt her
            }
            else if (valg == "6")
            {
                Console.WriteLine($"\\n{YELLOW}--- Lever inn bok ---{RESET}");

                Console.Write("Bok ID: ");
                string bokID = Console.ReadLine();

                Console.Write("Bruker ID (Student eller Ansatt): ");
                string brukerID = Console.ReadLine();

                bibliotekSystem.LeverInnBok(bokID, brukerID);  // fjerner lån og øker tilgjengelig-teller
            }
            else
            {
                Console.WriteLine($"\\n{RED}Ugyldig valg. Prøv igjen.{RESET}");  // ukjent input – løkken fortsetter
            }
        }
    }
}`,
    keyPoints: [
      '<strong>#nullable disable</strong> – skrur av nullable reference type-analyse for denne filen',
      '<strong>KursSystem</strong> og <strong>BibliotekSystem</strong> opprettes én gang og deles gjennom hele programmet',
      '<strong>while (running)</strong> – hoved-løkken; settes til false ved valg "0" for å avslutte rent',
      '<strong>int.Parse(Console.ReadLine())</strong> – krasjer med FormatException ved ugyldig input; bruk TryParse for robusthet',
      '<strong>continue</strong> i brukertype-else – nødvendig for å unngå at uinitialiserte variabler sendes til LånUtBok()',
      'ANSI-fargekoder er lokale const string ‑ verdier som gir farget output i terminalen',
    ],
  },
  {
    id: 'student',
    path: 'aMain/Student.cs',
    group: 'aMain',
    description:
      'Enkel dataklasse som representerer en student. Ingen logikk – kun felt og konstruktør.',
    code:
`namespace UniSystem.aMain
{
    public class Student
    {
        public string StudentID;  // unik identifikator, f.eks. "s123"
        public string Navn;       // fullt navn
        public string Epost;      // kontaktepost

        // konstruktøren heter det samme som klassen og returnerer ingen verdi
        public Student(string id, string navn, string epost)
        {
            StudentID = id;    // kopler innparameter til felt
            Navn     = navn;
            Epost    = epost;
        }
    }
}`,
    keyPoints: [
      'Klassens felt er <strong>public</strong> – i produksjonskode ville man brukt properties med get/set',
      'Konstruktøren heter det samme som klassen og returnerer ingen verdi',
      '<strong>namespace UniSystem.aMain</strong> – krever <code>using UniSystem.aMain</code> i andre filer',
    ],
  },
  {
    id: 'ansatt',
    path: 'aMain/Ansatt.cs',
    group: 'aMain',
    description:
      'Dataklasse for ansatte. Identisk struktur som Student, men bruker AnsattID i stedet for StudentID.',
    code:
`namespace UniSystem.aMain
{
    public class Ansatt
    {
        public string AnsattID;  // unik identifikator, f.eks. "a456"
        public string Navn;      // fullt navn
        public string Epost;     // kontaktepost

        // identisk mønster som Student – begge kunne arvet fra en Bruker-klasse
        public Ansatt(string id, string navn, string epost)
        {
            AnsattID = id;    // merk: feltnavn er AnsattID, ikke StudentID
            Navn     = navn;
            Epost    = epost;
        }
    }
}`,
    keyPoints: [
      'Nesten identisk med Student – i et refaktorert design ville begge arvet fra en felles <strong>Bruker</strong>-klasse',
      'Brukes som bokutlåner: BrukerType settes til <strong>"Ansatt"</strong> i Lån-objektet',
    ],
  },
  {
    id: 'kurs',
    path: 'aMain/Kurs.cs',
    group: 'aMain',
    description:
      'Dataklasse for et kurs. Holder kursinformasjon og en liste over påmeldte studenter, samt sporing av ledige plasser.',
    code:
`using System.Collections.Generic;

namespace UniSystem.aMain
{
    public class Kurs
    {
        // ── Identifikasjonsfelter ──────────────────────────────────────────
        public string Kode;        // unik kurskode, f.eks. "IS110"
        public string Navn;        // lesbar tittel, f.eks. "Programmering 1"
        public int    Studiepoeng; // akademisk vekt (ECTS)

        // ── Kapasitetsstyring ─────────────────────────────────────────────
        public int    MaksPlasser;   // fast totalkapasitet, endres aldri
        public int    LedigePlasser;  // telles ned/opp av KursSystem

        // initialiseres inline – ikke nødvendig å gjøre det i konstruktøren
        public List<Student> Studenter = new List<Student>();

        public Kurs(string kode, string navn, int studiepoeng, int maksPlasser)
        {
            Kode          = kode;
            Navn          = navn;
            Studiepoeng   = studiepoeng;
            MaksPlasser   = maksPlasser;
            LedigePlasser = maksPlasser; // start: alle plasser er ledige
        }
    }
}`,
    keyPoints: [
      '<strong>LedigePlasser = maksPlasser</strong> ved konstruksjon – telles ned/opp av KursSystem, aldri av Kurs selv',
      '<strong>List&lt;Student&gt; Studenter</strong> initialiseres inline – behøver ikke gjøres i konstruktøren',
      '<strong>MaksPlasser</strong> er konstant etter opprettelse; <strong>LedigePlasser</strong> er den dynamiske variabelen',
    ],
  },
  {
    id: 'bok',
    path: 'aMain/Bok.cs',
    group: 'aMain',
    description:
      'Dataklasse for en bok i biblioteket. Sporer totalt antall eksemplarer og hvor mange som er tilgjengelige.',
    code:
`namespace UniSystem.aMain
{
    public class Bok
    {
        // ── Identifikasjonsfelter ──────────────────────────────────────────
        public string ID;        // kort unik nøkkel, f.eks. "BOK001"
        public string Tittel;
        public string Forfatter;
        public int    År;        // utgivelsesår

        // ── Eksemplarstyring ──────────────────────────────────────────────
        public int    AntallEksemplarer;         // fast totalantall, endres aldri
        public int    TilgjengeligeEksemplarer;  // dynamisk: reduseres/økes av BibliotekSystem

        public Bok(string id, string tittel, string forfatter, int år, int antallEksemplarer)
        {
            ID                       = id;
            Tittel                   = tittel;
            Forfatter                = forfatter;
            År                       = år;
            AntallEksemplarer        = antallEksemplarer;  // lagrer totalantall
            TilgjengeligeEksemplarer = antallEksemplarer;  // start: alle er tilgjengelige
        }
    }
}`,
    keyPoints: [
      '<strong>AntallEksemplarer</strong> – fast totalantall, endres aldri',
      '<strong>TilgjengeligeEksemplarer</strong> – starter lik totalt; reduseres ved utlån, økes ved innlevering',
      'Vises til bruker som <em>Tilgjengelig: 2/5</em>',
    ],
  },
  {
    id: 'lan',
    path: 'aMain/Lån.cs',
    group: 'aMain',
    description:
      'Record-lignende dataklasse som representerer ett aktivt bokutlån. Lagrer ID-referanser i stedet for objektreferanser, noe som holder klassen løskoblet.',
    code:
`namespace UniSystem.aMain
{
    public class Lån
    {
        public string BokID;       // referanse til Bok.ID (ikke objectreferanse)
        public string BrukerID;    // StudentID eller AnsattID
        public string BrukerNavn;  // lagres for visning uten ekstra oppslag
        public string BrukerType;  // "Student" eller "Ansatt"

        // enkel dataholder – ingen logikk, bare lagring av utlånsinformasjon
        public Lån(string bokID, string brukerID, string brukerNavn, string brukerType)
        {
            BokID      = bokID;
            BrukerID   = brukerID;   // brukes som søkenøkkel ved innlevering
            BrukerNavn = brukerNavn;
            BrukerType = brukerType;
        }
    }
}`,
    keyPoints: [
      'Holder <strong>streng-IDer</strong> i stedet for objektreferanser – enklere og løst koblet',
      'BibliotekSystem.LånListe vokser ved utlån og krymper ved innlevering',
      'Søk gjøres med <strong>BokID && BrukerID</strong> – begge må stemme for å finne riktig lån',
    ],
  },
  {
    id: 'kurssystem',
    path: 'aSystemer/KursSystem.cs',
    group: 'aSystemer',
    description:
      'Forretningslogikk for kurssystemet. Holder en liste over kurs og eksponerer metoder for å opprette kurs, vise dem, og melde studenter på/av.',
    code:
`using System;
using System.Collections.Generic;
using UniSystem.aMain;

namespace UniSystem.aSystemer
{
    public class KursSystem
    {
        private const string RESET = "\\u001b[0m";
        private const string GREEN = "\\u001b[32m";
        private const string RED   = "\\u001b[31m";
        private const string CYAN  = "\\u001b[36m";

        public List<Kurs> KursListe = new List<Kurs>();  // deles mellom alle metodene i klassen

        // ───────────────────────────────────────────────────────────
        // OpprettKurs – legger et ferdig Kurs-objekt til listen.
        // Kurs-objektet er allerede bygd i Program.cs og sendes inn.
        // ───────────────────────────────────────────────────────────
        public void OpprettKurs(Kurs kurs)
        {
            KursListe.Add(kurs);  // legger kurs-objektet inn i listen
        }

        // ───────────────────────────────────────────────────────────
        // VisAlleKurs – skriver ut alle kurs med påmeldte studenter.
        // Bruker nestet foreach: ytre løper over kurs, indre over
        // studentlisten til hvert kurs.
        // ───────────────────────────────────────────────────────────
        public void VisAlleKurs()
        {
            if (KursListe.Count == 0)
            {
                Console.WriteLine("\\nIngen kurs registrert");
                return;  // tidlig exit – ingen grunn til å kjøre foreach på en tom liste
            }

            foreach (Kurs kurs in KursListe)  // itererer over alle registrerte kurs
            {
                Console.WriteLine($"\\nKode: {kurs.Kode}");
                Console.WriteLine($"Navn: {kurs.Navn}");
                Console.WriteLine($"Studiepoeng: {kurs.Studiepoeng}");
                Console.WriteLine($"Plasser: {kurs.LedigePlasser}/{kurs.MaksPlasser} ledige");

                Console.WriteLine("Studenter på kurset:");
                if (kurs.Studenter.Count == 0)  // ingen påmeldte ennå
                {
                    Console.WriteLine("  ingen studenter påmeldt");
                }
                else  // nestet foreach: én linje per student
                {
                    foreach (Student s in kurs.Studenter)
                    {
                        Console.WriteLine($"  {s.Navn} ({s.StudentID}) - {s.Epost}");
                    }
                }
                Console.WriteLine("---------------------------");
            }
        }

        // ───────────────────────────────────────────────────────────
        // MeldStudentPåKurs – søker gjennom KursListe etter kursKode.
        // Sjekker kapasitet, legger til student og reduserer teller.
        // return inni foreach = early exit etter første treff.
        // ───────────────────────────────────────────────────────────
        public void MeldStudentPåKurs(Student student, string kursKode)
        {
            foreach (Kurs kurs in KursListe)  // søk lineært etter kurskode
            {
                if (kurs.Kode == kursKode)  // treff: riktig kurs funnet
                {
                    if (kurs.Studenter.Count < kurs.MaksPlasser)  // sjekk kapasitet før påmelding
                    {
                        kurs.Studenter.Add(student);  // legg studenten til kursets liste
                        kurs.LedigePlasser--;          // reduser teller
                        Console.WriteLine($"\\n{GREEN}{student.Navn} ble meldt på '{kurs.Navn}' ({kurs.Kode}){RESET}");
                        Console.WriteLine($"{CYAN}Antall studenter: {kurs.Studenter.Count}/{kurs.MaksPlasser}{RESET}");
                    }
                    else
                    {
                        Console.WriteLine($"\\n{RED}kurs Fullt{RESET}");  // ingen ledige plasser
                    }
                    return; // early exit – ingen grunn til å søke videre
                }
            }
            Console.WriteLine($"\\n{RED}kurs med kode '{kursKode}' ikke funnet{RESET}");
        }

        // ───────────────────────────────────────────────────────────
        // MeldStudentAvKurs – finner kurs, bruker List.Find() med
        // lambda for å lokalisere studenten, fjerner og øker teller.
        // Find() returnerer null hvis ingen matcher – sjekk alltid.
        // ───────────────────────────────────────────────────────────
        public void MeldStudentAvKurs(string studentID, string kursKode)
        {
            foreach (Kurs kurs in KursListe)  // søk etter kurs med matching kode
            {
                if (kurs.Kode == kursKode)  // treff: kurs funnet
                {
                    // Find() returnerer null hvis ingen matcher – alltid sjekk etterpå
                    Student funnet = kurs.Studenter.Find(s => s.StudentID == studentID);

                    if (funnet != null)  // student eksisterer i kurset
                    {
                        kurs.Studenter.Remove(funnet);  // fjern fra listen
                        kurs.LedigePlasser++;            // øk teller igjen
                        Console.WriteLine($"{GREEN}studenten er fjernet fra kurset{RESET}");
                    }
                    else
                    {
                        Console.WriteLine($"{RED}student finnes ikke i kurset{RESET}");
                    }
                    return;
                }
            }
            Console.WriteLine($"{RED}ukjent, fant ikke kurs{RESET}");
        }
    }
}`,
    keyPoints: [
      '<strong>return</strong> inne i foreach stopper søket umiddelbart etter første treff – effektivt early exit',
      '<strong>List&lt;T&gt;.Find(lambda)</strong> – returnerer null hvis ingen student matcher; sjekk alltid null etterpå',
      '<strong>kurs.Studenter.Count < kurs.MaksPlasser</strong> – korrekt sjekk for kapasitet (ikke LedigePlasser)',
      'ANSI-koder er private const – ikke eksponert utenfor klassen',
      'KursSystem leser aldri fra Console – all input kommer ferdig fra Program.cs (<em>separation of concerns</em>)',
    ],
  },
  {
    id: 'biblioteksystem',
    path: 'aSystemer/BibliotekSystem.cs',
    group: 'aSystemer',
    description:
      'Forretningslogikk for biblioteksystemet. Holder BokListe og LånListe, og eksponerer metoder for å registrere bøker, vise oversikt, låne ut og levere inn.',
    code:
`using System;
using System.Collections.Generic;
using UniSystem.aMain;

namespace UniSystem.aSystemer
{
    public class BibliotekSystem
    {
        private const string RESET = "\\u001b[0m";
        private const string GREEN = "\\u001b[32m";
        private const string RED   = "\\u001b[31m";
        private const string CYAN  = "\\u001b[36m";

        public List<Bok> BokListe  = new List<Bok>();  // permanent katalog over alle bøker
        public List<Lån> LånListe  = new List<Lån>();  // dynamisk register over aktive utlån

        // ───────────────────────────────────────────────────────────
        // RegistrerBok – legger et ferdig Bok-objekt til BokListe.
        // ───────────────────────────────────────────────────────────
        public void RegistrerBok(Bok bok)
        {
            BokListe.Add(bok);
        }

        // ───────────────────────────────────────────────────────────
        // VisAlleBøker – skriver én linje per bok med ID, tittel,
        // forfatter, år og tilgjengelighetsbrøk (tilgjengelig/totalt).
        // ───────────────────────────────────────────────────────────
        public void VisAlleBøker()
        {
            if (BokListe.Count == 0)
            {
                Console.WriteLine("Ingen bøker registrert");
                return;
            }

            foreach (Bok bok in BokListe)
            {
                Console.WriteLine(
                    $"ID: {bok.ID} | Tittel: {bok.Tittel} | Forfatter: {bok.Forfatter} " +
                    $"| År: {bok.År} | Tilgjengelig: {bok.TilgjengeligeEksemplarer}/{bok.AntallEksemplarer}"
                );
            }
        }

        // ───────────────────────────────────────────────────────────
        // LånUtBok – søker BokListe etter bokID, sjekker at minst
        // én kopi er ledig, oppretter Lån-objekt, legger til LånListe
        // og dekrementerer TilgjengeligeEksemplarer.
        // ───────────────────────────────────────────────────────────
        public void LånUtBok(string bokID, string brukerID, string brukerNavn, string brukerType)
        {
            foreach (Bok bok in BokListe)
            {
                if (bok.ID == bokID)
                {
                    if (bok.TilgjengeligeEksemplarer > 0)  // minst én kopi er ledig
                    {
                        Lån nyttLån = new Lån(bokID, brukerID, brukerNavn, brukerType);  // opprett lån-record
                        LånListe.Add(nyttLån);           // registrer aktivt utlån
                        bok.TilgjengeligeEksemplarer--;   // én er nå utlånt
                        Console.WriteLine($"\\n{GREEN}Boken '{bok.Tittel}' ble lånt ut til {brukerNavn}{RESET}");
                        Console.WriteLine($"{CYAN}Tilgjengelige eksemplarer: {bok.TilgjengeligeEksemplarer}{RESET}");
                    }
                    else
                    {
                        Console.WriteLine($"\\n{RED}Ingen eksemplarer tilgjengelig!{RESET}");  // alle er utlånt
                    }
                    return;
                }
            }
            Console.WriteLine($"\\n{RED}Bok ikke funnet{RESET}");
        }

        // ───────────────────────────────────────────────────────────
        // LeverInnBok – søker først LånListe etter lån der BokID
        // OG BrukerID stemmer (begge må matche). Bruker break for
        // å stoppe loopen, ikke return – fordi vi trenger å fortsette
        // med en ny foreach mot BokListe etterpå for å øke telleren.
        // ───────────────────────────────────────────────────────────
        public void LeverInnBok(string bokID, string brukerID)
        {
            // Lån? – nullable-referanse (spørsmålstegn = kan være null).
            // Deklareres FØR foreach slik at den er tilgjengelig etter loopen.
            Lån? funnetLån = null;
            foreach (Lån lån in LånListe)  // søk etter eksakt match på begge IDer
            {
                if (lån.BokID == bokID && lån.BrukerID == brukerID)  // begge må stemme
                {
                    funnetLån = lån;
                    break;  // stopp loopen – vi trenger ikke sjekke flere lån
                }
            }

            if (funnetLån != null)  // lån finnes – OK å levere inn
            {
                LånListe.Remove(funnetLån);  // fjern fra aktivt utlånsregister

                foreach (Bok bok in BokListe)
                {
                    if (bok.ID == bokID)
                    {
                        bok.TilgjengeligeEksemplarer++;  // ett eksemplar er tilbake
                        Console.WriteLine($"\\n{GREEN}Boken '{bok.Tittel}' ble levert inn{RESET}");
                        Console.WriteLine($"{CYAN}Tilgjengelige eksemplarer: {bok.TilgjengeligeEksemplarer}{RESET}");
                        return;
                    }
                }
            }
            else
            {
                Console.WriteLine($"\\n{RED}Ingen aktiv utlån funnet for denne boken og brukeren{RESET}");
            }
        }
    }
}`,
    keyPoints: [
      '<strong>BokListe</strong> er en permanent katalog; <strong>LånListe</strong> er et dynamisk register over aktive utlån',
      '<strong>LånUtBok</strong>: oppretter Lån-objekt → legger til LånListe → reduserer TilgjengeligeEksemplarer',
      '<strong>LeverInnBok</strong>: finner lånet med <code>BokID && BrukerID</code> → fjerner fra LånListe → øker telleren',
      '<strong>Lån? funnetLån = null</strong> – nullable-referanse; filen har nullable aktivert',
      '<strong>break</strong> avslutter søke-foreach straks lånet er funnet – ikke return, fordi vi fortsetter med nest-foreach',
    ],
  },
]

// ─── Group metadata ──────────────────────────────────────────────────────────

const GROUPS = [
  { key: 'entry',     label: 'Entry Point',   color: 'lectures' },
  { key: 'aMain',     label: 'aMain – Models', color: '' },
  { key: 'aSystemer', label: 'aSystemer – Logic', color: 'lectures' },
]

// ─── Component ───────────────────────────────────────────────────────────────

function FileIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
    </svg>
  )
}

function CodeBlock({ path, code }) {
  const highlighted = hljs.highlight(code, { language: 'csharp' }).value
  return (
    <div className="file-code-block">
      <div className="file-code-header">
        <span className="dot dot-red" />
        <span className="dot dot-yellow" />
        <span className="dot dot-green" />
        <span style={{ marginLeft: '0.5rem', opacity: 0.7 }}>{path}</span>
      </div>
      <pre className="file-code-pre"><code dangerouslySetInnerHTML={{ __html: highlighted }} /></pre>
    </div>
  )
}

function UniSystemCode() {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      <NavigationMenu />
      <div className="unisystem-layout">

        {/* ── Sticky left sidebar TOC ── */}
        <aside className="unisystem-sidebar">
          <div className="sidebar-label">Filer</div>
          {GROUPS.map(group => (
            <div key={group.key} className="sidebar-group">
              <div className="sidebar-group-title">{group.label}</div>
              {FILES.filter(f => f.group === group.key).map(f => (
                <a key={f.id} href={`#${f.id}`} className="sidebar-link">
                  <FileIcon />
                  <span>{f.path.includes('/') ? f.path.split('/')[1] : f.path}</span>
                </a>
              ))}
            </div>
          ))}
        </aside>

        {/* ── Main content ── */}
        <div className="unisystem-page">
          <div className="unisystem-hero">
            <h1>🏫 UniSystem – Kildekode</h1>
            <p>Alle kildekodefiler fra C#-prosjektet, med forklaringer. Bla deg gjennom arkitekturen.</p>
          </div>

          {GROUPS.map(group => {
            const files = FILES.filter(f => f.group === group.key)
            return (
              <div key={group.key}>
                <div className="group-divider">
                  <span>{group.label}</span>
                </div>
                {files.map(file => (
                  <section key={file.id} id={file.id} className="file-section">
                    <div className="file-section-header">
                      <div className="file-path-chip">
                        <FileIcon />
                        {file.path}
                      </div>
                      <span className={`file-group-badge ${group.color}`}>{group.label}</span>
                    </div>

                    <p className="file-description">{file.description}</p>

                    <CodeBlock path={file.path} code={file.code} />

                    <div className="file-key-points">
                      <h4>Nøkkelpunkter</h4>
                      <ul>
                        {file.keyPoints.map((point, i) => (
                          <li key={i} dangerouslySetInnerHTML={{ __html: point }} />
                        ))}
                      </ul>
                    </div>
                  </section>
                ))}
              </div>
            )
          })}
        </div>

      </div>
      <Footer />
    </motion.div>
  )
}

export default UniSystemCode
