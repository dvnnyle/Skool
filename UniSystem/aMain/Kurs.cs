using System.Collections.Generic;


namespace UniSystem.aMain
{
    public class Kurs
    {
        public string Kode;
        public string Navn;
        public int Studiepoeng;
        public int MaksPlasser;


        //p2: legge til studenter 
        public List<Student> Studenter = new List<Student>();
        
        public Kurs(string kode, string navn, int studiepoeng, int maksPlasser)

 

        {
            Kode = kode;
            Navn = navn;
            Studiepoeng = studiepoeng;
            MaksPlasser = maksPlasser;
        }
    }
}
