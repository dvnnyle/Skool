using System;


namespace UniSystem.aMain
{
    public class Utvekslingsstudent : Student
    {
        public string Hjemmeuniversitet;
        public string Land;
        public DateTime PeriodeFra;
        public DateTime PeriodeTil;

        public Utvekslingsstudent
        (string studentID, string navn, string epost, string hjemmeuniversitet, string land, DateTime periodeFra, DateTime periodeTil)
        : base(studentID, navn, epost)
        {
            Hjemmeuniversitet = hjemmeuniversitet;
            Land = land;
            PeriodeFra = periodeFra;
            PeriodeTil = periodeTil;
        }
    }
}