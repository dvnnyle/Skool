using System;
using System.Collections.Generic;
using UniSystem.aMain;

namespace UniSystem.aSystemer
{
    public class KursSystem
    {
        public List<Kurs> KursListe = new List<Kurs>();

        public void OpprettKurs(Kurs kurs)
        {
            KursListe.Add(kurs);
        }

        //  p2. Liste alle kurs 
        public void VisAlleKurs()
        {
            foreach (Kurs kurs in KursListe)
            {
                Console.WriteLine("Kode:" + kurs.Kode);
                Console.WriteLine("Navn:" + kurs.Navn);
                Console.WriteLine("Studiepoeng:" + kurs.Studiepoeng);
                Console.WriteLine("Plasser:" + kurs.MaksPlasser);
            }
        }

        public void MeldStudentPåKurs(Student student, string kursKode)
        {
            foreach (Kurs kurs in KursListe)
            {
                if (kurs.Kode == kursKode)
                {
                    if (kurs.Studenter.Count < kurs.MaksPlasser)
                    {
                        kurs.Studenter.Add(student);
                        Console.WriteLine("student meldt opp");
                    }
                    else
                    {
                        Console.WriteLine("kurs Fullt");
                    }
                    return;
    
                }
            }
            Console.WriteLine("kurs ikke funnet");
        }
    }
}
