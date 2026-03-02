# Innkapsling og Konstruktører

**Komplett Oversikt**

---

## 1. Innkapsling (Encapsulation)

### 1.1 Hva er Innkapsling?

- Innkapsling refererer til å samle data (variabler) og metodene som opererer på disse dataene i en enkelt klasse
- Det innebærer å begrense tilgangen til bestemte deler av dataene for å beskytte objektets integritet
- Dette gjøres ved å bruke tilgangsmodifikatorer som kontrollerer tilgang til data og hvordan data endres
- Målet er å sikre at data ikke eksponeres eller endres på en upassende måte
- I C# definerer tilgangsmodifikatorer omfanget og synligheten til klasser, felt, metoder og egenskaper

### 1.2 Tilgangsmodifikatorer i C#

- **public**: Medlemmet er tilgjengelig fra hvor som helst
  - Kan nås både innenfor og utenfor klassen
  - Brukes når data skal være åpent tilgjengelig for alle

- **private**: Medlemmet er tilgjengelig kun innenfor klassen der det er deklarert
  - Dette er standardmodifikatoren hvis ingen er spesifisert
  - Brukes for å skjule implementeringsdetaljer

- **protected**: Gir tilgang til medlemmet innenfor klassen og eventuelle sub-klasser
  - Relevant når vi arbeider med arv (inheritance)
  - Tillater avledede klasser å få tilgang til medlemmet

- **internal**: Medlemmet er tilgjengelig kun innenfor samme samling (prosjekt)
  - Ikke tilgjengelig utenfor prosjektet
  - Nyttig for å dele funksjonalitet innenfor et prosjekt uten å eksponere det eksternt

- **protected internal**: Gir tilgang til medlemmet fra både gjeldende samling og avledede klasser
  - Kombinasjon av protected og internal

- **private protected**: Medlemmet er tilgjengelig kun innenfor gjeldende klasse og avledede klasser innenfor samme samling
  - Den mest restriktive kombinasjonen av protected og private

---

## 2. Felt vs. Egenskaper (Fields vs. Properties)

### 2.1 Felt (Fields)

- Et felt er en variabel som inneholder data
- Felt kan ha tilgangsmodifikatorer (public, private, osv.) som kontrollerer tilgangen til dataene
- Direkte tilgang til feltet gir ikke mulighet for validering eller logikk
- Eksempel:
  - `private decimal balance;`

### 2.2 Egenskaper (Properties)

- En egenskap er et medlem av en klasse som gir tilgang til et felt
- Egenskaper brukes til å innkapsle felt ved å kontrollere hvordan de åpnes og endres
- En egenskap har vanligvis en **getter** (for å lese verdien) og en **setter** (for å endre verdien)
- Egenskaper gir et kontrollnivå over hvordan data aksesseres og modifiseres

### 2.3 Forskjeller og Bruksområder

- **Metode-tilgang (tradisjonell tilnærming):**
  - Bruk av SetBalance() og GetBalance() metoder
  - Mer eksplisitt, men kan bli omfattende
  - Eksempel:
```csharp
public class BankAccount
{
    private decimal balance;
    
    public void SetBalance(decimal bal)
    {
        balance = bal;
    }
    
    public decimal GetBalance()
    {
        return balance;
    }
}
```

- **Egenskaper med full implementering:**
  - Tillater tilpasset logikk i get og set
  - Kan validere data før de settes
  - Eksempel: Validering av at balance ikke er negativ
```csharp
public class BankAccount
{
    private decimal balance;
    
    public decimal Balance
    {
        get { return balance; }
        set { balance = value; }
    }
}
```

- **Auto-implementerte egenskaper:**
  - Kortere syntaks: `public decimal Balance { get; set; }`
  - Kompilatoren genererer automatisk et privat felt i bakgrunnen
  - Brukes når ingen spesiell logikk er nødvendig
```csharp
public class BankAccount
{
    public decimal Balance { get; set; }
}
```

### 2.4 Validering med Egenskaper

- Ved å bruke egenskaper kan du legge til logikk for å validere data før de settes eller hentes
- Dette gir et kontrolllag over hvordan tilgang til felt styres
- Eksempel på validering:
  - Sjekke at balance er større enn eller lik 0
  - Hvis verdien er negativ, skriv ut feilmelding og ikke oppdater feltet
  - Dette sikrer dataintegritet og forhindrer ugyldige tilstander

