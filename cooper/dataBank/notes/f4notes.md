# Kolleksjoner og LINQ

**Komplett Oversikt**

---

## 1. Kolleksjoner

### 1.1 Hva er en Kolleksjon?

- En kolleksjon er en parameterisert datastruktur som lar deg lagre og manipulere grupper av data elementer eller objekter
- C# tilbyr flere typer kolleksjoner i "System.Collections" pakken
- Hovedtyper av kolleksjoner:
  - Array
  - List
  - ArrayList

### 1.2 Hierarki av Kolleksjoner

```
IEnumerable
    ↓
ICollection
    ↓
IList
    ↓
Array, List, ArrayList
```

- **IEnumerable**: Basis-interface for alle kolleksjoner som kan itereres
- **ICollection**: Utvider IEnumerable og legger til metoder for størrelse og modifikasjon
- **IList**: Utvider ICollection og legger til indeksert tilgang

---

## 2. Array

### 2.1 Hva er en Array?

- Arrayer brukes til lagring av samlinger med fast størrelse
- En array er en enkel datastruktur som lar deg lagre en samling av elementer av samme type
- Arrayer i C# har en **fast størrelse**, noe som betyr at når en array er opprettet, kan ikke størrelsen endres
- Alle elementer må være av samme datatype

### 2.2 Deklarering og Initialisering av Arrayer

**Syntaks:**
```csharp
Datatype[] variabelnavn = new datatype[fast størrelse];
```

**Måte 1: Deklarere og deretter fylle:**
```csharp
string[] names = new string[3];
names[0] = "Espen";
names[1] = "Rania";
names[2] = "Kjetil";
```

**Måte 2: Deklarere med verdier direkte:**
```csharp
string[] names = new string[] { "Espen", "Rania", "Kjetil" };
```

**Måte 3: Forkortet syntaks:**
```csharp
string[] names = { "Espen", "Rania", "Kjetil" };
```

### 2.3 Array Eksempel

```csharp
int[] myArray = new int[9];
myArray[0] = 7;
myArray[1] = 11;
myArray[2] = 6;
myArray[3] = 55;
myArray[4] = 98;
myArray[5] = 45;
myArray[6] = 16;
myArray[7] = 96;
myArray[8] = 46;

// Iterere gjennom arrayen
for (int i = 0; i < myArray.Length; i++)
{
    Console.WriteLine(myArray[i]);
}
```

**Visualisering:**
```
Indeks:  [0] [1] [2] [3] [4] [5] [6] [7] [8]
Verdier: [7][11] [6][55][98][45][16][96][46]
```

### 2.4 Forskjellige Datatyper for Arrayer

- **Primitive typer:**
  - `float[] anArrayOfFloats;`
  - `double[] anArrayOfDoubles;`
  - `char[] anArrayOfChars;`
  - `string[] anArrayOfStrings;`

- **Objekt-typer:**
  - `object[] anArrayOfObjects;`
  - `KlasseNavn[] arrayNavn;`

**Eksempel med blandede typer:**
```csharp
object[] mixedArray = new object[3];
mixedArray[0] = "Hello";
mixedArray[1] = 123;
mixedArray[2] = new Person("David", 40);
```

**Eksempel med Person-objekter:**
```csharp
Person[] people;
people = new Person[5];
people[0] = new Person("Alice", 30);
people[1] = new Person("Bob", 25);

// Eller direkte initialisering:
Person[] people = { 
    new Person("Alice", 30), 
    new Person("Bob", 25), 
    new Person("Charlie", 35) 
};
```

### 2.5 Array Metoder og Egenskaper

- **Sort()**: Sorterer elementene i en endimensjonal array i stigende rekkefølge
- **Reverse()**: Organiserer elementene i arrayen med omvendt rekkefølge
- **IndexOf()**: Søker etter det angitte objektet og returnerer indeksen for den første forekomsten. Hvis elementet ikke blir funnet, returnerer det -1
- **LastIndexOf()**: Ligner på IndexOf(), men returnerer indeksen for den siste forekomsten av elementet
- **Exists()**: Sjekker om noe element i arrayen samsvarer med betingelsene definert av det spesifiserte predikatet og returnerer en boolsk verdi
- **Length**: Returnerer størrelsen til arrayen

