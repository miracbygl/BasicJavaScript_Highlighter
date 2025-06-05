# Basic JavaScript syntax -Online Lexical ve Syntax Analyzer

## Proje Özeti
Bu proje, JavaScript benzeri bir dil için gerçek zamanlı sözdizimi renklendirici ve parser uygulamasıdır. Program, yazılan kodun sözdizimini analiz eder, hataları tespit eder ve kod bloklarını renklendirir.

## Özellikler
- ✨ Gerçek zamanlı sözdizimi renklendirme
- 🔍 Anlık hata tespiti ve raporlama
- 📝 Satır ve sütun bazlı hata konumu gösterimi
- 🎨 8 farklı token tipi desteği
- 💬 Yorum satırı desteği

## Teknik Detaylar

### Lexical Analysis
- State Diagram & Program Implementation yaklaşımı
- Regular Expressions kullanımı
- Token tipleri:
  - Keywords (if, else, while, var, vb.)
  - Identifiers
  - Numbers
  - Operators
  - Punctuation
  - Comments
  - Whitespace
  - Strings

### Parser
- Top-Down Recursive Descent Parser
- Desteklenen yapılar:
  - If-else statements
  - While loops
  - Variable declarations
  - Function calls
  - Expressions
  - Comments

### Formal Grammar
```bnf
program     := statement*
statement   := ifStmt | whileStmt | assignmentStmt | functionCall
ifStmt      := 'if' '(' expression ')' block ('else' block)?
whileStmt   := 'while' '(' expression ')' block
block       := '{' statement* '}'
expression  := term (('+' | '-') term)*
term        := factor (('*' | '/') factor)*
factor      := NUMBER | IDENTIFIER | '(' expression ')'
```
