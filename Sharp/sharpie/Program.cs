using System;

namespace sharpie
{
    class Program
    {
    static void Main(string[] args)
    {

         Car car1 = new Car("ford", "mustang", 2022, "red");
                  Car car2 = new Car("HONDA", "CIVIC", 2002, "BLACK");

         car1.Drive();
                car2.Drive();


        Console.ReadKey();

}
}



class Car
        {
            string make;
            string model;
            int year;
            string color;

            public Car(string make, string model, int year, string color)
            {
                this.make = make;
                this.model = model;
                this.year = year;
                this.color = color;
            }
            public void Drive()
        {
            Console.WriteLine("u drive a" + color + " " + model);
        }
}

}