**Eksempler:**
```csharp
int[] numbers = { 5, 2, 8, 1, 9 };

Array.Sort(numbers);      // numbers = { 1, 2, 5, 8, 9 }
Array.Reverse(numbers);   // numbers = { 9, 8, 5, 2, 1 }
int index = Array.IndexOf(numbers, 5);  // index = 2
int length = numbers.Length;  // length = 5
```

---

## 3. List

### 3.1 Hva er en List?

- Lister brukes til lagring av dynamiske samlinger
- En liste er en mer fleksibel datastruktur som lar deg lagre elementer i en dynamisk samling
- I motsetning til arrayer kan lister **vokse eller krympe** i størrelse etter hvert som elementer legges til eller fjernes
- List er en del av namespace «System.Collections.Generic»

### 3.2 Deklarering og Initialisering av Lister

**For å bruke lister må du inkludere:**
```csharp
using System.Collections.Generic;
```

**Forskjellige måter å deklarere lister:**

```csharp
// Tom liste uten spesifisert kapasitet
List<string> names = new List<string>();

// Liste med initial kapasitet
List<string> names = new List<string>(3);

// Liste med verdier direkte
List<string> names = new List<string> { "Espen", "Rania", "Kjetil" };
```

### 3.3 List<T> - Generiske Elementer

**Nøkkelegenskaper:**

- **Generiske elementer**: `<T>` i List<T> betyr at du spesifiserer datatypen til elementene den skal lagre ved deklarasjonstidspunktet
  - Eksempler: `List<string>`, `List<int>`, `List<Employee>`

- **Dynamisk størrelse**: I motsetning til arrayer med fast størrelse, kan en List<T> vokse eller krympe etter hvert som elementer legges til eller fjernes

- **Automatisk ekspansjon**: Når antall elementer overstiger gjeldende kapasitet, utvider listen automatisk sin interne array for å få plass til flere elementer

### 3.4 List Eksempel

```csharp
List<string> liste = new List<string>(2);
liste.Add("Java");    // posisjon 0
liste.Add("Python");  // posisjon 1
liste.Add("C++");     // posisjon 2
liste.Add("Java");    // posisjon 3
liste.Insert(1, "PHP");
```

**Før Insert:**
```
Indeks:    [0]    [1]      [2]   [3]
Elementer: [Java] [Python] [C++] [Java]
```

**Etter Insert(1, "PHP"):**
```
Indeks:    [0]    [1]   [2]      [3]   [4]
Elementer: [Java] [PHP] [Python] [C++] [Java]
```

### 3.5 Iterere Gjennom Lister

**Using for loop:**
```csharp
for (int i = 0; i < liste.Count; i++) {
    Console.WriteLine(" " + liste[i]);
}
```

**Using foreach loop:**
```csharp
foreach (string language in liste) {
    Console.WriteLine(language);
}
```

**Using while loop:**
```csharp
int j = 0;
while (j < liste.Count) {
    Console.WriteLine(" " + liste[j]);
    j++;
}
```

### 3.6 Viktige List Metoder

- **Add(element)**: Legger til elementer i listen
- **Insert(index, element)**: Legger til elementer i listen på en angitt posisjon
- **Remove(element)**: Sletter et element fra listen
- **RemoveAt(index)**: Sletter et element fra listen på en angitt posisjon
- **IndexOf(element)**: Returnerer indeksen for et gitt element i listen
- **LastIndexOf(element)**: Returnerer indeksen for den siste forekomsten av et gitt element i listen
- **Contains(element)**: Bestemmer om et spesifisert element finnes i listen
- **Sort()**: Sorterer elementene i listen ved hjelp av standard sammenligningsverktøy
- **Reverse()**: Reverserer rekkefølgen på elementene i listen
- **Clear()**: Tømmer listen

