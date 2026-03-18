import os, re

base = r"c:\Users\Neuye\Documents\skoleIT\cooper\src\pages\moduleChapters"

with open(os.path.join(base, "uniStudent.jsx"), encoding="utf-8") as f:
    template = f.read()

quizzes = [
    ("uniAnsatt",         "uniAnsatt.json",         "UniAnsatt",         "🏫 UniSystem: Ansatt.cs"),
    ("uniBok",            "uniBok.json",             "UniBok",            "🏫 UniSystem: Bok.cs"),
    ("uniKurs",           "uniKurs.json",            "UniKurs",           "🏫 UniSystem: Kurs.cs"),
    ("uniLan",            "uniLan.json",             "UniLan",            "🏫 UniSystem: Lån.cs"),
    ("uniKursSystem",     "uniKursSystem.json",      "UniKursSystem",     "🏫 UniSystem: KursSystem.cs"),
    ("uniBibliotekSystem","uniBibliotekSystem.json", "UniBibliotekSystem","🏫 UniSystem: BibliotekSystem.cs"),
    ("uniProgram",        "uniProgram.json",         "UniProgram",        "🏫 UniSystem: Program.cs"),
]

for key, json_file, func_name, title in quizzes:
    content = template
    content = content.replace("uniStudent.json", json_file)
    content = content.replace("UniStudent", func_name)
    content = content.replace("quiz_uniStudent", f"quiz_{key}")
    content = content.replace("🏫 UniSystem: Student.cs", title)
    path = os.path.join(base, f"{key}.jsx")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Created {path}")

print("All done!")
