#nullable disable
using System;
using UniSystem.aMain;
using UniSystem.aSystemer;

class Program
{
    static void Main()
    {
        // Create the course system
        KursSystem kursSystem = new KursSystem();

        // Welcome message
        Console.WriteLine("=== Kurssystem ===");
        Console.WriteLine("Velkommen!");

        // Main program loop
        bool running = true;
        while (running)
        {
            // Show menu
            Console.WriteLine("\n--- Meny ---");
            Console.WriteLine("[1] Opprett kurs");
            Console.WriteLine("[2] Vis alle kurs");
               Console.WriteLine("[3] Melde på student til kurs");
            Console.WriteLine("[0] Avslutt");
            Console.Write("\nVelg et alternativ: ");

            // Get user choice
            string valg = Console.ReadLine();

            // Handle user choice
            if (valg == "1")
            {
                // Get course information from user
                Console.WriteLine("\n--- Opprett nytt kurs ---");
                
                Console.Write("Skriv inn kurskode: ");
                string kurskode = Console.ReadLine();

                Console.Write("Skriv inn kursnavn: ");
                string kursnavn = Console.ReadLine();

                Console.Write("Skriv inn antall studiepoeng: ");
                int studiepoeng = int.Parse(Console.ReadLine());

                Console.Write("Skriv inn maks antall plasser: ");
                int maksPlasser = int.Parse(Console.ReadLine());

                // Create the course
                Kurs nyttKurs = new Kurs(kurskode, kursnavn, studiepoeng, maksPlasser);
                kursSystem.OpprettKurs(nyttKurs);

                Console.WriteLine("\n✓ Kurset ble opprettet!");
            }
            else if (valg == "0")
            {
                // Exit the program
                running = false;
                Console.WriteLine("\nTakk for nå!");
            }
            else if (valg == "2")
            {
                kursSystem.VisAlleKurs();
            }
            else if (valg == "3")
            {
                Console.WriteLine("student id: ");
                string id = Console.ReadLine();

                Console.WriteLine("navn: ");
                string navn = Console.ReadLine();

                Console.WriteLine("epost: ");
                string epost = Console.ReadLine();

                Student student = new Student(id, navn, epost);

                Console.WriteLine("kurskode: ");
                string kode = Console.ReadLine();

                kursSystem.MeldStudentPåKurs(student, kode);
                
            }
            else
            {
                // Invalid choice
                Console.WriteLine("\nUgyldig valg. Prøv igjen.");
            }
        }
    }
}