**Eksempel:**
```csharp
List<int> numbers = new List<int> { 5, 2, 8, 1, 9 };

numbers.Add(3);              // { 5, 2, 8, 1, 9, 3 }
numbers.Insert(0, 10);       // { 10, 5, 2, 8, 1, 9, 3 }
numbers.Remove(8);           // { 10, 5, 2, 1, 9, 3 }
numbers.RemoveAt(0);         // { 5, 2, 1, 9, 3 }
int index = numbers.IndexOf(9);  // index = 3
bool hasTwo = numbers.Contains(2);  // true
numbers.Sort();              // { 1, 2, 3, 5, 9 }
numbers.Reverse();           // { 9, 5, 3, 2, 1 }
numbers.Clear();             // { }
```

---

## 4. Løkker (Repetisjon)

### 4.1 Hvorfor Løkker?

- Vi bruker løkker for å lese gjennom elementene i kolleksjoner (Array, List eller annen)
- Løkker brukes for å skrive ut eller manipulere elementer i kolleksjoner

### 4.2 For Loop

```csharp
for (initialisering; betingelse; oppdatering)
{
    // kode
}
```

**Eksempel:**
```csharp
for (int i = 0; i < 5; i++)
{
    Console.WriteLine(i);
}
```

### 4.3 While Loop

```csharp
initialisering
while (betingelse) {
    // kode
    oppdatering
}
```

**Eksempel:**
```csharp
int i = 0;
while (i < 5) {
    Console.WriteLine(i);
    i++;
}
```

### 4.4 Do/While Loop

```csharp
do {
    // koden som kjøres
}
while (betingelse);
```

**Eksempel:**
```csharp
int i = 0;
do {
    Console.WriteLine(i);
    i++;
}
while (i < 5);
```

### 4.5 Foreach Loop

```csharp
foreach (datatype variabelnavn in kolleksjonsnavn) {
    // kode
}
```

**Eksempel:**
```csharp
string[] names = { "Alice", "Bob", "Charlie" };
foreach (string name in names) {
    Console.WriteLine(name);
}
```

---

## 5. LINQ (Language Integrated Query)

### 5.1 Hva er LINQ?

- LINQ er et sett med metoder i C# som lar deg spørre, filtrere og manipulere data fra ulike datakilder
- Datakilder kan være kolleksjoner, databaser, XML-filer osv.
- LINQ gir en standard og lesbar måte å arbeide med data på
- Med LINQ kan du skrive spørringer direkte i C#-kode som kan operere på minnebaserte kolleksjoner som arrayer og lister

### 5.2 Hva Kan LINQ Gjøre?

LINQ gir en måte å utføre operasjoner som:

- **Filtrere data**: Finne spesifikke elementer
  - Eksempel: Finne alle bøker av en bestemt forfatter
  - Nøkkelord: `where`

- **Sortere data**: Organisere data i en bestemt rekkefølge
  - Eksempel: Sortere bøker etter utgivelsesår
  - Nøkkelord: `order by`

- **Gruppere data**: Organisere data i kategorier
  - Eksempel: Gruppere bøker etter sjanger
  - Nøkkelord: `group by`

### 5.3 LINQ Query Operasjoner

**Alle LINQ-spørreoperasjoner består av tre handlinger:**

1. **Hent datakilden**
2. **Opprett spørringen**
3. **Utfør spørringen**

### 5.4 LINQ Eksempel

```csharp
// 1. Hent datakilden
int[] numbers = { 1, 2, 3, 4, 5, 6 };

// 2. Opprett spørringen
var numQuery = from num in numbers
               where (num % 2) == 0
               select num;

// 3. Utfør spørringen
foreach (int num in numQuery)
{
    Console.WriteLine("Even number: " + num);
}
```

**Output:**
```
Even number: 2
Even number: 4
Even number: 6
```

### 5.5 LINQ Query Syntaks

**Grunnleggende struktur:**
```csharp
var result = from variabel in datakilde
             where betingelse
             select variabel;
```

**Komponenter:**
- `from`: Angir datakilden og iterasjonsvariabelen
- `where`: Filtrerer elementene basert på en betingelse (valgfri)
- `select`: Spesifiserer hva som skal returneres
- `orderby`: Sorterer resultatet (valgfri)
- `group by`: Grupperer resultatet (valgfri)