```csharp
public class BankAccount
{
    private decimal balance;
    
    public decimal Balance
    {
        get { return balance; }
        set 
        {
            if (value >= 0)
                balance = value;
            else
                Console.WriteLine("Balance cannot be negative");
        }
    }
}
```

---

## 3. Konstruktører (Constructors)

### 3.1 Hva er en Konstruktør?

- En konstruktør er en spesiell metode som kalles automatisk når et objekt i en klasse opprettes
- Den brukes til å initialisere objektets tilstand
- Initialiserer verdier til feltene eller egenskapene til objektet
- Sikrer at objektet er i en gyldig tilstand fra øyeblikket det opprettes

### 3.2 Egenskaper ved Konstruktører i C#

- **Samme navn som klassen:** Konstruktøren må ha nøyaktig samme navn som klassen
- **Ingen returtype:** Konstruktøren har ikke returtype, og den er ikke 'void' heller
- **Automatisk kall:** Den kalles automatisk når et objekt instansieres ved bruk av 'new' nøkkelord
- **Kan være public eller private:** Oftest public, men kan være private for spesielle design patterns

### 3.3 Konstruktør Overbelastning (Constructor Overloading)

- Konstruktør overbelastning skjer når en klasse har mer enn én konstruktør med samme navn, men forskjellige parametere
- Dette gir fleksibilitet i hvordan objekter kan opprettes

- **Standard konstruktør (parameterløs):**
  - Initialiserer objektet med standardverdier
  - Eksempel:
    - `public BankAccount() { this.balance = 0.0m; }`

- **Parametrisert konstruktør:**
  - Tar imot parametere for å initialisere objektet med spesifikke verdier
  - Eksempel:
    - `public BankAccount(decimal bal) { this.balance = bal; }`

- Dette gjør det mulig å opprette objekter på forskjellige måter:
  - `BankAccount account1 = new BankAccount();` // balance = 0
  - `BankAccount account2 = new BankAccount(1000);` // balance = 1000

**Komplett eksempel:**

```csharp
public class BankAccount
{
    private decimal balance;
    
    public BankAccount()
    {
        this.balance = 0.0m;
    }
    
    public BankAccount(decimal bal)
    {
        this.balance = bal;
    }
}
```

---

## 4. Praktiske Eksempler og Sammenhenger

### 4.1 BankAccount Eksempel - Komplett Oversikt

- BankAccount-klassen demonstrerer alle konseptene:
  - **Private felt:** balance er skjult fra direkte tilgang
  - **Public egenskaper:** Balance gir kontrollert tilgang med validering
  - **Konstruktører:** Både standard og parametriserte varianter for fleksibilitet

### 4.2 Fordeler med Innkapsling

- **Dataintegritet:** Beskytter data mot ugyldige eller upassende endringer
- **Vedlikeholdbarhet:** Interne implementeringsdetaljer kan endres uten å påvirke ekstern kode
- **Fleksibilitet:** Logikk for validering og prosessering kan legges til senere
- **Sikkerhet:** Forhindrer utilsiktet tilgang eller modifikasjon av kritiske data
- **Abstraksjon:** Skjuler kompleksitet og eksponerer bare det som er nødvendig

### 4.3 Best Practices

- Gjør felt private som standard og eksponér dem gjennom egenskaper når nødvendig
- Bruk egenskaper for å legge til validering og kontrolllogikk
- Implementer passende konstruktører for å sikre at objekter initialiseres korrekt
- Bruk konstruktør overbelastning for å gi fleksibilitet i objektopprettelse
- Tenk nøye over hvilke tilgangsmodifikatorer som er hensiktsmessige for hvert medlem
- Hold implementeringsdetaljer skjult og eksponér bare nødvendige grensesnitt

---

## 5. Oppsummering

- **Innkapsling** er fundamentalt for objektorientert programmering og beskytter dataintegritet
- **Tilgangsmodifikatorer** (public, private, protected, etc.) styrer synlighet og tilgang til klassens medlemmer
- **Egenskaper** gir kontrollert tilgang til felt med mulighet for validering og logikk
- **Konstruktører** initialiserer objekter og sikrer at de er i en gyldig tilstand fra start
- **Konstruktør overbelastning** gir fleksibilitet i hvordan objekter kan opprettes med forskjellige parametere