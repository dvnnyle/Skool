using System;
using UniSystem.aMain;

class Program
{
    static void Main()
    {
        // Lag et kurs
        Kurs mattekurs = new Kurs("MAT101", "Matematikk 1");

        // Lag en student
        Student s = new Student("12345", "Ola Nordmann", "ola@example.com");

        // Meld studenten på kurset
        s.LeggTilKurs(mattekurs);

        // Skriv ut kursene studenten er på
        s.PrintKurs();
    }
}