### 5.6 Flere LINQ Eksempler

**Eksempel 1: Filtrere strenger:**
```csharp
string[] names = { "Alice", "Bob", "Charlie", "David", "Anna" };

var aNames = from name in names
             where name.StartsWith("A")
             select name;

foreach (string name in aNames)
{
    Console.WriteLine(name);  // Output: Alice, Anna
}
```

**Eksempel 2: Sortere data:**
```csharp
int[] numbers = { 5, 2, 8, 1, 9, 3 };

var sortedNumbers = from num in numbers
                    orderby num
                    select num;

foreach (int num in sortedNumbers)
{
    Console.WriteLine(num);  // Output: 1, 2, 3, 5, 8, 9
}
```

**Eksempel 3: Sortere synkende:**
```csharp
var sortedDesc = from num in numbers
                 orderby num descending
                 select num;
```

**Eksempel 4: Arbeide med objekter:**
```csharp
List<Person> people = new List<Person>
{
    new Person("Alice", 30),
    new Person("Bob", 25),
    new Person("Charlie", 35)
};

var adults = from person in people
             where person.Age >= 30
             orderby person.Age
             select person;

foreach (Person p in adults)
{
    Console.WriteLine($"{p.Name} - {p.Age}");
}
```

---

## 6. Array vs. List - Sammenligning

| Egenskap | Array | List |
|----------|-------|------|
| **Størrelse** | Fast størrelse | Dynamisk størrelse |
| **Fleksibilitet** | Kan ikke endre størrelse | Kan vokse og krympe |
| **Ytelse** | Raskere for store datasett med kjent størrelse | Litt tregere pga. dynamisk håndtering |
| **Metoder** | Begrenset (Sort, Reverse, IndexOf, etc.) | Rikere API (Add, Remove, Insert, etc.) |
| **Syntaks** | `int[] array = new int[5];` | `List<int> list = new List<int>();` |
| **Bruksområde** | Når størrelsen er kjent og konstant | Når størrelsen kan variere |

---

## 7. Best Practices

### 7.1 Når Bruke Array

- Når du vet eksakt størrelse på forhånd
- Når ytelse er kritisk og størrelsen ikke endres
- Når du arbeider med store datasett og minneforbruk må optimaliseres
- For multidimensjonale datastrukturer

### 7.2 Når Bruke List

- Når størrelsen på samlingen kan variere
- Når du trenger å legge til eller fjerne elementer ofte
- Når du trenger tilgang til rike API-metoder (Add, Remove, Contains, etc.)
- For de fleste daglige programmeringsoppgaver

### 7.3 LINQ Best Practices

- Bruk LINQ for lesbarhet og vedlikeholdbarhet
- Vær oppmerksom på ytelse ved store datasett
- LINQ-spørringer er "late evaluated" - de kjører ikke før du itererer over resultatet
- Kombiner LINQ med kolleksjoner for kraftige datamanipulasjoner

---

## 8. Oppsummering

- **Kolleksjoner** er datastrukturer for å lagre og manipulere grupper av elementer
- **Array** har fast størrelse og brukes når størrelsen er kjent på forhånd
- **List** har dynamisk størrelse og er mer fleksibel enn Array
- **Løkker** (for, while, foreach) brukes for å iterere gjennom kolleksjoner
- **LINQ** gir en kraftig og lesbar måte å spørre, filtrere og manipulere data på
- LINQ-operasjoner består av tre steg: hent datakilde, opprett spørring, utfør spørring

---

## 9. Nyttige Ressurser

- Array dokumentasjon: https://learn.microsoft.com/en-us/dotnet/api/system.array?view=net-10.0
- List dokumentasjon: https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.list-1?view=net-10.0
- LINQ oversikt: https://learn.microsoft.com/en-us/dotnet/csharp/linq/
- LINQ introduksjon: https://learn.microsoft.com/en-us/dotnet/csharp/linq/get-started/introduction-to-linq-queries