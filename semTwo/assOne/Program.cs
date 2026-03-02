using System.Diagnostics;

Console.ForegroundColor = ConsoleColor.Magenta;

Console.WriteLine("Practice problem 1:\n");


int num1 = 66;
int num2 = 77;

int addition = num1 + num2;
int subtraction = num1 - num2;
int multiply = num1 * num2;
double divide = (double)num1 / num2;

/* Console.WriteLine("Addition: " + add); */
Console.WriteLine($"Addition: {num1} + {num2} = {addition}");
Console.WriteLine($"Subtraction: {num1} - {num2} = {subtraction}");
Console.WriteLine($"Multiplication: {num1} * {num2} = {multiply}"); 
Console.WriteLine($"Division: {num1} / {num2} = {divide}");

Console.WriteLine("\nPractice problem 2:\n");
int day = 6;

if (day >= 1 && day <=5)
{
    Console.WriteLine("Issa a weekday.");
}
else if (day == 6)
{
    Console.WriteLine("Issa weekend.");
}
else if (day == 7)
{
    Console.WriteLine("Issa weekend.");
}
else
{
    Console.WriteLine("Invalid day.");
}

Console.WriteLine("\nPractice problem 3:\n");

int number1 = 7;
int number2 = 6;

if (number1 > number2)
{
    Console.WriteLine("Number 1 is bigger than Number 2");
}
else if (number1 < number2)
{
    Console.WriteLine("Number 2 is bigger than Number 1");
}
else if (number1 == number2)
{
    Console.WriteLine("both are the equeal");
}
else
{
    Console.WriteLine("Numbers aint the same");
}

Console.WriteLine("\nPractice problem 4:\n");


Person p = new Person();

p.id = 1;
p.name = "Omen";
p.dop = "20.02.2000";
p.adr = "Okinawa, Japan";

p.PrintOut();

class Person
{
    public int id;
    public string name;
    public string dop;
    public string adr;
    public void PrintOut()
    {
        Console.WriteLine(id);
        Console.WriteLine(name);
        Console.WriteLine(dop);
        Console.WriteLine(adr);
    }
}

