using System;
using UniSystem.aMain;
using UniSystem;
using UniSystem.aSystemer;


class Program
{
    static void Main()
    {
        BiblotekSystem bs = new BiblotekSystem();

        Student s = new Student("12345", "Ola Nordmann", "ola@example.com");

        bs.LånBok("C# Grunnkurs", s);
        bs.PrintLån();

        bs.LeverInnBok("C# Grunnkurs", s);
        bs.PrintLån();
    }
}
